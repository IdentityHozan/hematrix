import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createLab, selectedSession, selectBay, configureLab,
  loadFraction, insertKit, startBay, pauseBay, tickLab,
  setScenario, setCartridge, setDonor, unloadKit, freshKit,
  requirements, kitSummary, labSummary, activeBayIds,
} from '../lab-model.js';
import { act, reactions, canAuthorise, DONORS } from '../engine.js';

const requireOK = (result, operation = 'operation') => assert.equal(result.ok, true, `${operation}: ${result.reason || 'rejected'}`);
const requireBlocked = (result) => assert.equal(result.ok, false);
const current = (lab) => selectedSession(lab);
const loadRequired = (lab) => {
  for (const fraction of requirements(current(lab)).filter((item) => item.required)) {
    requireOK(loadFraction(lab, fraction.id), `load ${fraction.id}`);
  }
};
const prepare = (lab) => {
  loadRequired(lab);
  requireOK(insertKit(lab), 'insert cartridge');
  tickLab(lab, 2);
};
const run = (lab) => {
  prepare(lab);
  requireOK(startBay(lab), 'start selected bay');
};
const finish = (lab) => {
  run(lab);
  tickLab(lab, 600);
};
const matchDonor = (group = 'A+') => DONORS.find((donor) => donor.group === group && !donor.antigens.includes('K')).id;

for (const config of [2, 4, 8, 16]) {
  test(`${config}-bay lab starts with distinct idle sessions and fresh cartridges`, () => {
    const lab = createLab(config);
    assert.equal(lab.config, config);
    assert.equal(lab.sessions.length, config);
    assert.equal(new Set(lab.sessions.map((session) => session.kit.id)).size, config);
    assert.deepEqual(lab.sessions.map((session) => session.bay), Array.from({ length: config }, (_, i) => i + 1));
    assert.ok(lab.sessions.every((session) => !session.engine.running && session.engine.elapsed === 0));
    assert.ok(lab.sessions.every((session) => session.kit.status === 'fresh' && !session.kit.consumed));
    assert.deepEqual(activeBayIds(lab), []);
  });
}

test('Complete Routine requires patient red cells, patient plasma and identified donor cells', () => {
  const lab = createLab();
  assert.deepEqual(requirements(current(lab)).filter((item) => item.required).map((item) => item.id).sort(), ['donor-cells', 'patient-cells', 'patient-plasma']);
  assert.equal(kitSummary(current(lab)).requiredCount, 3);
});

test('Type & Screen requires the two patient fractions and excludes donor loading', () => {
  const lab = createLab();
  requireOK(setCartridge(lab, 'type'));
  assert.deepEqual(requirements(current(lab)).filter((item) => item.required).map((item) => item.id).sort(), ['patient-cells', 'patient-plasma']);
  assert.equal(kitSummary(current(lab)).requiredCount, 2);
  requireBlocked(loadFraction(lab, 'donor-cells'));
  finish(lab);
  assert.equal(reactions(current(lab).engine).some((reaction) => reaction.kind === 'crossmatch'), false);
});

test('Match Only loads patient plasma and donor cells using a valid prior workup', () => {
  const lab = createLab();
  requireOK(setCartridge(lab, 'match'));
  assert.equal(current(lab).engine.patient.validPrior, true);
  assert.deepEqual(requirements(current(lab)).filter((item) => item.required).map((item) => item.id).sort(), ['donor-cells', 'patient-plasma']);
  requireBlocked(loadFraction(lab, 'patient-cells'));
  finish(lab);
  assert.equal(canAuthorise(current(lab).engine), true);
  assert.equal(reactions(current(lab).engine).some((reaction) => reaction.kind === 'typing' || reaction.kind === 'screen'), false);
});

test('an incomplete cartridge cannot be inserted or started', () => {
  const lab = createLab();
  requireBlocked(insertKit(lab));
  requireBlocked(startBay(lab));
  requireOK(loadFraction(lab, 'patient-cells'));
  assert.equal(kitSummary(current(lab)).loadedCount, 1);
  assert.equal(kitSummary(current(lab)).readyToInsert, false);
  requireBlocked(insertKit(lab));
  requireBlocked(startBay(lab));
  assert.equal(current(lab).engine.elapsed, 0);
});

