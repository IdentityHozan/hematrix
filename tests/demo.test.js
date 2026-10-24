import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, act, SCENARIOS } from '../engine.js';
import { deriveDemo } from '../demo-model.js';

const seated = { sampleLoaded: true, inserted: true, inserting: false };
const run = (state = createState()) => {
  act(state, { type: 'verify' });
  act(state, { type: 'start' });
  act(state, { type: 'tick', seconds: 600 });
  return state;
};
const authorise = state => act(state, { type: 'review', decision: 'authorise', operator: 'LAB-DEMO' });

test('demonstration flow progresses from sample loading through insertion, analysis, review and handover', () => {
  const state = createState();
  let model = deriveDemo(state);
  assert.equal(model.phase, 'sample');
  assert.equal(model.action, 'load');
  act(state, { type: 'verify' });
  model = deriveDemo(state, { sampleLoaded: true });
  assert.equal(model.phase, 'insert');
  assert.equal(model.title, 'Sample identified');
  model = deriveDemo(state, { sampleLoaded: true, inserting: true });
  assert.equal(model.machine.status, 'Cartridge entering bay');
  model = deriveDemo(state, seated);
  assert.equal(model.phase, 'ready');
  assert.equal(model.action, 'start');
  act(state, { type: 'start' });
  assert.equal(deriveDemo(state, seated).phase, 'running');
  act(state, { type: 'tick', seconds: 600 });
  model = deriveDemo(state, seated);
  assert.equal(model.phase, 'review');
  assert.equal(model.result.eligible, true);
  assert.equal(model.result.group, 'A+');
  assert.equal(model.machine.progress, 1);
  authorise(state);
  assert.equal(deriveDemo(state, seated).phase, 'authorised');
  act(state, { type: 'handover' });
  assert.equal(deriveDemo(state, seated).phase, 'handover');
});

test('physical sample loading alone cannot report that identity was verified', () => {
  const model = deriveDemo(createState(), { sampleLoaded: true, inserted: true });
  assert.equal(model.phase, 'sample');
  assert.equal(model.actionLabel, 'Verify sample');
  assert.match(model.machine.status, /verification required/i);
});

test('partial analysis reveals progress and stage without publishing final results', () => {
  const state = createState();
  act(state, { type: 'verify' });
  act(state, { type: 'start' });
  act(state, { type: 'tick', seconds: 540 });
  const model = deriveDemo(state, seated);
  assert.equal(model.phase, 'running');
  assert.equal(model.machine.progress, 0.9);
  assert.equal(model.result.group, 'Awaiting result');
  assert.equal(model.result.screen, 'Awaiting result');
  assert.equal(model.result.crossmatch, 'Awaiting result');
  assert.equal(model.result.eligible, false);
  assert.equal(model.machine.lines.some(line => line.includes('A+')), false);
});

test('pause and resume labels follow the same retained analytical record', () => {
  const state = createState();
  act(state, { type: 'verify' }); act(state, { type: 'start' });
  act(state, { type: 'tick', seconds: 200 });
  assert.equal(deriveDemo(state, seated).actionLabel, 'Pause analysis');
  act(state, { type: 'pause' });
  const model = deriveDemo(state, seated);
  assert.equal(model.phase, 'paused');
  assert.equal(model.action, 'resume');
  assert.equal(model.actionLabel, 'Resume analysis');
  assert.equal(model.result.eligible, false);
});

test('an identification mismatch takes priority over loading and insertion steps', () => {
  const state = createState('mismatch');
  for (const ui of [{}, { sampleLoaded: true }, seated]) {
    const model = deriveDemo(state, ui);
    assert.equal(model.phase, 'blocked');
    assert.equal(model.machine.status, 'Identification blocked');
    assert.equal(model.result.eligible, false);
    assert.equal(model.action, 'review');
  }
});

for (const id of ['control', 'optical', 'bubble', 'expired', 'temperature']) {
  test(`${id} failure blocks the demonstration even before analytical completion`, () => {
    const state = createState();
    act(state, { type: 'fault', id, enabled: true });
    const model = deriveDemo(state);
    assert.equal(model.phase, 'blocked');
    assert.equal(model.machine.tone, 'danger');
    assert.equal(model.result.eligible, false);
  });
}

test('clearing a fault cannot change invalid evidence into an eligible machine result', () => {
  const state = run();
  act(state, { type: 'fault', id: 'control', enabled: true });
  act(state, { type: 'fault', id: 'control', enabled: false });
  const model = deriveDemo(state, seated);
  assert.equal(model.phase, 'blocked');
  assert.equal(model.result.group, 'Not reported');
  assert.equal(model.result.screen, 'Invalid result');
  assert.equal(model.result.eligible, false);
  assert.match(model.instruction, /fresh test/i);
});

test('a same-group antibody-dependent incompatibility remains held after analysis', () => {
  const model = deriveDemo(run(createState('antibody')), seated);
  assert.equal(model.phase, 'blocked');
  assert.equal(model.result.group, 'A+');
  assert.equal(model.result.screen, 'Reactive');
  assert.equal(model.result.crossmatch, 'Reactive');
  assert.equal(model.result.eligible, false);
  assert.match(model.instruction, /antibody investigation/i);
});

test('Type & Screen never displays a donor-specific result', () => {
  const state = createState();
  act(state, { type: 'cartridge', value: 'type' });
  const model = deriveDemo(run(state), seated);
  assert.equal(model.result.crossmatch, 'Not requested');
  assert.ok(model.machine.lines.includes('Crossmatch not requested'));
});

test('Match Only distinguishes valid historical grouping from a newly measured result', () => {
  const state = createState();
  act(state, { type: 'cartridge', value: 'match' });
  const model = deriveDemo(state);
  assert.equal(model.result.group, 'A+ (prior record)');
  assert.equal(model.result.screen, 'Negative (prior record)');
  assert.equal(model.result.crossmatch, 'Awaiting result');
  assert.equal(model.result.eligible, false);
  state.patient.validPrior = false;
  const blocked = deriveDemo(state, seated);
  assert.equal(blocked.phase, 'blocked');
  assert.equal(blocked.title, 'Prior workup required');
});

test('local authorisation during network loss does not claim a completed ward handover', () => {
  const state = run(createState('network'));
  authorise(state);
  const model = deriveDemo(state, seated);
  assert.equal(model.phase, 'authorised');
  assert.equal(model.machine.status, 'Transfer pending');
  assert.equal(model.actionLabel, 'Review pending transfer');
  assert.match(model.instruction, /Restore the connection/i);
  assert.equal(model.machine.lines.includes('Ward acknowledgement recorded'), false);
});

test('derivation is pure and every scenario produces a compact machine display', () => {
  for (const scenario of SCENARIOS) {
    const state = createState(scenario.id);
    const before = structuredClone(state);
    const model = deriveDemo(state, seated);
    assert.deepEqual(state, before);
    assert.ok(model.machine.lines.length <= 3);
    assert.ok(model.machine.lines.every(line => typeof line === 'string' && line.length < 90));
    assert.ok(model.machine.progress >= 0 && model.machine.progress <= 1);
    assert.doesNotMatch(JSON.stringify(model), /simulat(?:ed|ion)/i);
  }
});
