/**
 * Deterministic classroom simulation. Not a clinical assay or a blood-release system.
 * The 600-second analytical cycle and all cartridge chemistry are engineering premises.
 * State changes are centralized so reaction images, QC, workflow and queue agree.
 */
export const CYCLE_SECONDS = 600;
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const CARTRIDGES = {
  complete: { name: 'Complete Routine', short: 'Complete', price: 79, description: 'Checks the patient’s blood group and antibodies, plus one selected donor unit.' },
  type: { name: 'Type and Screen', short: 'Type and Screen', price: 59, description: 'Checks the patient’s blood group and looks for antibodies that may affect donor matching.' },
  match: { name: 'Match Only', short: 'Match Only', price: 49, description: 'Checks one additional donor unit using valid earlier patient test results.' }
};
export const DONORS = [
  { id: 'DU-7001', group: 'A+', antigens: ['A', 'D'], label: 'A positive, K negative' },
  { id: 'DU-7002', group: 'B+', antigens: ['B', 'D'], label: 'B positive, K negative' },
  { id: 'DU-7003', group: 'A+', antigens: ['A', 'D', 'K'], label: 'A positive, K positive' },
  { id: 'DU-7004', group: 'O-', antigens: [], label: 'O negative, K negative' },
  { id: 'DU-7005', group: 'A-', antigens: ['A'], label: 'A negative, K negative' },
  { id: 'DU-7006', group: 'B-', antigens: ['B'], label: 'B negative, K negative' },
  { id: 'DU-7007', group: 'AB+', antigens: ['A', 'B', 'D'], label: 'AB positive, K negative' },
  { id: 'DU-7008', group: 'AB-', antigens: ['A', 'B'], label: 'AB negative, K negative' },
  { id: 'DU-7009', group: 'O+', antigens: ['D'], label: 'O positive, K negative' }
];
export const SCENARIOS = [
  { id: 'routine', title: 'Routine test', subtitle: 'Run the required checks, then review the results before approval.', group: 'A+', donor: 'DU-7001', screen: 'negative', kind: 'Routine' },
  { id: 'abo', title: 'Donor blood group does not match', subtitle: 'The patient sample reacts with cells from a donor with the wrong blood group.', group: 'A+', donor: 'DU-7002', screen: 'negative', kind: 'Investigation' },
  { id: 'antibody', title: 'Same blood group, donor reaction', subtitle: 'Matching blood-group labels can still lead to a reaction with the selected donor.', group: 'A+', donor: 'DU-7003', screen: 'positive', kind: 'Investigation', antibody: 'K' },
  { id: 'screen', title: 'Antibody check finds a reaction', subtitle: 'The antibody check finds a reaction that needs further laboratory investigation.', group: 'A+', donor: 'DU-7001', screen: 'positive', kind: 'Investigation', antibody: 'K' },
  { id: 'weak', title: 'Weak reaction', subtitle: 'A weak reaction needs review before the result can be approved.', group: 'O+', donor: 'DU-7009', screen: 'weak', kind: 'Investigation', antibody: 'K' },
  { id: 'equivocal', title: 'Unclear reaction image', subtitle: 'The camera image is unclear. The test cannot be called positive or negative.', group: 'B+', donor: 'DU-7002', screen: 'equivocal', kind: 'Investigation' },
  { id: 'mismatch', title: 'Sample ID does not match', subtitle: 'The sample barcode does not match the selected patient and test order.', group: 'A+', donor: 'DU-7001', screen: 'negative', kind: 'Identification', faults: ['wrong-patient'] },
  { id: 'qc', title: 'Quality check failed', subtitle: 'A required quality check fails, so the test result cannot be approved.', group: 'A+', donor: 'DU-7001', screen: 'negative', kind: 'Quality control', faults: ['control'] },
  { id: 'urgent', title: 'Urgent request', subtitle: 'An urgent request starts in an available bay while other tests continue.', group: 'O-', donor: 'DU-7004', screen: 'negative', kind: 'Urgent' },
  { id: 'massive', title: 'Major bleeding emergency', subtitle: 'The hospital’s emergency blood-release process continues while testing runs.', group: 'O-', donor: 'DU-7004', screen: 'negative', kind: 'Emergency' },
  { id: 'volume', title: 'Several samples at once', subtitle: 'Different samples can run at the same time in separate bays.', group: 'A+', donor: 'DU-7001', screen: 'negative', kind: 'Workload' },
  { id: 'network', title: 'Connection lost', subtitle: 'The result stays on the machine while it waits for the hospital connection.', group: 'A+', donor: 'DU-7001', screen: 'negative', kind: 'Communication', disconnected: true },
  { id: 'mechanical', title: 'One test bay is unavailable', subtitle: 'One bay is unavailable. Other bays may continue if the shared systems pass their checks.', group: 'A+', donor: 'DU-7001', screen: 'negative', kind: 'Instrument', unavailableBays: [1] },
  { id: 'expired', title: 'Expired test kit', subtitle: 'The test kit has expired and must be replaced.', group: 'A+', donor: 'DU-7001', screen: 'negative', kind: 'Preflight', faults: ['expired'] },
  { id: 'insufficient', title: 'Not enough sample', subtitle: 'There is not enough sample to complete the required tests and quality checks.', group: 'A+', donor: 'DU-7001', screen: 'negative', kind: 'Preflight', faults: ['insufficient'] }
];
export const STAGES = [
  { time: 0, label: 'Verify & load', description: 'Match patient, specimen and order; identify the cartridge and donor unit.' },
  { time: 45, label: 'Sample routing', description: 'Meter patient red cells and plasma into their separate test pathways.' },
  { time: 135, label: 'Reagent delivery', description: 'Deliver the assay-specific reagents and reference red cells.' },
  { time: 240, label: 'Controlled reactions', description: 'Maintain the proposed assay conditions and observe reaction development.' },
  { time: 420, label: 'Optical imaging', description: 'Illuminate each chamber and compare its image with the reference patterns.' },
  { time: 510, label: 'Interpret & check', description: 'Reconcile grouping, screening, donor-specific findings and required QC.' },
  { time: 600, label: 'Qualified review', description: 'A qualified laboratory reviewer evaluates the evidence before authorisation.' }
];
export const FAULTS = [
  { id: 'wrong-patient', name: 'Patient and sample IDs do not match', detail: 'The sample belongs to a different patient. Correct the identification before testing.' },
  { id: 'expired', name: 'Expired test kit', detail: 'The cartridge has expired. Replace it before testing.' },
  { id: 'optical', name: 'Camera view blocked', detail: 'The camera cannot read the test area clearly. Check the camera path and repeat the test.' },
  { id: 'bubble', name: 'Air bubble', detail: 'A bubble interrupts chamber filling and optical interpretation. Replace or repeat.' },
  { id: 'control', name: 'Quality check failed', detail: 'The required positive quality check did not react as expected. The test result is invalid.' },
  { id: 'insufficient', name: 'Not enough sample', detail: 'There is not enough sample to fill the required test areas.' },
  { id: 'temperature', name: 'Test temperature or timing out of range', detail: 'The test temperature or timing is outside its accepted range.' },
  { id: 'maintenance', name: 'Machine service due', detail: 'The machine needs its required service checks before testing.' },
  { id: 'discrepancy', name: 'Blood group checks disagree', detail: 'The blood group checks do not agree. Further laboratory investigation is needed.' },
  { id: 'cartridge', name: 'Test kit ID does not match', detail: 'The test kit ID does not match the selected test order.' }
];
const PREFLIGHT_FAULTS = new Set(['wrong-patient', 'expired', 'insufficient', 'maintenance', 'cartridge']);
const PRIORITY = { urgent: 0, routine: 1, special: 2, review: 3 };
const GROUP_ANTIGENS = { A: ['A'], B: ['B'], AB: ['A', 'B'], O: [] };
const clone = (x) => JSON.parse(JSON.stringify(x));
const scenarioOf = (s) => SCENARIOS.find(x => x.id === s.scenarioId) || SCENARIOS[0];
const has = (s, fault) => s.faults.includes(fault);
const abo = (group) => String(group).replace(/[+−-]/g, '');
const rhPositive = (group) => String(group).endsWith('+');
const normalGroup = (value) => String(value).replace('−', '-');
const donorOf = (s) => DONORS.find(d => d.id === s.donorId);
const identityValid = (s) => !has(s, 'wrong-patient') && s.patient.specimenValid && s.patient.specimen === s.patient.expectedSpecimen && s.patient.specimenPatientId === s.patient.id;
const priorValid = (s) => s.patient.validPrior && s.patient.priorWorkup?.group === s.patient.group && s.patient.priorWorkup?.screen === 'negative';
const atEnd = (s) => s.elapsed >= CYCLE_SECONDS;
const note = (s, event) => {
  s.audit.push({ time: s.queueClock, elapsed: s.elapsed, event });
  if (s.audit.length > 500) s.audit.shift();
};
const stamp = (s) => `T+${String(Math.floor(s.queueClock / 60)).padStart(2, '0')}:${String(Math.floor(s.queueClock % 60)).padStart(2, '0')}`;