test('loading required patient fractions verifies only their linked fictional record', () => {
  const lab = createLab();
  assert.equal(current(lab).engine.verified, false);
  requireOK(loadFraction(lab, 'patient-cells'));
  assert.equal(current(lab).engine.verified, true);
  assert.equal(current(lab).loading.patientCells, true);
  assert.equal(current(lab).loading.patientPlasma, false);
  assert.equal(current(lab).loading.donorCells, false);
});

test('a wrong-patient specimen cannot pass through explicit loading into a running assay', () => {
  const lab = createLab();
  requireOK(setScenario(lab, 'mismatch'));
  requireBlocked(loadFraction(lab, 'patient-cells'));
  requireBlocked(loadFraction(lab, 'patient-plasma'));
  requireBlocked(insertKit(lab));
  requireBlocked(startBay(lab));
  assert.equal(current(lab).engine.verified, false);
  assert.equal(current(lab).engine.running, false);
  assert.equal(current(lab).engine.elapsed, 0);
});

test('insertion locks the prepared kit without starting a test automatically', () => {
  const lab = createLab();
  loadRequired(lab);
  assert.equal(kitSummary(current(lab)).readyToInsert, true);
  requireOK(insertKit(lab));
  tickLab(lab, 2);
  assert.equal(current(lab).loading.inserted, true);
  assert.equal(current(lab).kit.status, 'inserted');
  assert.equal(current(lab).engine.running, false);
  assert.equal(current(lab).engine.elapsed, 0);
  assert.equal(kitSummary(current(lab)).readyToRun, true);
});

test('start requires physical insertion after all fractions are loaded', () => {
  const lab = createLab();
  loadRequired(lab);
  requireBlocked(startBay(lab));
  assert.equal(current(lab).engine.running, false);
  requireOK(insertKit(lab));
  tickLab(lab, 2);
  requireOK(startBay(lab));
  assert.equal(current(lab).kit.status, 'running');
  assert.equal(current(lab).engine.running, true);
});

test('completed analysis marks a single-use cartridge consumed and used', () => {
  const lab = createLab();
  finish(lab);
  assert.equal(current(lab).engine.elapsed, 600);
  assert.equal(current(lab).kit.status, 'used');
  assert.equal(current(lab).kit.consumed, true);
  assert.equal(labSummary(lab).totalConsumed, 1);
  assert.equal(current(lab).engine.authorised, false);
});

test('an invalid analytical control consumes the affected cartridge and blocks review', () => {
  const lab = createLab();
  requireOK(setScenario(lab, 'qc'));
  finish(lab);
  assert.equal(current(lab).engine.status, 'Invalid QC');
  assert.equal(current(lab).kit.status, 'used');
  assert.equal(current(lab).kit.consumed, true);
  assert.equal(canAuthorise(current(lab).engine), false);
});

test('running cartridges cannot be unloaded or replaced', () => {
  const lab = createLab();
  run(lab);
  tickLab(lab, 100);
  const id = current(lab).kit.id;
  requireBlocked(unloadKit(lab));
  requireBlocked(freshKit(lab));
  assert.equal(current(lab).kit.id, id);
  assert.equal(current(lab).engine.running, true);
});

test('pausing does not consume a cartridge or advance its analytical timer', () => {
  const lab = createLab();
  run(lab);
  tickLab(lab, 100);
  const elapsed = current(lab).engine.elapsed;
  requireOK(pauseBay(lab));
  tickLab(lab, 200);
  assert.equal(current(lab).engine.elapsed, elapsed);
  assert.equal(current(lab).kit.consumed, false);
  assert.equal(labSummary(lab).totalConsumed, 0);
  requireOK(startBay(lab));
  tickLab(lab, 500);
  assert.equal(current(lab).engine.elapsed, 600);
  assert.equal(current(lab).kit.consumed, true);
});

