import { CARTRIDGES, DONORS, SCENARIOS, createState, act, canAuthorise } from './engine.js';

export const PROPOSED_SPEC = Object.freeze({
  coreWidthCm: 45, coreDepthCm: 35, coreHeightCm: 30, coreMass: '<18 kg',
  coreBays: 2, configurations: Object.freeze([2, 4, 8, 16]), clusterUnits: 2,
  cartridgeUse: 'Single use', analyticalCycleSeconds: 600,
  origin: 'Proposed design specifications; not measured device performance.'
});
const CONFIGS = [2, 4, 8, 16];
const FRACTIONS = [
  { id: 'patient-cells', key: 'patientCells', label: 'Patient red cells', source: 'Identified recipient specimen', description: 'Load the patient’s prepared red-cell sample. It is used to check the blood group.' },
  { id: 'patient-plasma', key: 'patientPlasma', label: 'Patient plasma', source: 'Identified recipient specimen', description: 'Load the patient’s prepared plasma, the liquid part of the sample. It is used for the required blood-group, antibody and donor checks.' },
  { id: 'donor-cells', key: 'donorCells', label: 'Donor red cells', source: 'Identified donor-unit segment', description: 'Load prepared red cells from the selected donor unit. These are tested with the patient’s plasma.' }
];
const ok = () => ({ ok: true });
const fail = reason => ({ ok: false, reason });
const clone = value => structuredClone(value);
const emptyLoading = () => ({ patientCells: false, patientPlasma: false, donorCells: false, inserted: false, insertionProgress: 0, inserting: false });
const anyFraction = session => ['patientCells', 'patientPlasma', 'donorCells'].some(key => session.loading[key]);
const correctPrior = engine => {
  const prior = engine.patient.priorWorkup;
  const samePatient = prior?.patientId ? prior.patientId === engine.patient.id : prior?.recordId?.startsWith(`HX-${engine.patient.id}-`);
  return !!engine.patient.validPrior && !!samePatient && prior?.group === engine.patient.group && prior?.screen === 'negative';
};
const newKit = (lab, scope = 'complete') => ({ id: `HX-KIT-${String(++lab.kitSequence).padStart(4, '0')}`, scope, status: 'fresh', consumed: false, wasteContained: true });

