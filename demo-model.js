import { CARTRIDGES, STAGES, canAuthorise, qcChecks, reactions, stageOf } from './engine.js';

const stageDescriptions = [
  'Identify the cartridge and prepare the sample.',
  'Route red cells and plasma into separate test pathways.',
  'Meter the reagents into the reaction chambers.',
  'Observe the controlled reactions inside the cartridge.',
  'Capture and inspect the chamber images.',
  'Reconcile the reaction evidence and required checks.',
  'Review the completed record before authorisation.'
];

const plainStageLabels = [
  'Checking the loaded kit', 'Moving the samples', 'Adding test materials',
  'Waiting for reactions', 'Reading the camera images', 'Checking the results', 'Ready for review'
];
const plainStageDescriptions = [
  'The machine checks the loaded kit and starts the test.',
  'The prepared samples move into separate test areas.',
  'The kit releases the materials needed for each check.',
  'The machine maintains the test conditions while reactions develop.',
  'The camera reads the reaction pattern in each test area.',
  'The software checks the images and required quality checks.',
  'Review the results before approving the record.'
];

/** Plain display copy for the same reaction evidence, without changing its result. */
export function describeEvidence(reaction, { explanationMode = false } = {}) {
  const ready = !!reaction?.ready;
  const weak = /weak|w\+|1\+/.test(String(reaction?.grade || '').toLowerCase());
  const observation = !ready ? 'Not read yet' : reaction.positive === null ? 'Image unclear' : weak ? 'Weak reaction' : reaction.positive ? 'Reaction found' : 'No reaction found';
  if (explanationMode) return {
    title: reaction?.name || 'Reaction evidence', input: reaction?.input || '', reagent: reaction?.reagent || '',
    observation: !ready ? 'Awaiting optical readout' : reaction.positive === null ? 'Unable to interpret' : weak ? 'Weak reactivity' : reaction.positive ? 'Reactive' : 'Nonreactive',
    meaning: ready ? reaction?.interpretation || '' : 'This reaction chamber has not reached its optical readout.'
  };
  const names = {
    'anti-a': 'Blood group check: A', 'anti-b': 'Blood group check: B', 'anti-d': 'Blood group check: Rh',
    'reverse-a1': 'Blood group double-check: A cells', 'reverse-b': 'Blood group double-check: B cells',
    'screen-i': 'Antibody check 1', 'screen-ii': 'Antibody check 2', 'screen-iii': 'Antibody check 3',
    crossmatch: 'Selected donor check', 'positive-control': 'Positive quality check', 'negative-control': 'Negative quality check'
  };
  const materials = {
    'anti-a': 'A blood-group test material', 'anti-b': 'B blood-group test material', 'anti-d': 'Rh blood-group test material',
    'reverse-a1': 'Known A red cells', 'reverse-b': 'Known B red cells',
    'screen-i': 'Prepared test cells', 'screen-ii': 'Prepared test cells', 'screen-iii': 'Prepared test cells',
    crossmatch: 'Red cells from the selected donor', 'positive-control': 'Quality-check material', 'negative-control': 'Quality-check material'
  };
  let meaning;
  if (!ready) meaning = 'This test area has not been read yet.';
  else if (reaction.positive === null) meaning = 'The image cannot be read clearly. Review the cause and repeat the check as required.';
  else if (weak) meaning = 'A weak reaction was found. This needs laboratory review.';
  else if (reaction.kind === 'typing') meaning = reaction.positive ? 'A reaction was found in this blood-group check. The full set of checks determines the blood group.' : 'No reaction was found in this test area. The full set of checks determines the blood group.';
  else if (reaction.kind === 'control') meaning = reaction.positive === reaction.expectedPositive ? 'This quality check produced the expected result.' : 'This quality check did not produce the expected result. The test cannot be approved.';
  else if (reaction.kind === 'crossmatch') meaning = reaction.positive ? 'The patient’s plasma reacted with cells from this donor. The donor unit must be held for investigation.' : 'No reaction was found against this donor in this check. Other checks and laboratory approval are still required.';
  else meaning = reaction.positive ? 'A reaction was found. The laboratory needs to investigate before approving the result.' : 'No reaction was found in this test area. Other checks and laboratory approval are still required.';
  return { title: names[reaction?.id] || 'Test area', input: reaction?.kind === 'control' ? 'Quality-check material' : reaction?.input || '', reagent: materials[reaction?.id] || 'Test material', observation, meaning };
}