test('two independent bays retain different donors and produce different results in parallel', () => {
  const lab = createLab();
  requireOK(setDonor(lab, matchDonor('B+')));
  run(lab);
  requireOK(selectBay(lab, 2));
  requireOK(setDonor(lab, matchDonor('A+')));
  run(lab);
  assert.deepEqual(activeBayIds(lab).sort((a, b) => a - b), [1, 2]);
  tickLab(lab, 600);
  const [first, second] = lab.sessions;
  assert.notEqual(first.engine, second.engine);
  assert.notEqual(first.engine.donorId, second.engine.donorId);
  assert.equal(reactions(first.engine).find((reaction) => reaction.kind === 'crossmatch').positive, true);
  assert.equal(reactions(second.engine).find((reaction) => reaction.kind === 'crossmatch').positive, false);
  assert.equal(first.engine.status, 'Hold / investigate');
  assert.equal(second.engine.status, 'Ready for review');
  assert.equal(labSummary(lab).totalConsumed, 2);
});

test('a fault in one bay cannot invalidate a different bay’s evidence', () => {
  const lab = createLab();
  run(lab);
  requireOK(selectBay(lab, 2));
  run(lab);
  tickLab(lab, 100);
  act(lab.sessions[0].engine, { type: 'fault', id: 'optical', enabled: true });
  tickLab(lab, 600);
  assert.equal(canAuthorise(lab.sessions[0].engine), false);
  assert.equal(lab.sessions[1].engine.status, 'Ready for review');
  assert.equal(canAuthorise(lab.sessions[1].engine), true);
});

test('all sixteen bay identities map to their actual physical bay without generic queue jobs', () => {
  const lab = createLab(16);
  requireOK(selectBay(lab, 16));
  run(lab);
  assert.equal(current(lab).engine.bay, 16);
  assert.deepEqual(activeBayIds(lab), [16]);
  assert.equal(current(lab).engine.jobs.length, 0);
  assert.equal(current(lab).engine.queue.length, 0);
  tickLab(lab, 80);
  requireOK(pauseBay(lab));
  requireOK(startBay(lab));
  assert.equal(current(lab).engine.bay, 16);
});

test('unloading preserves completed result evidence and records contained waste', () => {
  const lab = createLab();
  finish(lab);
  const before = structuredClone(current(lab).engine);
  const id = current(lab).kit.id;
  requireOK(unloadKit(lab));
  assert.equal(current(lab).kit.status, 'removed');
  assert.equal(current(lab).engine.elapsed, before.elapsed);
  assert.equal(current(lab).engine.status, before.status);
  assert.deepEqual(reactions(current(lab).engine), reactions(before));
  assert.equal(current(lab).history.length, 1);
  assert.equal(current(lab).history[0].wasteContained, true);
  assert.equal(kitSummary(current(lab)).canPrepare, true);
  assert.equal(labSummary(lab).totalConsumed, 1);
  assert.equal(current(lab).kit.id, id);
});

test('a used cartridge cannot be silently rerun', () => {
  const lab = createLab();
  finish(lab);
  const id = current(lab).kit.id;
  requireBlocked(startBay(lab));
  requireBlocked(insertKit(lab));
  requireBlocked(freshKit(lab));
  assert.equal(current(lab).kit.id, id);
  assert.equal(current(lab).engine.elapsed, 600);
});

test('fresh preparation after removal creates a unique cartridge and clears loaded fractions', () => {
  const lab = createLab();
  finish(lab);
  const oldId = current(lab).kit.id;
  requireOK(unloadKit(lab));
  requireOK(freshKit(lab));
  assert.notEqual(current(lab).kit.id, oldId);
  assert.equal(current(lab).kit.status, 'fresh');
  assert.equal(current(lab).kit.consumed, false);
  assert.equal(current(lab).engine.elapsed, 0);
  assert.equal(current(lab).loading.patientCells, false);
  assert.equal(current(lab).loading.patientPlasma, false);
  assert.equal(current(lab).loading.donorCells, false);
  assert.equal(current(lab).loading.inserted, false);
  assert.equal(current(lab).history.length, 1);
});

