import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SCENARIOS, DONORS, CARTRIDGES, STAGES,
  createState, act, reactions, qcChecks, canAuthorise, stageOf,
} from '../engine.js';

const send = (state, type, rest = {}) => act(state, { type, ...rest });
const complete = (state = createState()) => {
  send(state, 'verify');
  send(state, 'start');
  send(state, 'tick', { seconds: 600 });
  return state;
};
const authorise = (state) => send(state, 'review', {
  decision: 'authorise', operator: 'DEMO-REVIEWER', note: 'Fictional result and QC reviewed.',
});
const row = (state, id) => {
  const found = reactions(state).find((item) => item.id === id);
  assert.ok(found, `Missing reaction ${id}`);
  return found;
};
const activeJobs = (state) => state.jobs.filter((job) => /testing|running/i.test(job.status));

const groupingCases = {
  'A+': [true, false, true, false, true],
  'A-': [true, false, false, false, true],
  'B+': [false, true, true, true, false],
  'B-': [false, true, false, true, false],
  'AB+': [true, true, true, false, false],
  'AB-': [true, true, false, false, false],
  'O+': [false, false, true, true, true],
  'O-': [false, false, false, true, true],
};

for (const [group, expected] of Object.entries(groupingCases)) {
  test(`forward and reverse grouping agree for an uncomplicated ${group} adult`, () => {
    const state = createState();
    send(state, 'group', { value: group });
    send(state, 'cartridge', { value: 'type' });
    complete(state);
    const observed = ['anti-a', 'anti-b', 'anti-d', 'reverse-a1', 'reverse-b']
      .map((id) => row(state, id).positive);
    assert.deepEqual(observed, expected);
  });
}

test('all advertised scenarios have unique IDs and the product has exactly three test scopes', () => {
  assert.ok(SCENARIOS.length >= 12);
  assert.equal(new Set(SCENARIOS.map((scenario) => scenario.id)).size, SCENARIOS.length);
  assert.deepEqual(Object.keys(CARTRIDGES).sort(), ['complete', 'match', 'type']);
  assert.equal(CARTRIDGES.type.price, 59);
  assert.equal(CARTRIDGES.complete.price, 79);
  assert.equal(CARTRIDGES.match.price, 49);
});

test('the simulator begins idle and a completed assay still requires review', () => {
  const state = createState();
  assert.equal(state.elapsed, 0);
  assert.equal(state.running, false);
  assert.equal(state.authorised, false);
  assert.equal(canAuthorise(state), false);
  complete(state);
  assert.equal(state.elapsed, 600);
  assert.equal(state.authorised, false);
  assert.equal(state.status, 'Ready for review');
  assert.equal(canAuthorise(state), true);
});

test('Type & Screen never fabricates a donor-specific crossmatch', () => {
  const state = createState();
  send(state, 'cartridge', { value: 'type' });
  complete(state);
  assert.ok(reactions(state).some((reaction) => reaction.kind === 'typing'));
  assert.ok(reactions(state).some((reaction) => reaction.kind === 'screen'));
  assert.equal(reactions(state).some((reaction) => reaction.kind === 'crossmatch'), false);
});

test('Match Only excludes new typing and screening assays and requires a valid previous workup', () => {
  const state = createState();
  send(state, 'cartridge', { value: 'match' });
  assert.equal(reactions(state).some((reaction) => reaction.kind === 'typing'), false);
  assert.equal(reactions(state).some((reaction) => reaction.kind === 'screen'), false);
  state.patient.validPrior = false;
  complete(state);
  assert.equal(canAuthorise(state), false);
  authorise(state);
  assert.equal(state.authorised, false);
});

test('ABO-incompatible donor selection produces a reactive donor crossmatch', () => {
  const state = complete(createState('abo'));
  const match = reactions(state).find((reaction) => reaction.kind === 'crossmatch');
  assert.equal(match.positive, true);
  assert.equal(canAuthorise(state), false);
  authorise(state);
  assert.equal(state.authorised, false);
});

