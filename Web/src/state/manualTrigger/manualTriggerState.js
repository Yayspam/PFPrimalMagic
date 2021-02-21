import { getEvent } from '../../events/events';
import { rollPercentile } from '../../random';
import {
  makeConstantVariable,
  primalEventInitialState,
} from '../activePrimalEvents/activePrimalEventsState';
import { allExpandedSelector } from '../eventExpansionState/eventExpansionState';
import { currentRoundSelector } from '../rounds/roundsState';
import {
  manualTriggerType,
  setTriggerDialogState,
  triggerDialogInitialState,
} from '../triggerDialog/triggerDialogState';

export const characterInitialState = {
  name: 'Other',
  cl: undefined,
};

export const characters = {
  Other: { ...characterInitialState },
  Thunder: { ...characterInitialState, name: 'Thunder', cl: 8 },
  Finley: { ...characterInitialState, name: 'Finley', cl: 12 },
  Autumn: { ...characterInitialState, name: 'Autumn', cl: 14 },
  Poli: { ...characterInitialState, name: 'Poli', cl: 1 },
  Katsu: { ...characterInitialState, name: 'Katsu', cl: 1 },
};

export const manualTriggerInitialState = {
  specifiedCr: 11,
  character: { ...characterInitialState },
};

export const manualTriggerStateSelector = state =>
  state.primalMagic.manualTriggerState;
export const characterSelector = state =>
  manualTriggerStateSelector(state).character;
export const specifiedCrSelector = state =>
  manualTriggerStateSelector(state).specifiedCr;

const SetManualTriggerCrType =
  'primalMagic:manualTriggerState:setManualTriggerCr';
const SetManualTriggerCharacterType =
  'primalMagic:manualTriggerState:setManualTriggerCharacter';

export const setManualTriggerCr = cr => ({
  type: SetManualTriggerCrType,
  payload: cr,
});

export const setManualTriggerCharacter = character => ({
  type: SetManualTriggerCharacterType,
  payload: character,
});

const copyState = state => ({
  ...state,
  manualTriggerState: {
    ...state.manualTriggerState,
  },
});

const handleSetManualTriggerCr = (state, payload) => {
  const newState = copyState(state);
  newState.manualTriggerState.specifiedCr = payload;
  newState.manualTriggerState.character = { ...characterInitialState };
  return newState;
};

const handleSetManualTriggerCharacter = (state, payload) => {
  const newState = copyState(state);
  newState.manualTriggerState.character = payload;
  if (payload.cl) {
    newState.manualTriggerState.specifiedCr = payload.cl;
  }

  return newState;
};

export const manualTriggerStateReducers = {
  [SetManualTriggerCrType]: handleSetManualTriggerCr,
  [SetManualTriggerCharacterType]: handleSetManualTriggerCharacter,
};

// TODO: Replace with actual content, we'll need a list of these for each percentile roll, I think
export const generateDialogEvent = (percentile, cr, startRound, expanded) => {
  const correspondingEvent = getEvent(percentile);
  const variables = correspondingEvent.createVariables(cr);
  const durationInRounds = variables.duration?.result;
  const finalRound =
    durationInRounds === undefined ? undefined : startRound + durationInRounds;

  return {
    ...primalEventInitialState,
    id: Date.now(),
    title: correspondingEvent.title,
    percentileRoll: percentile,
    cr: makeConstantVariable(cr),
    startRound,
    finalRound,
    variables,
    expanded,
  };
};

// Thunk that handles all state when pressing the manual trigger button
// Rolls a percentile, then generates the dialog state, and the event state if roll was high enought
// Then opens the dialog with that state
export const manualTriggerThunk = () => (dispatch, getState) => {
  const percentile = rollPercentile();
  const currentCr = specifiedCrSelector(getState());
  const currentRound = currentRoundSelector(getState());
  const allExpanded = allExpandedSelector(getState());
  const dialogState = {
    ...triggerDialogInitialState,
    open: true,
    triggerType: manualTriggerType,
    percentile,
    cr: currentCr,
  };

  if (percentile > dialogState.threshold) {
    const eventPercentile = rollPercentile();
    const event = generateDialogEvent(
      eventPercentile,
      currentCr,
      currentRound,
      !!allExpanded
    );
    dialogState.currentEvent = event;
  }

  dispatch(setTriggerDialogState(dialogState));
};