export function createState(scenarioId = 'routine') {
  const scenario = SCENARIOS.find(x => x.id === scenarioId) || SCENARIOS[0];
  const index = SCENARIOS.indexOf(scenario);
  return {
    scenarioId: scenario.id,
    patient: {
      id: `PT-${1042 + index}`, specimen: scenario.id === 'mismatch' ? 'SP-2099 / PT-9999' : `SP-${2042 + index}`,
      order: `OR-${3042 + index}`, group: scenario.group, expectedSpecimen: `SP-${2042 + index}`,
      specimenPatientId: scenario.id === 'mismatch' ? 'PT-9999' : `PT-${1042 + index}`,
      history: scenario.antibody ? `Known anti-${scenario.antibody} history` : 'No known antibody history',
      antibodies: scenario.antibody ? [scenario.antibody] : [],
      validPrior: scenario.screen === 'negative',
      priorWorkup: scenario.screen === 'negative' ? { group: scenario.group, screen: 'negative', recordId: `PRIOR-${1042 + index}`, reviewer: 'LAB-PRIOR-DEMO', time: 0 } : null,
      specimenValid: true
    },
    donorId: scenario.donor, cartridge: 'complete', config: 2, elapsed: 0, running: false,
    status: scenario.faults?.includes('wrong-patient') ? 'Awaiting testing' : 'Awaiting testing',
    verified: false, faults: [...(scenario.faults || [])], screen: scenario.screen,
    network: !scenario.disconnected, authorised: false, handedOver: false, reviewer: '',
    reviewNote: '', requiresRepeat: false, manualHold: false, bay: null, cycleSeconds: CYCLE_SECONDS,
    queueClock: 0, queueRunning: false, sequence: 0, queue: [], jobs: [], unavailableBays: [...(scenario.unavailableBays || [])],
    emergencyRelease: scenario.id === 'massive' ? 'Authorised emergency release proceeds independently. Do not wait for this test to finish.' : '',
    audit: [{ time: 0, elapsed: 0, event: `Case selected: ${scenario.title}.` }]
  };
}