test('consumable totals count unique live and historical kit IDs exactly once', () => {
  const lab = createLab();
  finish(lab);
  assert.equal(labSummary(lab).totalConsumed, 1);
  requireOK(unloadKit(lab));
  assert.equal(labSummary(lab).totalConsumed, 1);
  requireOK(freshKit(lab));
  assert.equal(labSummary(lab).totalConsumed, 1);
  finish(lab);
  assert.equal(labSummary(lab).totalConsumed, 2);
  requireOK(unloadKit(lab));
  assert.equal(labSummary(lab).totalConsumed, 2);
});

test('scenario, donor and scope cannot change underneath a loaded cartridge', () => {
  const lab = createLab();
  requireOK(loadFraction(lab, 'patient-cells'));
  const before = { scenario: current(lab).engine.scenarioId, donor: current(lab).engine.donorId, scope: current(lab).engine.cartridge };
  requireBlocked(setScenario(lab, 'antibody'));
  requireBlocked(setDonor(lab, matchDonor('B+')));
  requireBlocked(setCartridge(lab, 'type'));
  assert.equal(current(lab).engine.scenarioId, before.scenario);
  assert.equal(current(lab).engine.donorId, before.donor);
  assert.equal(current(lab).engine.cartridge, before.scope);
});

test('removing and preparing a new cartridge permits a new scenario and scope', () => {
  const lab = createLab();
  finish(lab);
  requireOK(unloadKit(lab));
  requireOK(freshKit(lab));
  requireOK(setScenario(lab, 'screen'));
  requireOK(setCartridge(lab, 'type'));
  assert.equal(current(lab).engine.scenarioId, 'screen');
  assert.equal(current(lab).engine.cartridge, 'type');
  assert.equal(current(lab).history.length, 1);
});

test('expansion preserves existing in-flight engines, cartridges and histories', () => {
  const lab = createLab();
  run(lab);
  tickLab(lab, 100);
  const first = lab.sessions[0];
  const second = lab.sessions[1];
  requireOK(configureLab(lab, 8));
  assert.equal(lab.sessions.length, 8);
  assert.equal(lab.sessions[0], first);
  assert.equal(lab.sessions[1], second);
  assert.equal(lab.sessions[0].engine.elapsed, 100);
  assert.equal(lab.sessions[0].engine.running, true);
  assert.equal(new Set(lab.sessions.map((session) => session.kit.id)).size, 8);
});

test('reduction blocks removal of loaded, active or historically occupied bays', () => {
  const lab = createLab(4);
  requireOK(selectBay(lab, 4));
  requireOK(loadFraction(lab, 'patient-cells'));
  requireBlocked(configureLab(lab, 2));
  assert.equal(lab.config, 4);
  requireOK(unloadKit(lab));
  requireOK(freshKit(lab));
  assert.ok(current(lab).history.length > 0);
  requireBlocked(configureLab(lab, 2));
  assert.equal(lab.config, 4);
});

test('empty bay reduction succeeds and keeps selection within the remaining analyser', () => {
  const lab = createLab(8);
  requireOK(selectBay(lab, 8));
  requireOK(configureLab(lab, 2));
  assert.equal(lab.sessions.length, 2);
  assert.equal(lab.config, 2);
  assert.ok(lab.selectedBay >= 1 && lab.selectedBay <= 2);
  assert.ok(current(lab));
});

test('invalid bay selections and unsupported configurations do not corrupt the lab', () => {
  const lab = createLab();
  requireBlocked(selectBay(lab, 0));
  requireBlocked(selectBay(lab, 3));
  requireBlocked(configureLab(lab, 3));
  assert.equal(lab.config, 2);
  assert.equal(lab.sessions.length, 2);
  assert.equal(lab.selectedBay, 1);
});

