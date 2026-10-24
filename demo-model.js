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

/** Pure presentation model. It never changes a test record or authorises a result. */
export function deriveDemo(state, { sampleLoaded = false, inserted = false, inserting = false } = {}) {
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
  const compactScreen = state.cartridge === 'match' ? 'Prior screen: negative' : state.screen === 'negative' ? 'Screen: nonreactive' : state.screen === 'weak' ? 'Screen: weak reaction' : state.screen === 'equivocal' ? 'Screen: unresolved' : 'Screen: reactive';
  const compactCrossmatch = state.cartridge === 'type' ? 'Crossmatch not requested' : result.crossmatch === 'No reactivity detected' ? 'Crossmatch: nonreactive' : result.crossmatch === 'Reactive' ? 'Crossmatch: reactive' : 'Crossmatch: unresolved';
  const groupLine = result.group === 'Awaiting result' || result.group === 'Not reported' ? '' : `Group: ${result.group}`;

  // Blocking integrity conditions take priority over physical-interface steps.
  if (qcFailed) {
    const failed = assayQC.find(check => check.status === 'fail');
    const identity = failed?.id === 'identity';
    const title = identity ? 'Hold and investigate' : 'Invalid result';
    const instruction = state.requiresRepeat ? 'Resolve the failed check, then request a fresh test. Clearing a fault does not validate the old record.' : failed?.detail || 'Resolve the required quality-control failure before continuing.';
    return make('blocked', title, instruction, 'Review checks', 'review', title, identity ? 'Identification blocked' : 'QC blocked', [idLine, failed?.name || 'Required check failed', state.requiresRepeat ? 'Fresh test required' : 'Testing cannot continue'], 'danger');
  }
  if (missingPrior) return make('blocked', 'Prior workup required', 'Match Only requires a valid reviewed group and antibody screen. Complete the appropriate patient workup first.', 'Review prior workup', 'review', 'Hold and investigate', 'Prior workup missing', [idLine, 'Match Only', 'Reviewed workup required'], 'warning');
  if (state.manualHold || /Hold|Invalid/i.test(state.status) || (complete && !state.authorised && !result.eligible)) {
    const reason = state.manualHold ? 'A reviewer has held this record. Complete the investigation and request a fresh test.' : state.screen !== 'negative' || state.patient.antibodies?.length ? 'Further antibody investigation is required. A matching blood-group label does not resolve this finding.' : 'Review donor selection, reaction evidence and required checks before proceeding.';
    return make('blocked', 'Hold and investigate', reason, 'Review findings', 'review', 'Hold and investigate', 'Authorisation blocked', [idLine, groupLine, complete ? compactCrossmatch : 'Investigation required'], 'danger');
  }
  if (state.handedOver) return make('handover', 'Handover recorded', 'The ward acknowledgement is recorded. Physical collection and bedside checks remain separate.', 'Start new test', 'reset', 'Handover recorded', 'Record complete', [idLine, groupLine, 'Ward acknowledgement recorded'], 'success');
  if (state.authorised) {
    return make('authorised', 'Authorised', state.network ? 'The result is authorised. Record the ward acknowledgement when the handover is confirmed.' : 'The authorised record is retained locally. Restore the connection before recording ward handover.', state.network ? 'Record handover' : 'Review pending transfer', 'review', 'Authorised', state.network ? 'Ready for handover' : 'Transfer pending', [idLine, groupLine, state.network ? 'Qualified review recorded' : 'Local record retained'], state.network ? 'success' : 'warning');
  }
  if (complete) return make('review', 'Review required', 'Inspect the reaction evidence and required checks. A qualified reviewer must authorise the result.', 'Review result', 'review', 'Review required', 'Analysis complete', [groupLine, compactScreen, compactCrossmatch], 'warning');
  if (state.running) {
    const stage = stageOf(state);
    return make('running', 'Analysing sample', stageDescriptions[stage] || stageDescriptions[0], 'Pause analysis', 'resume', 'Analysing sample', STAGES[stage]?.label || 'Analysis in progress', [idLine, scope, STAGES[stage]?.label], 'active');
  }
  if (state.elapsed > 0) return make('paused', 'Analysis paused', 'The cartridge remains in its bay. Resume to continue the current test.', 'Resume analysis', 'resume', 'Analysis paused', 'Cartridge retained', [idLine, scope, STAGES[stageOf(state)]?.label], 'warning');
  if (!sampleLoaded || !state.verified) return make('sample', 'Ready to load', sampleLoaded ? 'Confirm that patient, specimen and order identifiers agree before inserting a cartridge.' : 'Load the identified patient sample to begin.', sampleLoaded ? 'Verify sample' : 'Load sample', 'load', 'Ready to load', sampleLoaded ? 'Identity verification required' : 'Awaiting patient sample', [sampleLoaded ? idLine : 'Load the patient sample', sampleLoaded ? 'Confirm linked identifiers' : 'No test has started'], 'neutral');
  if (inserting) return make('insert', 'Inserting cartridge', 'The cartridge is entering the selected bay.', 'Inserting cartridge', 'insert', 'Sample identified', 'Cartridge entering bay', [idLine, scope, 'Seating and locking'], 'active');
  if (!inserted) return make('insert', 'Sample identified', 'Insert the selected cartridge into the testing bay.', 'Insert cartridge', 'insert', 'Sample identified', 'Awaiting cartridge', [idLine, scope, 'Identity checks passed'], 'neutral');
  return make('ready', 'Cartridge seated', 'The specimen is identified and the cartridge is locked in place. Run the test to begin analysis.', 'Run test', 'start', 'Cartridge seated', 'Ready to analyse', [idLine, scope, 'Bay ready'], 'neutral');
}