function resetAnalytical(s, reason = '') {
  s.elapsed = 0; s.running = false; s.status = 'Awaiting testing'; s.authorised = false;
  s.handedOver = false; s.reviewer = ''; s.reviewNote = ''; s.requiresRepeat = false; s.manualHold = false; s.bay = null;
  if (reason) note(s, reason);
}
function clearAuthorisation(s) {
  s.authorised = false; s.handedOver = false; s.reviewer = '';
}
function donorAssessment(s) {
  if (s.cartridge === 'type') return { matched: true, reactive: false, reason: '' };
  const donor = donorOf(s);
  if (!donor) return { matched: false, reactive: false, reason: 'Identify a donor unit for the requested crossmatch.' };
  const patientABO = abo(s.patient.group);
  const patientAntigens = GROUP_ANTIGENS[patientABO] || [];
  const donorAntigens = GROUP_ANTIGENS[abo(donor.group)] || [];
  const aboReactive = donorAntigens.some(a => !patientAntigens.includes(a));
  const specificReactive = s.patient.antibodies.some(a => donor.antigens.includes(a));
  const unsuitableD = !rhPositive(s.patient.group) && rhPositive(donor.group);
  return {
    matched: !(aboReactive || specificReactive || unsuitableD), reactive: aboReactive || specificReactive,
    reason: aboReactive ? 'Recipient ABO antibodies react with the selected donor red cells.' :
      specificReactive ? 'The donor expresses an antigen targeted by the recipient’s known antibody.' :
      unsuitableD ? 'The RhD-positive donor does not meet the routine RhD-negative selection pathway.' : ''
  };
}
function intrinsicHold(s) {
  if (s.manualHold) return 'A qualified review hold requires documented investigation and repeat testing.';
  const donor = donorAssessment(s);
  if (s.cartridge === 'match' && !priorValid(s)) return 'Match Only requires a valid prior patient workup.';
  if (s.screen !== 'negative' || s.patient.antibodies.length) return 'Further antibody investigation required';
  if (!donor.matched) return donor.reason;
  return '';
}
function settle(s) {
  if (!atEnd(s)) return;
  s.running = false;
  if (s.faults.length || s.requiresRepeat) s.status = has(s, 'wrong-patient') || has(s, 'discrepancy') ? 'Hold / investigate' : 'Invalid QC';
  else if (intrinsicHold(s)) s.status = 'Hold / investigate';
  else if (s.handedOver) s.status = 'Completed handover';
  else if (s.authorised) s.status = s.network ? 'Authorised' : 'Transfer pending';
  else s.status = 'Ready for review';
}
export function canAuthorise(s) {
  return atEnd(s) && s.verified && identityValid(s) && !s.running && !s.faults.length && !s.requiresRepeat && !intrinsicHold(s) && !s.handedOver;
}
export function stageOf(s) {
  let index = 0;
  STAGES.forEach((stage, i) => { if (s.elapsed >= stage.time) index = i; });
  return index;
}