test('repeated loading cannot duplicate a specimen fraction or accept an unknown inlet', () => {
  const lab = createLab();
  requireOK(loadFraction(lab, 'patient-cells'));
  const before = kitSummary(current(lab)).loadedCount;
  loadFraction(lab, 'patient-cells');
  assert.equal(kitSummary(current(lab)).loadedCount, before);
  requireBlocked(loadFraction(lab, 'unlabelled-fluid'));
  assert.equal(kitSummary(current(lab)).loadedCount, 1);
});

test('all sixteen cartridges can run independently in their actual selected bays', () => {
  const lab = createLab(16);
  for (let bay = 1; bay <= 16; bay++) {
    requireOK(selectBay(lab, bay));
    run(lab);
    assert.equal(current(lab).engine.bay, bay);
  }
  assert.equal(activeBayIds(lab).length, 16);
  assert.equal(labSummary(lab).running, 16);
  assert.equal(new Set(lab.sessions.map((session) => session.engine)).size, 16);
  tickLab(lab, 600);
  assert.equal(activeBayIds(lab).length, 0);
  assert.equal(labSummary(lab).totalConsumed, 16);
  assert.ok(lab.sessions.every((session) => session.kit.status === 'used' && session.engine.elapsed === 600));
});

test('historical result snapshots remain independent from the next cartridge’s donor and scope', () => {
  const lab = createLab();
  finish(lab);
  const previousDonor = current(lab).engine.donorId;
  requireOK(unloadKit(lab));
  const history = current(lab).history[0];
  const previousReactions = reactions(history.engine);
  requireOK(freshKit(lab));
  requireOK(setDonor(lab, matchDonor('B+')));
  requireOK(setCartridge(lab, 'type'));
  assert.equal(history.engine.donorId, previousDonor);
  assert.equal(history.engine.cartridge, 'complete');
  assert.equal(history.engine.elapsed, 600);
  assert.deepEqual(reactions(history.engine), previousReactions);
  assert.notEqual(history.engine, current(lab).engine);
});

test('qualified authorisation is recorded only on the reviewed bay', () => {
  const lab = createLab();
  finish(lab);
  requireOK(selectBay(lab, 2));
  finish(lab);
  act(lab.sessions[0].engine, { type: 'review', decision: 'authorise', operator: 'DEMO-REVIEWER-1', note: 'Bay 1 fictional panel reviewed.' });
  assert.equal(lab.sessions[0].engine.authorised, true);
  assert.equal(lab.sessions[0].engine.reviewer, 'DEMO-REVIEWER-1');
  assert.equal(lab.sessions[1].engine.authorised, false);
  assert.equal(lab.sessions[1].engine.reviewer, '');
  assert.equal(lab.sessions[1].engine.status, 'Ready for review');
});

test('an expired preflight cartridge is rejected and cannot be reused', () => {
  const lab = createLab();
  requireOK(setScenario(lab, 'expired'));
  prepare(lab);
  requireBlocked(startBay(lab));
  assert.equal(current(lab).engine.running, false);
  assert.equal(current(lab).engine.elapsed, 0);
  assert.equal(current(lab).engine.status, 'Invalid QC');
  assert.equal(current(lab).kit.status, 'used');
  assert.equal(current(lab).kit.consumed, true);
  requireBlocked(startBay(lab));
  requireBlocked(freshKit(lab));
});

test('an interrupted optical fault consumes only its affected loaded kit', () => {
  const lab = createLab();
  run(lab);
  tickLab(lab, 100);
  act(current(lab).engine, { type: 'fault', id: 'optical', enabled: true });
  requireOK(tickLab(lab, 0));
  assert.equal(current(lab).engine.running, false);
  assert.equal(current(lab).engine.requiresRepeat, true);
  assert.equal(current(lab).kit.status, 'used');
  assert.equal(current(lab).kit.consumed, true);
  assert.equal(lab.sessions[1].kit.status, 'fresh');
  requireBlocked(startBay(lab));
  act(current(lab).engine, { type: 'fault', id: 'optical', enabled: false });
  requireBlocked(startBay(lab));
  assert.equal(labSummary(lab).totalConsumed, 1);
});