function bindBayIdentifiers(engine, bay) {
  const suffix = `-B${String(bay).padStart(2, '0')}`;
  engine.patient.id += suffix;
  engine.patient.expectedSpecimen += suffix;
  engine.patient.order += suffix;
  if (!engine.faults.includes('wrong-patient')) {
    engine.patient.specimen = engine.patient.expectedSpecimen;
    engine.patient.specimenPatientId = engine.patient.id;
  }
  if (engine.patient.priorWorkup) {
    engine.patient.priorWorkup.patientId = engine.patient.id;
    engine.patient.priorWorkup.recordId = `PRIOR-${engine.patient.id}`;
  }
}
function makeSession(lab, bay) {
  const engine = createState(); engine.config = lab.config; bindBayIdentifiers(engine, bay);
  return { bay, engine, loading: emptyLoading(), kit: newKit(lab), history: [] };
}
export function createLab(config = 2) {
  const count = CONFIGS.includes(Number(config)) ? Number(config) : 2;
  const lab = { config: count, selectedBay: 1, sessions: [], kitSequence: 0, clock: 0 };
  lab.sessions = Array.from({ length: count }, (_, index) => makeSession(lab, index + 1));
  return lab;
}
export function selectedSession(lab) { return lab.sessions.find(session => session.bay === lab.selectedBay); }
export function selectBay(lab, bay) {
  const value = Number(bay);
  if (!lab.sessions.some(session => session.bay === value)) return fail('Select a bay in the current configuration.');
  lab.selectedBay = value; return ok();
}
function untouched(session) {
  return session.kit.status === 'fresh' && !session.kit.consumed && !anyFraction(session) && !session.loading.inserted && !session.loading.inserting && session.engine.elapsed === 0 && !session.engine.running && !session.engine.authorised;
}
function settable(session) {
  return untouched(session) ? null : 'Prepare a fresh kit before changing the patient, donor or test type. The current record is retained.';
}
export function configureLab(lab, count) {
  const value = Number(count);
  if (!CONFIGS.includes(value)) return fail('Choose two, four, eight or sixteen bays.');
  if (value === lab.config) return ok();
  if (value < lab.config && lab.sessions.some(session => session.bay > value && (!untouched(session) || session.history.length))) return fail('The bays being removed contain a kit or retained record. Keep those bays available.');
  lab.config = value;
  if (value > lab.sessions.length) for (let bay = lab.sessions.length + 1; bay <= value; bay++) lab.sessions.push(makeSession(lab, bay));
  else lab.sessions = lab.sessions.filter(session => session.bay <= value);
  lab.sessions.forEach(session => { session.engine.config = value; });
  if (lab.selectedBay > value) lab.selectedBay = value;
  return ok();
}
export function requirements(session) {
  const scope = session.engine.cartridge;
  return FRACTIONS.map(fraction => ({
    id: fraction.id, label: fraction.label, source: fraction.source, description: fraction.description,
    required: fraction.id === 'patient-cells' ? scope !== 'match' : fraction.id === 'donor-cells' ? scope !== 'type' : true,
    loaded: !!session.loading[fraction.key]
  }));
}
function kitBlock(session) {
  if (session.kit.status === 'removed') return 'The cartridge has been removed. Prepare a fresh kit.';
  if (session.kit.consumed || session.kit.status === 'used') return 'This single-use cartridge is spent. Remove it and prepare a fresh kit.';
  if (session.engine.running) return 'This bay is already analysing its cartridge.';
  return '';
}
function identityCheck(session) {
  act(session.engine, { type: 'verify' });
  return session.engine.verified ? '' : 'The patient, sample and test order IDs do not agree. Retrieve the correct sample before loading.';
}
function finishAffectedKit(session) {
  const engine = session.engine;
  if (engine.patient.priorWorkup && !engine.patient.priorWorkup.patientId && engine.patient.priorWorkup.recordId?.startsWith(`HX-${engine.patient.id}-`)) engine.patient.priorWorkup.patientId = engine.patient.id;
  if (session.kit.status === 'removed' || session.kit.status === 'fresh') return;
  const patientContact = session.loading.patientCells || session.loading.patientPlasma;
  const changedIdentity = patientContact && (engine.faults.includes('wrong-patient') || engine.patient.specimenPatientId !== engine.patient.id || engine.patient.specimen !== engine.patient.expectedSpecimen);
  if (engine.elapsed >= 600 || engine.requiresRepeat || changedIdentity || /Invalid QC/.test(engine.status) || (/Hold \/ investigate/.test(engine.status) && (engine.elapsed > 0 || session.loading.inserted))) {
    session.kit.status = 'used'; session.kit.consumed = true;
    session.loading.inserting = false; session.loading.insertionProgress = session.loading.inserted ? 1 : 0;
  }
}
export function loadFraction(lab, id) {
  const session = selectedSession(lab);
  const fraction = FRACTIONS.find(item => item.id === id);
  if (!fraction) return fail('Choose patient red cells, patient plasma or donor red cells.');
  const block = kitBlock(session); if (block) return fail(block);
  if (session.loading.inserted || session.loading.inserting) return fail('The cartridge is seated. Do not add specimens after insertion.');
  const requirement = requirements(session).find(item => item.id === id);
  if (!requirement.required) return fail(`This sample is not required for the selected test.`);
  if (id.startsWith('patient-')) { const identity = identityCheck(session); if (identity) return fail(identity); }
  if (id === 'donor-cells' && !DONORS.some(donor => donor.id === session.engine.donorId)) return fail('Identify a donor unit before loading its red cells.');
  if (session.loading[fraction.key]) return ok();
  session.loading[fraction.key] = true;
  session.kit.status = 'loaded';
  session.engine.audit.push({ time: session.engine.queueClock, elapsed: session.engine.elapsed, event: `${fraction.label} loaded into ${session.kit.id}. Specimen route confirmed.` });
  return ok();
}
export function insertKit(lab) {
  const session = selectedSession(lab);
  const block = kitBlock(session); if (block) return fail(block);
  if (session.loading.inserted) return ok();
  const missing = requirements(session).filter(item => item.required && !item.loaded);
  if (missing.length) return fail(`Load ${missing.map(item => item.label.toLowerCase()).join(' and ')} before inserting the cartridge.`);
  const identity = identityCheck(session); if (identity) return fail(identity);
  if (session.engine.cartridge === 'match' && !correctPrior(session.engine)) return fail('Match Only needs valid earlier blood-group and antibody test results approved by laboratory staff.');
  session.loading.inserted = true; session.loading.inserting = false; session.loading.insertionProgress = 1;
  session.kit.status = 'inserted';
  session.engine.audit.push({ time: session.engine.queueClock, elapsed: session.engine.elapsed, event: `${session.kit.id} seated and locked in bay ${session.bay}. Reagents and controls are preloaded.` });
  return ok();
}
export function startBay(lab) {
  const session = selectedSession(lab);
  const block = kitBlock(session); if (block) return fail(block);
  if (!session.loading.inserted || session.loading.inserting) return fail('Insert the loaded test kit before starting the test.');
  if (requirements(session).some(item => item.required && !item.loaded)) return fail('Load all required samples before starting.');
  if (session.engine.unavailableBays.includes(session.bay)) return fail(`Bay ${session.bay} is isolated by an instrument fault. Use an unaffected bay.`);
  const identity = identityCheck(session);
  if (identity) { finishAffectedKit(session); return fail(identity); }
  // Assign the physical slot before the engine records its start/resume event.
  session.engine.bay = session.bay;
  act(session.engine, { type: 'start' });
  if (!session.engine.running) {
    finishAffectedKit(session);
    return fail(session.engine.audit.at(-1)?.event || 'This test cannot start until the required checks are resolved.');
  }
  // Each bay owns its own engine. No generic queue or shared local bay allocator is used.
  session.engine.bay = session.bay;
  session.kit.status = 'running'; return ok();
}
export function pauseBay(lab) {
  const session = selectedSession(lab);
  if (!session.engine.running) return fail('This bay is not currently analysing.');
  act(session.engine, { type: 'pause' }); return ok();
}
export function tickLab(lab, seconds) {
  const delta = Number(seconds);
  if (!Number.isFinite(delta) || delta < 0) return fail('Advance by a non-negative number of seconds.');
  if (lab.sessions.some(session => session.engine.running)) lab.clock += delta;
  for (const session of lab.sessions) {
    if (session.engine.running) act(session.engine, { type: 'tick', seconds: delta });
    finishAffectedKit(session);
  }
  return ok();
}
export function setScenario(lab, id) {
  const session = selectedSession(lab); const blocked = settable(session); if (blocked) return fail(blocked);
  if (!SCENARIOS.some(scenario => scenario.id === id)) return fail('Choose a case from the list.');
  act(session.engine, { type: 'scenario', id }); session.engine.config = lab.config; bindBayIdentifiers(session.engine, session.bay);
  if (id === 'mechanical') session.engine.unavailableBays = [session.bay];
  session.kit.scope = session.engine.cartridge;
  return ok();
}
export function setCartridge(lab, type) {
  const session = selectedSession(lab); const blocked = settable(session); if (blocked) return fail(blocked);
  if (!CARTRIDGES[type]) return fail('Choose a cartridge type from the list.');
  act(session.engine, { type: 'cartridge', value: type }); session.kit.scope = type; return ok();
}
export function setDonor(lab, id) {
  const session = selectedSession(lab); const blocked = settable(session); if (blocked) return fail(blocked);
  if (!DONORS.some(donor => donor.id === id)) return fail('Choose an identified donor unit.');
  act(session.engine, { type: 'donor', id }); return ok();
}
export function unloadKit(lab) {
  const session = selectedSession(lab);
  if (session.engine.running) return fail('Do not remove a cartridge during an active analytical run.');
  if (session.loading.inserting) return fail('Allow cartridge insertion to finish before removal.');
  if (session.kit.status === 'removed') return fail('The cartridge is already removed.');
  if (untouched(session)) return fail('No loaded or seated cartridge needs removal.');
  finishAffectedKit(session);
  // Contact with specimen makes a discarded cartridge unsuitable for another patient.
  if (anyFraction(session)) session.kit.consumed = true;
  const snapshot = { bay: session.bay, kit: clone({ ...session.kit, status: 'removed', wasteContained: true }), engine: clone(session.engine), loading: clone(session.loading), wasteContained: true, removedAt: lab.clock };
  session.history.push(snapshot);
  session.kit.status = 'removed'; session.kit.wasteContained = true;
  session.loading.inserted = false; session.loading.inserting = false; session.loading.insertionProgress = 0;
  session.engine.audit.push({ time: session.engine.queueClock, elapsed: session.engine.elapsed, event: `${session.kit.id} removed for disposal with its contents sealed. The original test record is retained.` });
  return ok();
}
export function freshKit(lab) {
  const session = selectedSession(lab);
  if (session.kit.status !== 'removed' && !untouched(session)) return fail('Remove the current cartridge before preparing another single-use kit.');
  if (session.engine.running) return fail('Finish or pause the test, then remove its kit before preparing another.');
  act(session.engine, { type: 'repeat' });
  session.engine.config = lab.config;
  session.loading = emptyLoading(); session.kit = newKit(lab, session.engine.cartridge);
  return ok();
}
export function kitSummary(session) {
  const required = requirements(session).filter(item => item.required);
  const missing = required.filter(item => !item.loaded);
  const block = kitBlock(session);
  const priorMissing = session.engine.cartridge === 'match' && !correctPrior(session.engine);
  const readyToInsert = !block && !session.loading.inserted && !session.loading.inserting && !missing.length && session.engine.verified && !priorMissing;
  const readyToRun = !block && session.loading.inserted && !session.loading.inserting && !missing.length && session.engine.verified && !priorMissing && !session.engine.unavailableBays.includes(session.bay);
  return {
    id: session.kit.id, scope: session.kit.scope, status: session.kit.status, consumed: session.kit.consumed,
    readyToInsert: !!readyToInsert, readyToRun: !!readyToRun,
    canUnload: !session.engine.running && !session.loading.inserting && !['fresh', 'removed'].includes(session.kit.status),
    canPrepare: session.kit.status === 'removed' || untouched(session),
    reason: block || (priorMissing ? 'Valid earlier patient test results are required.' : missing.length ? `Load ${missing.map(item => item.label.toLowerCase()).join(' and ')}.` : !session.engine.verified ? 'Check that the patient, sample and order IDs agree.' : ''),
    loadedCount: required.filter(item => item.loaded).length, requiredCount: required.length,
    wasteContained: session.kit.wasteContained, eligible: canAuthorise(session.engine)
  };
}
export function activeBayIds(lab) { return lab.sessions.filter(session => session.engine.running).map(session => session.bay); }
export function labSummary(lab) {
  const consumed = new Set();
  const completedRecords = new Map();
  for (const session of lab.sessions) {
    if (session.kit.consumed) consumed.add(session.kit.id);
    for (const record of session.history) {
      if (record.kit.consumed) consumed.add(record.kit.id);
      if (record.engine.elapsed >= 600) completedRecords.set(record.kit.id, record.engine);
    }
    // Once removed, the retained snapshot is the authoritative reviewable record.
    if (session.kit.status !== 'removed' && session.engine.elapsed >= 600) completedRecords.set(session.kit.id, session.engine);
  }
  return {
    config: lab.config, units: lab.config === 16 ? 2 : 1, selectedBay: lab.selectedBay,
    running: lab.sessions.filter(session => session.engine.running).length,
    used: lab.sessions.filter(session => session.kit.status === 'used').length,
    removed: lab.sessions.filter(session => session.kit.status === 'removed').length,
    loaded: lab.sessions.filter(session => ['loaded', 'inserted', 'running'].includes(session.kit.status)).length,
    available: lab.sessions.filter(untouched).filter(session => !session.engine.unavailableBays.includes(session.bay)).length,
    completed: lab.sessions.filter(session => session.engine.elapsed >= 600).length,
    resultsWaiting: [...completedRecords.values()].filter(engine => !engine.authorised).length,
    totalConsumed: consumed.size,
    recordsRetained: lab.sessions.reduce((sum, session) => sum + session.history.length, 0)
  };
}