export function reactions(s) {
  const patientABO = abo(s.patient.group);
  const present = GROUP_ANTIGENS[patientABO] || [];
  const donor = donorAssessment(s);
  const invalidImage = has(s, 'optical') || has(s, 'bubble');
  const make = (id, name, input, reagent, positive, kind, interpretation, grade) => {
    const visiblePositive = invalidImage ? null : positive;
    return { id, name, input, reagent, positive: visiblePositive, expectedPositive: positive,
      grade: invalidImage ? 'Uninterpretable' : grade || (positive === true ? '3+' : positive === false ? '0' : '?'),
      interpretation: invalidImage ? 'Unable to interpret. Repeat or investigate.' : interpretation,
      kind, ready: s.elapsed >= (kind === 'typing' ? 420 : 510) };
  };
  const rows = [];
  if (s.cartridge !== 'match') {
    rows.push(make('anti-a', 'Forward ABO: Anti-A', 'Patient red cells', 'Anti-A', present.includes('A'), 'typing', present.includes('A') ? 'A antigen detected' : 'No A-antigen reaction'));
    rows.push(make('anti-b', 'Forward ABO: Anti-B', 'Patient red cells', 'Anti-B', present.includes('B'), 'typing', present.includes('B') ? 'B antigen detected' : 'No B-antigen reaction'));
    rows.push(make('anti-d', 'RhD typing: Anti-D', 'Patient red cells', 'Anti-D with appropriate controls', rhPositive(s.patient.group), 'typing', rhPositive(s.patient.group) ? 'RhD-positive pattern' : 'RhD-negative pattern'));
    const aReverse = !present.includes('A');
    const bReverse = !present.includes('B');
    rows.push({ ...make('reverse-a1', 'Reverse ABO: A1 cells', 'Patient plasma', 'Known reagent A1 red cells', has(s, 'discrepancy') ? !aReverse : aReverse, 'typing', has(s, 'discrepancy') ? 'Forward/reverse ABO discrepancy' : aReverse ? 'Expected anti-A reaction' : 'No expected ABO reactivity'), expectedPositive: aReverse });
    rows.push(make('reverse-b', 'Reverse ABO: B cells', 'Patient plasma', 'Known reagent B red cells', bReverse, 'typing', bReverse ? 'Expected anti-B reaction' : 'No expected ABO reactivity'));
    const screening = s.screen;
    rows.push(make('screen-i', 'Antibody screen: Cell I', 'Patient plasma', 'Selected reagent screening red cells, K positive', screening === 'negative' ? false : screening === 'equivocal' ? null : true, 'screen', screening === 'negative' ? 'No screening reactivity detected' : screening === 'equivocal' ? 'Unresolved reaction. Further investigation required.' : 'Further antibody investigation required', screening === 'weak' ? 'w+' : screening === 'equivocal' ? '?' : undefined));
    rows.push(make('screen-ii', 'Antibody screen: Cell II', 'Patient plasma', 'Selected reagent screening red cells, K negative', false, 'screen', 'No reactivity detected with this screening cell'));
    rows.push(make('screen-iii', 'Antibody screen: Cell III', 'Patient plasma', 'Selected complementary screening red cells, K positive', screening === 'positive', 'screen', screening === 'positive' ? 'Screening reactivity supports further antibody investigation' : 'No reactivity detected with this screening cell'));
  }
  if (s.cartridge !== 'type') {
    rows.push(make('crossmatch', 'Donor-specific crossmatch', 'Patient plasma', `Identified donor red cells: ${s.donorId || 'not selected'}`, s.donorId ? donor.reactive : null, 'crossmatch', !s.donorId ? 'Identify the donor sample before testing.' : donor.reactive ? 'Reactive crossmatch. Hold donor unit and investigate.' : s.screen === 'equivocal' ? 'Crossmatch image nonreactive; unresolved screen still blocks authorisation.' : 'No reactivity detected. Other checks and qualified review remain required.'));
  }
  rows.push({ ...make('positive-control', 'Positive control', 'Method-specific reference material', 'Known positive reference', has(s, 'control') ? false : true, 'control', has(s, 'control') ? 'Failed positive control. Result invalid.' : 'Expected positive control reaction observed'), expectedPositive: true });
  rows.push(make('negative-control', 'Negative control', 'Method-specific reference material', 'Known negative reference', false, 'control', 'Expected negative control reaction observed'));
  return rows;
}