test('discarding a paused partially processed kit counts it as consumed and retains its evidence', () => {
  const lab = createLab();
  run(lab);
  tickLab(lab, 120);
  requireOK(pauseBay(lab));
  requireOK(unloadKit(lab));
  assert.equal(current(lab).kit.consumed, true);
  assert.equal(current(lab).history[0].engine.elapsed, 120);
  assert.equal(current(lab).history[0].kit.consumed, true);
  assert.equal(labSummary(lab).totalConsumed, 1);
  requireOK(freshKit(lab));
  assert.equal(current(lab).engine.elapsed, 0);
  assert.equal(current(lab).history[0].engine.elapsed, 120);
  assert.equal(labSummary(lab).totalConsumed, 1);
});

test('a mechanical scenario isolates its selected physical bay without disabling another bay', () => {
  const lab = createLab(4);
  requireOK(selectBay(lab, 4));
  requireOK(setScenario(lab, 'mechanical'));
  prepare(lab);
  assert.deepEqual(current(lab).engine.unavailableBays, [4]);
  requireBlocked(startBay(lab));
  requireOK(selectBay(lab, 1));
  run(lab);
  tickLab(lab, 600);
  assert.equal(lab.sessions[0].engine.status, 'Ready for review');
  assert.equal(lab.sessions[3].engine.elapsed, 0);
  assert.equal(lab.sessions[3].engine.running, false);
});

test('default patient, specimen and order identifiers are distinct and internally linked in every bay', () => {
  const lab = createLab(16);
  for (const field of ['id', 'specimen', 'order']) {
    assert.equal(new Set(lab.sessions.map((session) => session.engine.patient[field])).size, 16, `${field} must identify an independent bay record`);
  }
  for (const session of lab.sessions) {
    const patient = session.engine.patient;
    assert.equal(patient.specimen, patient.expectedSpecimen);
    assert.equal(patient.specimenPatientId, patient.id);
    assert.equal(patient.priorWorkup.patientId, patient.id);
  }
});

test('changing a bay scenario preserves complete identity links without altering other bay records', () => {
  const lab = createLab(4);
  const untouched = structuredClone(lab.sessions[0].engine.patient);
  requireOK(selectBay(lab, 3));
  requireOK(setScenario(lab, 'antibody'));
  const patient = current(lab).engine.patient;
  assert.equal(patient.specimen, patient.expectedSpecimen);
  assert.equal(patient.specimenPatientId, patient.id);
  assert.notEqual(patient.id, untouched.id);
  assert.deepEqual(lab.sessions[0].engine.patient, untouched);
  requireOK(setScenario(lab, 'mismatch'));
  const wrong = current(lab).engine.patient;
  assert.notEqual(wrong.specimenPatientId, wrong.id);
  assert.notEqual(wrong.specimen, wrong.expectedSpecimen);
  requireBlocked(loadFraction(lab, 'patient-cells'));
  requireOK(setScenario(lab, 'routine'));
  const corrected = current(lab).engine.patient;
  assert.equal(corrected.specimen, corrected.expectedSpecimen);
  assert.equal(corrected.specimenPatientId, corrected.id);
  assert.equal(corrected.priorWorkup.patientId, corrected.id);
  requireOK(loadFraction(lab, 'patient-cells'));
});

test('a completed retained result remains reviewable after removal and a fresh cartridge is prepared', () => {
  const lab = createLab();
  finish(lab);
  requireOK(unloadKit(lab));
  const retained = current(lab).history[0];
  assert.equal(retained.engine.authorised, false);
  requireOK(freshKit(lab));
  requireOK(setDonor(lab, matchDonor('B+')));
  act(retained.engine, { type: 'review', decision: 'authorise', operator: 'DEMO-ARCHIVE-REVIEWER', note: 'Review of completed original cartridge evidence.' });
  assert.equal(retained.engine.authorised, true);
  assert.equal(retained.engine.reviewer, 'DEMO-ARCHIVE-REVIEWER');
  assert.equal(current(lab).engine.authorised, false);
  assert.equal(current(lab).engine.elapsed, 0);
  assert.notEqual(retained.engine.donorId, current(lab).engine.donorId);
  assert.ok(retained.engine.audit.some((event) => /DEMO-ARCHIVE-REVIEWER/.test(event.event)));
});