test('same ABO/RhD group does not suppress antibody-dependent donor reactivity', () => {
  const state = complete(createState('antibody'));
  const donor = DONORS.find((item) => item.id === state.donorId);
  assert.equal(donor.group, state.patient.group);
  const match = reactions(state).find((reaction) => reaction.kind === 'crossmatch');
  assert.equal(match.positive, true);
  assert.equal(canAuthorise(state), false);
});

for (const id of ['screen', 'weak', 'equivocal']) {
  test(`${id} screening findings remain blocked pending investigation`, () => {
    const state = complete(createState(id));
    assert.equal(canAuthorise(state), false);
    authorise(state);
    assert.equal(state.authorised, false);
    assert.match(state.status, /hold|investigate|invalid/i);
  });
}

test('the wrong-patient scenario cannot enter normal testing', () => {
  const state = createState('mismatch');
  send(state, 'verify');
  send(state, 'start');
  send(state, 'tick', { seconds: 600 });
  assert.equal(state.verified, false);
  assert.equal(state.running, false);
  assert.equal(state.elapsed, 0);
  assert.equal(canAuthorise(state), false);
});

for (const fault of ['control', 'optical', 'bubble', 'expired', 'insufficient', 'temperature', 'maintenance', 'discrepancy']) {
  test(`required ${fault} failure cannot be authorised`, () => {
    const state = createState();
    send(state, 'fault', { id: fault, enabled: true });
    complete(state);
    assert.ok(qcChecks(state).some((check) => check.status === 'fail'));
    assert.equal(canAuthorise(state), false);
    authorise(state);
    assert.equal(state.authorised, false);
    assert.equal(state.handedOver, false);
  });
}

test('a QC failure introduced after authorisation invalidates release eligibility', () => {
  const state = complete();
  authorise(state);
  assert.equal(state.authorised, true);
  send(state, 'fault', { id: 'control', enabled: true });
  assert.equal(state.authorised, false);
  assert.equal(canAuthorise(state), false);
  send(state, 'handover');
  assert.equal(state.handedOver, false);
});

test('clearing a failed control cannot silently authorise an already invalid run', () => {
  const state = complete();
  send(state, 'fault', { id: 'control', enabled: true });
  send(state, 'fault', { id: 'control', enabled: false });
  assert.equal(canAuthorise(state), false);
  authorise(state);
  assert.equal(state.authorised, false);
});

test('changing the donor invalidates the old donor-specific result', () => {
  const state = complete();
  authorise(state);
  const replacement = DONORS.find((donor) => donor.id !== state.donorId);
  send(state, 'donor', { id: replacement.id });
  assert.equal(state.elapsed, 0);
  assert.equal(state.authorised, false);
  assert.equal(state.handedOver, false);
  assert.equal(canAuthorise(state), false);
});

test('changing the scenario clears dependent evidence and review decisions', () => {
  const state = complete();
  authorise(state);
  send(state, 'scenario', { id: 'screen' });
  assert.equal(state.scenarioId, 'screen');
  assert.equal(state.elapsed, 0);
  assert.equal(state.running, false);
  assert.equal(state.authorised, false);
  assert.equal(state.handedOver, false);
});

test('qualified review and laboratory-to-ward handover are separate auditable actions', () => {
  const state = complete();
  send(state, 'handover');
  assert.equal(state.handedOver, false);
  const before = state.audit.length;
  authorise(state);
  assert.equal(state.authorised, true);
  assert.equal(state.handedOver, false);
  assert.equal(state.reviewer, 'DEMO-REVIEWER');
  send(state, 'handover');
  assert.equal(state.handedOver, true);
  assert.equal(state.status, 'Completed handover');
  assert.ok(state.audit.length >= before + 2);
});