export function qcChecks(s) {
  const end = atEnd(s);
  const check = (id, name, faults, detail, timing = false) => ({ id, name,
    status: faults.some(f => has(s, f)) ? 'fail' : timing && !end ? 'pending' : 'pass', detail });
  const donor = donorAssessment(s);
  return [
    { id: 'identity', name: 'Patient, specimen & order', status: !identityValid(s) ? 'fail' : s.verified ? 'pass' : 'pending', detail: has(s, 'wrong-patient') ? 'Specimen belongs to a different patient. Testing is blocked.' : s.verified ? `${s.patient.id}, ${s.patient.specimen} and ${s.patient.order} agree.` : 'Verify the three linked identifiers before testing.' },
    check('cartridge', 'Cartridge identity', ['cartridge'], 'The cartridge type and identifier match the test order.'),
    check('reagent', 'Reagent lot & expiry', ['expired'], 'Reagent lot and expiry are checked before loading.'),
    check('controls', 'Positive & negative controls', ['control'], has(s, 'control') ? 'The positive control failed. Authorisation is blocked.' : 'Both method-specific reference patterns must agree with expectations.', true),
    check('abo', 'ABO/RhD reconciliation', ['discrepancy'], s.cartridge === 'match' ? 'Match Only requires a valid prior blood-group result.' : 'Forward and reverse grouping must agree; special RhD results require investigation.', true),
    { id: 'screen', name: 'Screen & weak-reaction review', status: s.screen === 'negative' && !s.patient.antibodies.length ? (end ? 'pass' : 'pending') : 'fail', detail: s.screen === 'negative' && !s.patient.antibodies.length ? 'No unexpected reactivity detected with the screening panel.' : 'A reactive, weak or unresolved screen, or known antibody history, requires specialist investigation.' },
    check('optics', 'Optical calibration', ['optical'], 'Reference illumination and camera pattern must be interpretable.', true),
    check('fluidics', 'Chamber fill & isolation', ['bubble', 'insufficient'], 'Check metered filling, channel isolation, leakage and bubbles.', true),
    check('conditions', 'Assay conditions', ['temperature'], 'Temperature and timing are relative to the proposed method, not a universal clinical limit.', true),
    check('maintenance', 'Maintenance & traceability', ['maintenance'], `Instrument, reagent, cartridge and event records are retained locally.`),
    { id: 'donor', name: s.cartridge === 'type' ? 'Donor crossmatch scope' : 'Donor selection & history', status: s.cartridge === 'type' ? 'pass' : !donor.matched || (s.cartridge === 'match' && !priorValid(s)) ? 'fail' : end ? 'pass' : 'pending', detail: s.cartridge === 'type' ? 'Not requested. No donor-specific result is produced.' : donor.reason || (s.cartridge === 'match' && !priorValid(s) ? 'A valid prior patient workup is required.' : 'Unit identity, ABO/RhD selection and relevant antibody history checked.') },
    { id: 'review', name: 'Qualified authorisation', status: s.authorised ? 'pass' : 'pending', detail: s.authorised ? `Reviewing operator: ${s.reviewer}.` : 'A completed analytical cycle does not automatically authorise a result.' },
    { id: 'network', name: 'Hospital result transfer', status: s.network ? 'pass' : 'pending', detail: s.network ? s.authorised ? 'The authorised result is available for handover.' : 'Connection available. No unauthorised result is transmitted.' : 'Transfer pending. No receipt by the ward is assumed.' },
    ...(s.requiresRepeat ? [{ id: 'repeat', name: 'Repeat required', status: 'fail', detail: 'A fault affected this run. Clearing the fault cannot validate the old result; repeat testing is required.' }] : [])
  ];
}