test('a wrong-patient fault after loading invalidates the physical kit before any assay elapsed time', () => {
  const lab = createLab();
  requireOK(loadFraction(lab, 'patient-cells'));
  act(current(lab).engine, { type: 'fault', id: 'wrong-patient', enabled: true });
  requireOK(tickLab(lab, 0));
  assert.equal(current(lab).engine.elapsed, 0);
  assert.equal(current(lab).kit.status, 'used');
  assert.equal(current(lab).kit.consumed, true);
  act(current(lab).engine, { type: 'fault', id: 'wrong-patient', enabled: false });
  requireBlocked(loadFraction(lab, 'patient-plasma'));
  requireBlocked(insertKit(lab));
  requireBlocked(startBay(lab));
  requireOK(unloadKit(lab));
  requireOK(freshKit(lab));
  run(lab);
  assert.equal(current(lab).engine.running, true);
});

test('Match Only rejects a prior workup bound to another patient', () => {
  const lab = createLab();
  requireOK(setCartridge(lab, 'match'));
  current(lab).engine.patient.priorWorkup.patientId = 'PT-OTHER';
  loadRequired(lab);
  requireBlocked(insertKit(lab));
  requireBlocked(startBay(lab));
  assert.equal(current(lab).engine.elapsed, 0);
  assert.equal(current(lab).engine.running, false);
});

test('pending completed results are counted once after removal and remain pending after a fresh kit is prepared', () => {
  const lab = createLab();
  finish(lab);
  assert.equal(labSummary(lab).resultsWaiting, 1);
  requireOK(unloadKit(lab));
  assert.equal(current(lab).engine.elapsed, 600);
  assert.equal(current(lab).history[0].engine.elapsed, 600);
  assert.equal(labSummary(lab).resultsWaiting, 1, 'Removed current evidence must not duplicate its retained snapshot');
  requireOK(freshKit(lab));
  assert.equal(current(lab).engine.elapsed, 0);
  assert.equal(labSummary(lab).resultsWaiting, 1, 'A pending retained result survives preparation of the next cartridge');
});

test('authorising the retained result clears its waiting count even while the removed current engine remains unauthorised', () => {
  const lab = createLab();
  finish(lab);
  requireOK(unloadKit(lab));
  const retained = current(lab).history[0];
  act(retained.engine, { type: 'review', decision: 'authorise', operator: 'LAB-RETAINED' });
  assert.equal(retained.engine.authorised, true);
  assert.equal(current(lab).engine.authorised, false);
  assert.equal(labSummary(lab).resultsWaiting, 0);
  requireOK(freshKit(lab));
  assert.equal(labSummary(lab).resultsWaiting, 0);
});

test('waiting results include separate current and retained cartridges without losing independent review states', () => {
  const lab = createLab();
  finish(lab);
  requireOK(unloadKit(lab));
  requireOK(freshKit(lab));
  finish(lab);
  assert.equal(labSummary(lab).resultsWaiting, 2);
  act(current(lab).history[0].engine, { type: 'review', decision: 'authorise', operator: 'LAB-OLD' });
  assert.equal(labSummary(lab).resultsWaiting, 1);
  act(current(lab).engine, { type: 'review', decision: 'authorise', operator: 'LAB-NEW' });
  assert.equal(labSummary(lab).resultsWaiting, 0);
});

test('start and resume audit records identify the actual physical bay', () => {
  const lab = createLab();
  requireOK(selectBay(lab, 2));
  run(lab);
  requireOK(tickLab(lab, 20));
  requireOK(pauseBay(lab));
  requireOK(startBay(lab));
  const starts = current(lab).engine.audit.filter(event => /^(Started|Resumed) /.test(event.event));
  assert.equal(starts.length, 2);
  assert.ok(starts.every(event => /in bay 2\./.test(event.event)));
  assert.ok(starts.every(event => !/in bay 1\./.test(event.event)));
  assert.equal(current(lab).engine.bay, 2);
});