test('network failure preserves local evidence without fabricating a completed transfer', () => {
  const state = complete(createState('network'));
  const before = reactions(state);
  authorise(state);
  assert.equal(state.authorised, true);
  assert.equal(state.status, 'Transfer pending');
  assert.equal(state.handedOver, false);
  send(state, 'handover');
  assert.equal(state.handedOver, false);
  assert.deepEqual(reactions(state), before);
  send(state, 'network', { connected: true });
  assert.equal(state.authorised, true);
  send(state, 'handover');
  assert.equal(state.handedOver, true);
});

test('pause prevents time advancement and a step advances deterministically', () => {
  const state = createState();
  send(state, 'verify');
  send(state, 'start');
  send(state, 'tick', { seconds: 80 });
  send(state, 'pause');
  const elapsed = state.elapsed;
  send(state, 'tick', { seconds: 150 });
  assert.equal(state.elapsed, elapsed);
  send(state, 'step');
  assert.ok(state.elapsed > elapsed);
  assert.ok(stageOf(state) >= 0 && stageOf(state) < STAGES.length);
});

test('the same sequence yields identical reaction evidence, QC and queue state', () => {
  const run = () => {
    const state = createState('antibody');
    send(state, 'verify');
    send(state, 'start');
    send(state, 'tick', { seconds: 600 });
    return { reactions: reactions(state), qc: qcChecks(state), elapsed: state.elapsed, jobs: state.jobs, status: state.status };
  };
  assert.deepEqual(run(), run());
});

for (const config of [2, 4, 8, 16]) {
  test(`${config} bays never assign two running requests to one bay`, () => {
    const state = createState();
    send(state, 'config', { value: config });
    send(state, 'enqueue', { priority: 'Routine', count: config + 3 });
    send(state, 'verify');
    send(state, 'start');
    send(state, 'tick', { seconds: 1 });
    const active = activeJobs(state);
    assert.ok(active.length > 0);
    assert.ok(active.length <= config);
    assert.equal(new Set(active.map((job) => job.bay)).size, active.length);
    assert.ok(active.every((job) => job.bay >= 1 && job.bay <= config));
  });
}

test('an urgent request is promoted without preempting an active routine run', () => {
  const state = createState();
  send(state, 'enqueue', { priority: 'Routine', count: 5 });
  send(state, 'verify');
  send(state, 'start');
  send(state, 'tick', { seconds: 100 });
  const running = activeJobs(state).map((job) => ({ id: job.id, bay: job.bay, elapsed: job.elapsed }));
  assert.ok(running.length > 0);
  send(state, 'enqueue', { priority: 'Urgent', count: 1 });
  for (const prior of running) {
    const current = state.jobs.find((job) => job.id === prior.id);
    assert.equal(current.bay, prior.bay);
    assert.equal(current.elapsed, prior.elapsed);
    assert.match(current.status, /testing|running/i);
  }
  const next = state.queue.find((job) => /urgent/i.test(job.priority));
  assert.ok(next, 'The urgent request must remain queued when all bays are occupied');
  assert.equal(state.queue[0].id, next.id);
});

test('a paused analytical cartridge retains its bay when new requests are queued', () => {
  const state = createState();
  send(state, 'verify');
  send(state, 'start');
  send(state, 'tick', { seconds: 80 });
  send(state, 'pause');
  const mainBay = state.bay;
  send(state, 'enqueue', { priority: 'Routine', count: 3 });
  assert.equal(activeJobs(state).some((job) => job.bay === mainBay), false);
  send(state, 'start');
  assert.equal(state.running, true);
  assert.equal(activeJobs(state).some((job) => job.bay === state.bay), false);
});

test('a nonreactive chamber does not bypass ordinary RhD donor-selection constraints', () => {
  const state = createState();
  send(state, 'group', { value: 'A-' });
  const positiveDonor = DONORS.find((donor) => donor.group === 'A+' && !donor.antigens.includes('K'));
  send(state, 'donor', { id: positiveDonor.id });
  complete(state);
  assert.equal(reactions(state).find((reaction) => reaction.kind === 'crossmatch').positive, false);
  assert.equal(canAuthorise(state), false);
  authorise(state);
  assert.equal(state.authorised, false);
});