function priorityKey(priority) {
  const value = String(priority || 'Routine').toLowerCase();
  return value.startsWith('urgent') ? 'urgent' : value.startsWith('special') ? 'special' : value.startsWith('await') || value === 'review' ? 'review' : 'routine';
}
function scheduler(s) {
  if (!s.queueRunning) return;
  const occupied = new Set(s.jobs.filter(j => j.status === 'Testing').map(j => j.bay));
  if (s.bay !== null && !atEnd(s)) occupied.add(s.bay);
  s.queue.sort((a, b) => PRIORITY[a.priorityKey] - PRIORITY[b.priorityKey] || a.sequence - b.sequence);
  for (let bay = 1; bay <= s.config; bay++) {
    if (!s.queue.length) break;
    if (occupied.has(bay) || s.unavailableBays.includes(bay)) continue;
    const job = s.queue.shift();
    job.bay = bay; job.startedAt = s.queueClock; job.status = 'Testing';
    s.jobs.push(job); occupied.add(bay);
    note(s, `${job.id} assigned to bay ${bay} (${job.priority}).`);
  }
  s.queue.forEach((job, index) => { job.position = index + 1; });
}
function enqueue(s, count, priority) {
  count = Math.min(48, Math.max(1, Math.floor(Number(count) || 1)));
  const key = priorityKey(priority);
  const title = { urgent: 'Urgent', routine: 'Routine', special: 'Special investigation', review: 'Awaiting review' }[key];
  for (let i = 0; i < count; i++) {
    const sequence = ++s.sequence;
    const job = { id: `Q-${String(sequence).padStart(4, '0')}`, sample: `SP-Q${String(sequence).padStart(4, '0')}`,
      priority: title, priorityKey: key, sequence, bay: null, elapsed: 0,
      status: key === 'review' ? 'Ready for review' : 'Awaiting testing', cartridge: s.cartridge,
      duration: CYCLE_SECONDS, queuedAt: s.queueClock, startedAt: null, completedAt: null };
    // Review-only records represent completed evidence and do not consume an analytical bay.
    if (key === 'review') s.jobs.push(job); else s.queue.push(job);
  }
  if (key !== 'review') s.queueRunning = true;
  note(s, `${count} ${title.toLowerCase()} request${count === 1 ? '' : 's'} added.`);
  scheduler(s);
}
function tick(s, seconds) {
  const amount = Math.max(0, Math.min(86400, Number(seconds) || 0));
  if (!s.running && !s.queueRunning) return;
  let remaining = amount;
  // Advance to completion boundaries so results are independent of tick granularity.
  while (remaining > 0) {
    scheduler(s);
    const activeJobs = s.queueRunning ? s.jobs.filter(j => j.status === 'Testing') : [];
    const active = s.running || activeJobs.length > 0;
    if (!active) { s.queueRunning = false; break; }
    const boundaries = activeJobs.map(j => j.duration - j.elapsed);
    if (s.running) boundaries.push(CYCLE_SECONDS - s.elapsed);
    const delta = Math.min(remaining, ...boundaries.filter(n => n > 0));
    if (!Number.isFinite(delta) || delta <= 0) break;
    s.queueClock += delta;
    if (s.running) {
      const before = stageOf(s);
      s.elapsed = Math.min(CYCLE_SECONDS, s.elapsed + delta);
      const after = stageOf(s);
      if (before !== after) note(s, `Analytical stage: ${STAGES[after].label}.`);
      if (atEnd(s)) {
        settle(s);
        note(s, `Analytical cycle complete: ${s.status}. No automatic release.`);
      }
    }
    for (const job of activeJobs) {
      job.elapsed = Math.min(job.duration, job.elapsed + delta);
      if (job.elapsed >= job.duration) {
        job.status = job.priorityKey === 'special' ? 'Hold / investigate' : 'Ready for review';
        job.completedAt = s.queueClock;
        note(s, `${job.id} completed in bay ${job.bay}; ${job.status.toLowerCase()}.`);
      }
    }
    remaining -= delta;
    scheduler(s);
    if (!s.queue.length && !s.jobs.some(j => j.status === 'Testing')) s.queueRunning = false;
  }
}