/** Preserve each check's status while selecting the appropriate level of explanation. */
export function describeCheck(check, { explanationMode = false } = {}) {
  if (explanationMode) return { name: check.name, detail: check.detail, status: check.status };
  const names = {
    identity: 'Patient and sample IDs', cartridge: 'Test kit ID', reagent: 'Test kit expiry', controls: 'Required quality checks',
    abo: 'Blood group checks', screen: 'Antibody check', optics: 'Camera check', fluidics: 'Sample flow check',
    conditions: 'Test conditions', maintenance: 'Machine service and records', donor: 'Donor selection and earlier results',
    review: 'Laboratory approval', network: 'Hospital connection', repeat: 'New test needed'
  };
  const details = {
    identity: ['The patient, sample and test order IDs agree.', 'The sample does not match this patient or test order. Correct the IDs before continuing.', 'Confirm the patient, sample and test order IDs before testing.'],
    cartridge: ['The test kit matches the selected test.', 'The test kit ID does not match the selected test order.', 'The test kit ID has not been checked yet.'],
    reagent: ['The test kit lot and expiry have been checked.', 'This test kit has expired. Use a new kit.', 'The test kit expiry has not been checked yet.'],
    controls: ['The required quality checks produced the expected results.', 'A required quality check failed. The test result cannot be approved.', 'The required quality checks are not finished yet.'],
    abo: ['The required blood-group results have been checked.', 'The blood group checks do not agree. Further laboratory review is needed.', 'The required blood-group results are still being checked.'],
    screen: ['The required antibody results have been checked.', 'The antibody check or earlier antibody history needs further laboratory investigation.', 'The required antibody results are still being reviewed.'],
    optics: ['The camera check passed.', 'The camera cannot read the test area clearly. Check the camera path before repeating the test.', 'The camera image is still being checked.'],
    fluidics: ['The sample flow check passed.', 'The test areas did not fill correctly, or an air bubble interfered. Review the flow check before repeating.', 'The machine is checking that the sample reaches the required test areas.'],
    conditions: ['The test conditions passed the required checks.', 'The test temperature or timing was outside its accepted range.', 'The machine is checking the test conditions.'],
    maintenance: ['Machine checks and test records are up to date.', 'Complete the required machine service checks before testing.', 'The machine service checks are pending.'],
    donor: ['The donor selection and required earlier results have been checked.', 'The donor selection or earlier patient test results need review.', 'The donor selection and required earlier results are still being checked.'],
    review: ['The laboratory reviewer has approved the result.', 'The result cannot be approved.', 'A laboratory reviewer must approve the completed result.'],
    network: ['The hospital connection is available. Only approved results can be sent.', 'The hospital connection needs attention. No transfer is confirmed.', 'The hospital connection is unavailable. No transfer is confirmed.'],
    repeat: ['A new test can be prepared.', 'A fault affected this test. Correct the cause and use a fresh kit. Clearing a fault does not restore the old result.', 'A new test is required.']
  };
  const index = check.status === 'pass' ? 0 : check.status === 'fail' ? 1 : 2;
  const notRequested = check.id === 'donor' && /Not requested/.test(check.detail || '');
  return { name: notRequested ? 'Donor check' : names[check.id] || check.name,
    detail: notRequested ? 'This kit does not include a donor check.' : details[check.id]?.[index] || check.detail,
    status: check.status };
}

