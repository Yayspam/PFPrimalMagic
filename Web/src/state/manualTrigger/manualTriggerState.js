import { wonderousMagic } from '../../events/eventComponents/wonderousMagicEvent.component';
import { getEvent, getEventByTitle } from '../../events/events';
import { rollPercentile } from '../../random';
import {
  makeConstantVariable,
  primalEventInitialState,
} from '../activePrimalEvents/activePrimalEventsState';
import { currentRoundSelector } from '../rounds/roundsState';
import {
  manualTriggerType,
  setTriggerDialogState,
  triggerDialogInitialState,
} from '../triggerDialog/triggerDialogState';
import {
  alwaysSelectSameEventSelector,
  eventsAlwaysTriggerSelector,
  eventAlwaysSelectedSelector,
  rodOfWonderAlwaysSelectedSelector,
  alwaysSelectSameRodResultSelector,
} from '../userSettings/userSetingsState';

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

export const generateDialogEvent = (
  percentile,
  cr,
  startRound,
  eventAlwaysSelected,
  rodOfWonderResultAlwaysSelected
) => {
  const correspondingEvent = eventAlwaysSelected
    ? getEventByTitle(eventAlwaysSelected)
    : getEvent(percentile);
  const variables = correspondingEvent.createVariables(
    cr,
    rodOfWonderResultAlwaysSelected
  );

  const durationInRounds = variables.duration?.result;
  const finalRound =
    durationInRounds === undefined ? undefined : startRound + durationInRounds;

  return {
    ...primalEventInitialState,
    id: Date.now(),
    title: correspondingEvent.title,
    percentileRoll: eventAlwaysSelected
      ? correspondingEvent.percentileMin
      : percentile,
    cr: makeConstantVariable(cr),
    startRound,
    finalRound,
    variables,
    expanded: true,
  };
};

// Thunk that handles all state when pressing the manual trigger button
// Rolls a percentile, then generates the dialog state, and the event state if roll was high enought
// Then opens the dialog with that state
export const manualTriggerThunk = () => (dispatch, getState) => {
  const state = getState();
  const percentile = rollPercentile();
  const currentCr = specifiedCrSelector(state);
  const currentRound = currentRoundSelector(state);
  const dialogState = {
    ...triggerDialogInitialState,
    open: true,
    triggerType: manualTriggerType,
    percentile,
    cr: currentCr,
  };

  const eventsAlwaysTrigger = eventsAlwaysTriggerSelector(state);

  if (eventsAlwaysTrigger || percentile >= dialogState.threshold) {
    const alwaysShowSameEvent = alwaysSelectSameEventSelector(state);
    const eventAlwaysSelected = alwaysShowSameEvent
      ? eventAlwaysSelectedSelector(state)
      : undefined;
    const alwaysShowSameRodResult = alwaysSelectSameRodResultSelector(state);
    const rodOfWonderResultAlwaysSelected =
      eventAlwaysSelected === wonderousMagic.title && alwaysShowSameRodResult
        ? rodOfWonderAlwaysSelectedSelector(state)
        : undefined;

    const eventPercentile = rollPercentile();
    const event = generateDialogEvent(
      eventPercentile,
      currentCr,
      currentRound,
      eventAlwaysSelected,
      rodOfWonderResultAlwaysSelected
    );
    dialogState.currentEvent = event;
  }

  dispatch(setTriggerDialogState(dialogState));
};