test('massive-transfusion emergency release proceeds independently of assay completion', () => {
  const state = createState('massive');
  const release = state.emergencyRelease;
  assert.match(release, /independent|do not wait/i);
  assert.equal(state.elapsed, 0);
  assert.equal(state.authorised, false);
  send(state, 'fault', { id: 'control', enabled: true });
  complete(state);
  assert.equal(state.authorised, false);
  assert.equal(state.emergencyRelease, release);
});

test('a mechanically isolated bay leaves unaffected bays able to process work', () => {
  const state = createState('mechanical');
  assert.deepEqual(state.unavailableBays, [1]);
  send(state, 'config', { value: 4 });
  send(state, 'enqueue', { priority: 'Routine', count: 6 });
  send(state, 'tick', { seconds: 100 });
  const active = activeJobs(state);
  assert.equal(active.length, 3);
  assert.ok(active.every((job) => job.bay !== 1));
  assert.ok(active.every((job) => job.elapsed === 100));
  send(state, 'tick', { seconds: 500 });
  assert.equal(state.jobs.filter((job) => job.status === 'Ready for review').length, 3);
});

test('queue completion and assignment are independent of clock tick granularity', () => {
  const run = (ticks) => {
    const state = createState();
    send(state, 'config', { value: 4 });
    send(state, 'enqueue', { priority: 'Routine', count: 9 });
    send(state, 'enqueue', { priority: 'Urgent', count: 2 });
    for (const seconds of ticks) send(state, 'tick', { seconds });
    return {
      clock: state.queueClock,
      queue: state.queue.map(({ id, position }) => ({ id, position })),
      jobs: state.jobs.map(({ id, bay, elapsed, status, startedAt, completedAt }) => ({ id, bay, elapsed, status, startedAt, completedAt })),
    };
  };
  assert.deepEqual(run([1200]), run(Array(12).fill(100)));
});

test('queue pause preserves every in-flight request until explicitly resumed', () => {
  const state = createState();
  send(state, 'enqueue', { priority: 'Routine', count: 4 });
  send(state, 'tick', { seconds: 120 });
  const snapshot = structuredClone(state.jobs);
  const clock = state.queueClock;
  send(state, 'queue-play', { running: false });
  send(state, 'tick', { seconds: 300 });
  assert.deepEqual(state.jobs, snapshot);
  assert.equal(state.queueClock, clock);
  send(state, 'queue-play', { running: true });
  send(state, 'tick', { seconds: 80 });
  assert.ok(activeJobs(state).every((job) => job.elapsed === 200));
});

test('clearing the fictional workload removes active and waiting requests', () => {
  const state = createState();
  send(state, 'enqueue', { priority: 'Routine', count: 5 });
  send(state, 'tick', { seconds: 100 });
  assert.ok(state.jobs.length > 0 && state.queue.length > 0);
  send(state, 'clear-queue');
  assert.deepEqual(state.jobs, []);
  assert.deepEqual(state.queue, []);
  assert.equal(state.queueRunning, false);
  assert.equal(state.authorised, false);
  assert.ok(state.audit.some((event) => /clear/i.test(event.event)));
});

test('a reviewer hold cannot immediately be changed into authorisation', () => {
  const state = complete();
  send(state, 'review', { decision: 'hold', operator: 'DEMO-REVIEWER', note: 'Investigate an observed finding.' });
  assert.equal(canAuthorise(state), false);
  authorise(state);
  assert.equal(state.authorised, false);
  assert.equal(state.status, 'Hold / investigate');
  send(state, 'repeat');
  complete(state);
  assert.equal(canAuthorise(state), true);
});

test('an ABO discrepancy preserves the expected reference separately from the observed reaction', () => {
  const state = createState();
  send(state, 'fault', { id: 'discrepancy', enabled: true });
  const reverse = row(state, 'reverse-a1');
  assert.notEqual(reverse.positive, reverse.expectedPositive);
  assert.equal(canAuthorise(complete(state)), false);
});