/** Pure presentation model. It never changes a test record or authorises a result. */
export function deriveDemo(state, { sampleLoaded = false, inserted = false, inserting = false, explanationMode = false } = {}) {
  const copy = (plain, technical) => explanationMode ? technical : plain;
  const complete = state.elapsed >= 600;
  const checks = qcChecks(state);
  const assayQC = checks.filter(check => ['identity', 'cartridge', 'reagent', 'controls', 'abo', 'optics', 'fluidics', 'conditions', 'maintenance', 'repeat'].includes(check.id));
  const qcFailed = assayQC.some(check => check.status === 'fail') || state.faults.length > 0 || state.requiresRepeat;
  const prior = state.patient.priorWorkup;
  const validPrior = !!state.patient.validPrior && prior?.group === state.patient.group && prior?.screen === 'negative';
  const missingPrior = state.cartridge === 'match' && !validPrior;
  const observed = reactions(state);
  const crossmatch = observed.find(reaction => reaction.kind === 'crossmatch');
  const validNewGroup = complete && !qcFailed && state.verified && state.cartridge !== 'match';
  const result = {
    group: state.cartridge === 'match' && validPrior ? `${prior.group} (prior record)` : validNewGroup ? state.patient.group : qcFailed && complete ? 'Not reported' : 'Awaiting result',
    screen: state.cartridge === 'match' ? validPrior ? 'Negative (prior record)' : 'Prior workup required' : !complete ? 'Awaiting result' : qcFailed ? 'Invalid result' : ({ negative: 'No reactivity detected', positive: 'Reactive', weak: 'Weak reaction', equivocal: 'Unable to interpret' }[state.screen] || 'Unable to interpret'),
    crossmatch: state.cartridge === 'type' ? 'Not requested' : !complete ? 'Awaiting result' : qcFailed ? 'Invalid result' : crossmatch?.positive === true ? 'Reactive' : crossmatch?.positive === false ? 'No reactivity detected' : 'Unable to interpret',
    eligible: canAuthorise(state)
  };
  const progress = Math.max(0, Math.min(1, Number(state.elapsed || 0) / 600));
  const make = (phase, title, instruction, actionLabel, action, machineTitle, status, lines, tone = 'neutral') => ({
    phase, title, instruction, actionLabel, action,
    machine: { title: machineTitle, status, lines: lines.filter(Boolean).map(String).slice(0, 3), progress, tone },
    result
  });
  const idLine = state.patient.id;
  const scope = CARTRIDGES[state.cartridge]?.name || 'Cartridge';
  const compactScreen = explanationMode
    ? state.cartridge === 'match' ? 'Prior screen: negative' : state.screen === 'negative' ? 'Screen: nonreactive' : state.screen === 'weak' ? 'Screen: weak reaction' : state.screen === 'equivocal' ? 'Screen: unresolved' : 'Screen: reactive'
    : state.cartridge === 'match' ? 'Earlier antibody check: no reaction' : state.screen === 'negative' ? 'Antibody check: no reaction' : state.screen === 'weak' ? 'Antibody check: weak reaction' : state.screen === 'equivocal' ? 'Antibody check: unclear' : 'Antibody check: reaction found';
  const compactCrossmatch = explanationMode
    ? state.cartridge === 'type' ? 'Crossmatch not requested' : result.crossmatch === 'No reactivity detected' ? 'Crossmatch: nonreactive' : result.crossmatch === 'Reactive' ? 'Crossmatch: reactive' : 'Crossmatch: unresolved'
    : state.cartridge === 'type' ? 'No donor check requested' : result.crossmatch === 'No reactivity detected' ? 'Donor check: no reaction' : result.crossmatch === 'Reactive' ? 'Donor check: reaction found' : 'Donor check: unclear';
  const groupLine = result.group === 'Awaiting result' || result.group === 'Not reported' ? '' : `${explanationMode ? 'Group' : 'Blood group'}: ${explanationMode ? result.group : result.group.replace('(prior record)', '(earlier result)')}`;

  // Blocking integrity conditions take priority over physical-interface steps.
  if (qcFailed) {
    const failed = assayQC.find(check => check.status === 'fail');
    const identity = failed?.id === 'identity';
    const title = identity ? 'Hold and investigate' : 'Invalid result';
    const instruction = state.requiresRepeat ? 'Resolve the failed check, then request a fresh test. Clearing a fault does not validate the old record.' : failed ? describeCheck(failed, { explanationMode }).detail : 'Resolve the required quality checks before continuing.';
    return make('blocked', title, instruction, 'Review checks', 'review', title, identity ? 'Identification blocked' : copy('Quality check failed', 'QC blocked'), [idLine, failed ? describeCheck(failed, { explanationMode }).name : 'Required check failed', state.requiresRepeat ? 'Fresh test required' : 'Testing cannot continue'], 'danger');
  }
  if (missingPrior) return make('blocked', copy('Earlier test results needed', 'Prior workup required'), copy('This kit checks one donor unit. It needs valid earlier blood-group and antibody results approved by laboratory staff.', 'Match Only requires a valid reviewed group and antibody screen. Complete the appropriate patient workup first.'), copy('Review earlier results', 'Review prior workup'), 'review', 'Hold and investigate', copy('Earlier results missing', 'Prior workup missing'), [idLine, 'Match Only', copy('Approved earlier results needed', 'Reviewed workup required')], 'warning');
  if (state.manualHold || /Hold|Invalid/i.test(state.status) || (complete && !state.authorised && !result.eligible)) {
    const reason = state.manualHold ? 'A reviewer has held this record. Complete the investigation and request a fresh test.' : state.screen !== 'negative' || state.patient.antibodies?.length ? copy('The antibody check or earlier history needs further antibody investigation. Matching blood-group labels do not resolve this finding.', 'Further antibody investigation is required. A matching blood-group label does not resolve this finding.') : copy('Review the selected donor, test results and required checks before continuing.', 'Review donor selection, reaction evidence and required checks before proceeding.');
    return make('blocked', 'Hold and investigate', reason, 'Review findings', 'review', 'Hold and investigate', copy('Approval blocked', 'Authorisation blocked'), [idLine, groupLine, complete ? compactCrossmatch : 'Investigation required'], 'danger');
  }
  if (state.handedOver) return make('handover', 'Handover recorded', 'The ward acknowledgement is recorded. Physical collection and bedside checks remain separate.', 'Start new test', 'reset', 'Handover recorded', 'Record complete', [idLine, groupLine, 'Ward acknowledgement recorded'], 'success');
  if (state.authorised) {
    return make('authorised', copy('Approved', 'Authorised'), state.network ? copy('The result is approved. Record the ward acknowledgement when handover is confirmed.', 'The result is authorised. Record the ward acknowledgement when the handover is confirmed.') : copy('The approved result stays on this machine. Restore the connection before recording ward handover.', 'The authorised record is retained locally. Restore the connection before recording ward handover.'), state.network ? 'Record handover' : 'Review pending transfer', 'review', copy('Approved', 'Authorised'), state.network ? 'Ready for handover' : 'Transfer pending', [idLine, groupLine, state.network ? copy('Laboratory approval recorded', 'Qualified review recorded') : 'Local record retained'], state.network ? 'success' : 'warning');
  }
  if (complete) return make('review', 'Review required', copy('Review the results and required quality checks. A trained laboratory reviewer must approve the result.', 'Inspect the reaction evidence and required checks. A qualified reviewer must authorise the result.'), 'Review result', 'review', 'Review required', 'Analysis complete', [groupLine, compactScreen, compactCrossmatch], 'warning');
  if (state.running) {
    const stage = stageOf(state);
    return make('running', 'Analysing sample', (explanationMode ? stageDescriptions : plainStageDescriptions)[stage] || plainStageDescriptions[0], 'Pause analysis', 'resume', 'Analysing sample', (explanationMode ? STAGES[stage]?.label : plainStageLabels[stage]) || 'Analysis in progress', [idLine, scope, explanationMode ? STAGES[stage]?.label : plainStageLabels[stage]], 'active');
  }
  if (state.elapsed > 0) return make('paused', 'Analysis paused', 'The cartridge remains in its bay. Resume to continue the current test.', 'Resume analysis', 'resume', 'Analysis paused', 'Cartridge retained', [idLine, scope, (explanationMode ? STAGES[stageOf(state)]?.label : plainStageLabels[stageOf(state)])], 'warning');
  if (!sampleLoaded || !state.verified) return make('sample', 'Ready to load', sampleLoaded ? 'Confirm that patient, specimen and order identifiers agree before inserting a cartridge.' : 'Load the identified patient sample to begin.', sampleLoaded ? 'Verify sample' : 'Load sample', 'load', 'Ready to load', sampleLoaded ? 'Identity verification required' : 'Awaiting patient sample', [sampleLoaded ? idLine : 'Load the patient sample', sampleLoaded ? 'Confirm linked identifiers' : 'No test has started'], 'neutral');
  if (inserting) return make('insert', 'Inserting cartridge', 'The cartridge is entering the selected bay.', 'Inserting cartridge', 'insert', 'Sample identified', 'Cartridge entering bay', [idLine, scope, 'Seating and locking'], 'active');
  if (!inserted) return make('insert', 'Sample identified', 'Insert the selected cartridge into the testing bay.', 'Insert cartridge', 'insert', 'Sample identified', 'Awaiting cartridge', [idLine, scope, 'Identity checks passed'], 'neutral');
  return make('ready', 'Cartridge seated', 'The specimen is identified and the cartridge is locked in place. Run the test to begin analysis.', 'Run test', 'start', 'Cartridge seated', 'Ready to analyse', [idLine, scope, 'Bay ready'], 'neutral');
}