/** Apply an explicit action. Mutates and returns the same state reference. */
export function act(s, action = {}) {
  switch (action.type) {
    case 'scenario': {
      const next = createState(action.id);
      Object.keys(s).forEach(key => delete s[key]); Object.assign(s, next); break;
    }
    case 'reset': {
      const next = createState(s.scenarioId); next.config = s.config;
      Object.keys(s).forEach(key => delete s[key]); Object.assign(s, next); break;
    }
    case 'donor': {
      if (action.id !== null && action.id !== '' && !DONORS.some(d => d.id === action.id)) break;
      if (s.donorId !== action.id) { s.donorId = action.id || ''; resetAnalytical(s, 'Donor changed. Previous donor-specific evidence invalidated.'); }
      break;
    }
    case 'group': {
      const value = normalGroup(action.value);
      if (!BLOOD_GROUPS.includes(value) || s.patient.group === value) break;
      s.patient.group = value; s.patient.validPrior = false; s.patient.priorWorkup = null; s.verified = false;
      resetAnalytical(s, `Patient group updated to ${value}. Previous test results invalidated.`); break;
    }
    case 'cartridge': {
      if (!CARTRIDGES[action.value] || s.cartridge === action.value) break;
      s.cartridge = action.value; resetAnalytical(s, `Cartridge scope changed to ${CARTRIDGES[s.cartridge].name}.`); break;
    }
    case 'config': {
      const value = Number(action.value);
      if (![2, 4, 8, 16].includes(value) || value === s.config) break;
      const stranded = s.jobs.filter(j => j.status === 'Testing' && j.bay > value);
      if (stranded.length || (s.running && s.bay > value)) {
        note(s, 'Configuration change blocked: complete active tests in the bays being removed first.'); break;
      }
      s.config = value; note(s, `Configuration set to ${value} independent bays${value === 16 ? ' across two eight-bay units' : ''}.`); scheduler(s); break;
    }
    case 'verify': {
      if (!identityValid(s)) {
        s.verified = false; s.status = 'Hold / investigate';
        note(s, 'Identification mismatch detected. Specimen cannot be verified.');
      } else {
        s.verified = true; note(s, 'Patient, specimen and order identifiers verified.');
        if (!s.elapsed) s.status = 'Awaiting testing';
      }
      break;
    }
    case 'start': {
      if (s.running || atEnd(s)) break;
      if (s.requiresRepeat || s.manualHold) { note(s, 'Start blocked: resolve the failed check and request a new test.'); break; }
      if (!s.verified) { note(s, 'Start blocked: verify the patient, specimen and order first.'); break; }
      const failures = s.faults.filter(f => PREFLIGHT_FAULTS.has(f));
      if (failures.length) {
        s.status = has(s, 'wrong-patient') ? 'Hold / investigate' : 'Invalid QC';
        note(s, `Start blocked. A required pre-test check failed. Review the flagged quality controls.`); break;
      }
      if (s.cartridge === 'match' && !priorValid(s)) { s.status = 'Hold / investigate'; note(s, 'Match Only blocked: a valid prior workup is required.'); break; }
      if (s.cartridge !== 'type' && !donorOf(s)) { note(s, 'Start blocked: select and identify the donor unit for this crossmatch.'); break; }
      const occupied = new Set(s.jobs.filter(j => j.status === 'Testing').map(j => j.bay));
      const free = Array.from({ length: s.config }, (_, i) => i + 1).find(b => !occupied.has(b) && !s.unavailableBays.includes(b));
      if (!free && !s.bay) { note(s, 'Start pending: all appropriate bays are occupied. Complete a queued run first.'); break; }
      s.bay = s.bay || free; s.running = true; s.status = 'Testing';
      note(s, `${s.elapsed ? 'Resumed' : 'Started'} ${CARTRIDGES[s.cartridge].name} in bay ${s.bay}.`); break;
    }
    case 'pause': {
      s.running = false;
      if (s.status === 'Testing') note(s, 'Analysis paused. Other bays continue independently.');
      break;
    }
    case 'tick': tick(s, action.seconds); break;
    case 'step': {
      if (!s.running && !atEnd(s)) act(s, { type: 'start' });
      if (s.running) {
        const target = STAGES.find(x => x.time > s.elapsed)?.time || CYCLE_SECONDS;
        tick(s, target - s.elapsed); s.running = false;
        if (!atEnd(s)) note(s, 'Stepped to next analytical stage and paused.');
      } else if (s.jobs.some(j => j.status === 'Testing')) tick(s, 60);
      break;
    }
    case 'repeat': {
      resetAnalytical(s, 'Repeat requested. Previous analytical evidence retained in the audit trail; a new run is required.');
      break;
    }
    case 'fault': {
      const id = action.id;
      if (!FAULTS.some(f => f.id === id)) break;
      const exists = has(s, id); const enable = action.enabled === undefined ? !exists : !!action.enabled;
      if (enable === exists) break;
      if (enable) s.faults.push(id); else s.faults = s.faults.filter(f => f !== id);
      if (id === 'wrong-patient') {
        s.verified = false;
        s.patient.specimen = enable ? 'SP-FOREIGN / PT-9999' : s.patient.expectedSpecimen;
        s.patient.specimenPatientId = enable ? 'PT-9999' : s.patient.id;
        if (!enable) note(s, 'Correct specimen retrieved and linked to the patient order. Verify the identifiers again.');
      }
      if (s.elapsed > 0) { s.requiresRepeat = true; s.running = false; clearAuthorisation(s); s.status = id === 'wrong-patient' || id === 'discrepancy' ? 'Hold / investigate' : 'Invalid QC'; }
      if (!enable && !s.elapsed) s.status = 'Awaiting testing';
      note(s, `${enable ? 'Introduced' : 'Resolved'} fault: ${FAULTS.find(f => f.id === id).name}.${s.requiresRepeat ? ' Repeat testing required.' : ''}`); break;
    }
    case 'network': {
      const connected = !!action.connected;
      if (connected === s.network) break;
      s.network = connected;
      if (!connected) { s.handedOver = false; if (s.authorised) s.status = 'Transfer pending'; }
      else if (s.authorised) s.status = 'Authorised';
      note(s, connected ? 'Hospital connection restored. Pending authorised evidence is available for recorded handover.' : 'Hospital network disconnected. Local evidence retained; transfer pending.'); break;
    }
    case 'review': {
      const decision = String(action.decision || '').toLowerCase();
      const operator = String(action.operator || '').trim();
      const observation = String(action.note || '').trim();
      if (decision === 'authorise' || decision === 'authorize') {
        if (!operator) { note(s, 'Authorisation blocked: enter the qualified reviewer’s ID.'); break; }
        if (!canAuthorise(s)) { note(s, 'Authorisation blocked. Resolve the outstanding results, quality controls, identification or prior-workup checks.'); break; }
        s.authorised = true; s.reviewer = operator; s.reviewNote = observation;
        if (s.cartridge !== 'match') {
          s.patient.validPrior = true;
          s.patient.priorWorkup = { group: s.patient.group, screen: 'negative', recordId: `HX-${s.patient.id}-${Math.floor(s.queueClock)}`, reviewer: operator, time: s.queueClock };
          note(s, 'Reviewed grouping and screening saved for an appropriate subsequent Match Only request.');
        }
        s.status = s.network ? 'Authorised' : 'Transfer pending';
        note(s, `Result authorised by ${operator}${observation ? `: ${observation}` : '.'}`);
        note(s, s.network ? 'Authorised result transferred to the hospital record. Physical collection remains a separate step.' : 'Transfer pending. No hospital receipt has been recorded.');
      } else if (decision === 'hold') {
        clearAuthorisation(s); s.running = false; s.manualHold = true; s.status = 'Hold / investigate';
        s.reviewer = operator; s.reviewNote = observation;
        note(s, `Donor unit held for investigation${operator ? ` by ${operator}` : ''}${observation ? `: ${observation}` : '.'}`);
      } else if (decision === 'repeat') act(s, { type: 'repeat' });
      else if (decision === 'acknowledge') note(s, `Pending finding acknowledged${operator ? ` by ${operator}` : ''}${observation ? `: ${observation}` : '.'}`);
      else if (decision === 'observation' || decision === 'note') {
        if (observation) { s.reviewNote = observation; note(s, `Review observation${operator ? ` (${operator})` : ''}: ${observation}`); }
      }
      break;
    }
    case 'handover': {
      if (!s.authorised || !s.network || s.faults.length || s.requiresRepeat) {
        note(s, 'Handover blocked: an eligible authorised result and confirmed connection are required.'); break;
      }
      s.handedOver = true; s.status = 'Completed handover';
      note(s, `Laboratory-to-ward handover acknowledged at ${stamp(s)}. Physical collection and bedside checks remain separate.`); break;
    }
    case 'queue-play': {
      s.queueRunning = action.running === undefined ? !s.queueRunning : !!action.running;
      note(s, s.queueRunning ? 'Workload processing resumed.' : 'Workload processing paused.');
      scheduler(s); break;
    }
    case 'clear-queue': {
      s.queue = []; s.jobs = []; s.queueRunning = false;
      note(s, 'Queued requests cleared. The current patient record is retained.'); break;
    }
    case 'enqueue': enqueue(s, action.count, action.priority); break;
    default: break;
  }
  return s;
}