test('Match Only can review an eligible donor using a valid existing workup', () => {
  const state = createState();
  assert.equal(state.patient.validPrior, true);
  send(state, 'cartridge', { value: 'match' });
  complete(state);
  assert.equal(state.elapsed, 600);
  assert.equal(canAuthorise(state), true);
  assert.deepEqual(new Set(reactions(state).map((reaction) => reaction.kind)), new Set(['crossmatch', 'control']));
});

test('a configuration cannot remove bays containing active cartridges', () => {
  const state = createState();
  send(state, 'config', { value: 8 });
  send(state, 'enqueue', { priority: 'Routine', count: 8 });
  send(state, 'tick', { seconds: 100 });
  const active = structuredClone(activeJobs(state));
  send(state, 'config', { value: 2 });
  assert.equal(state.config, 8);
  assert.deepEqual(activeJobs(state), active);
  send(state, 'tick', { seconds: 500 });
  send(state, 'config', { value: 2 });
  assert.equal(state.config, 2);
});

test('an authorised custom Type & Screen establishes the valid prior workup needed for Match Only', () => {
  const state = createState();
  send(state, 'group', { value: 'B+' });
  assert.equal(state.patient.validPrior, false);
  send(state, 'cartridge', { value: 'type' });
  complete(state);
  assert.equal(state.patient.validPrior, false, 'An unreviewed analysis cannot establish the reviewed prior record');
  authorise(state);
  assert.equal(state.patient.validPrior, true);
  assert.equal(state.patient.priorWorkup.group, 'B+');
  assert.equal(state.patient.priorWorkup.reviewer, 'DEMO-REVIEWER');
  send(state, 'cartridge', { value: 'match' });
  send(state, 'donor', { id: DONORS.find(donor => donor.group === 'B+').id });
  complete(state);
  assert.equal(canAuthorise(state), true);
  assert.equal(reactions(state).some(reaction => reaction.kind === 'typing'), false);
});

test('resolving a wrong-patient challenge retrieves the correct fictional specimen and requires fresh verification', () => {
  const state = createState('mismatch');
  send(state, 'verify');
  assert.equal(state.verified, false);
  send(state, 'fault', { id: 'wrong-patient', enabled: false });
  assert.equal(state.patient.specimen, state.patient.expectedSpecimen);
  assert.equal(state.patient.specimenPatientId, state.patient.id);
  assert.equal(state.verified, false);
  complete(state);
  assert.equal(canAuthorise(state), true);
});

test('a newly injected identification challenge changes the linked specimen and invalidates verification', () => {
  const state = createState();
  send(state, 'verify');
  const expected = state.patient.specimen;
  send(state, 'fault', { id: 'wrong-patient', enabled: true });
  assert.notEqual(state.patient.specimen, expected);
  assert.notEqual(state.patient.specimenPatientId, state.patient.id);
  send(state, 'verify');
  assert.equal(state.verified, false);
  send(state, 'fault', { id: 'wrong-patient', enabled: false });
  assert.equal(state.patient.specimen, expected);
});

test('an invalid partial cartridge reserves its bay until the operator requests a new run', () => {
  const state = createState();
  send(state, 'verify');
  send(state, 'start');
  send(state, 'tick', { seconds: 80 });
  const retainedBay = state.bay;
  send(state, 'fault', { id: 'control', enabled: true });
  send(state, 'enqueue', { priority: 'Routine', count: 3 });
  assert.equal(activeJobs(state).some(job => job.bay === retainedBay), false);
  send(state, 'repeat');
  send(state, 'tick', { seconds: 1 });
  assert.equal(activeJobs(state).some(job => job.bay === retainedBay), true);
});

test('a historical workup for a different underlying group cannot satisfy Match Only eligibility', () => {
  const state = createState();
  state.patient.priorWorkup.group = 'B+';
  send(state, 'cartridge', { value: 'match' });
  send(state, 'verify');
  send(state, 'start');
  assert.equal(state.running, false);
  assert.equal(state.elapsed, 0);
  assert.equal(canAuthorise(state), false);
});
