import { wonderousMagic } from '../../events/eventComponents/wonderousMagicEvent.component';
import { getEvent, getEventByTitle } from '../../events/events';
import { rollPercentile, rollTableDice } from '../../random';
import {
  makeConstantVariable,
  makeVariable,
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
  alwaysSelectSameRodResultSelector,
  eventAlwaysSelectedSelector,
  eventsAlwaysTriggerSelector,
  rodOfWonderAlwaysSelectedSelector,
} from '../userSettings/userSetingsState';
import {
  characterInitialState,
  characterSelector,
  saveManualTriggerCharacters,
  setManualTriggerCharacter,
  specifiedCrSelector,
} from './manualTriggerState';

export const calculateFinalRound = (durationVariable, startRound) => {
  const durationInRounds = durationVariable?.result;
  return durationInRounds === undefined
    ? undefined
    : startRound + durationInRounds;
};

export const generateEventVariablesWithDefaults = (
  event,
  crVal,
  rodOfWonderResultAlwaysSelected
) => ({
  ...event.createVariables(crVal, rodOfWonderResultAlwaysSelected),
  initiative: makeVariable(20, 1, 5),
});

export const generateDialogEvent = (
  percentile,
  tableRoll,
  cr,
  startRound,
  eventAlwaysSelected,
  rodOfWonderResultAlwaysSelected,
  triggerType
) => {
  const crVal = cr.result ?? cr;
  const crVar = cr.result ? cr : makeConstantVariable(cr, 'CR = CL');
  const correspondingEvent = eventAlwaysSelected
    ? getEventByTitle(eventAlwaysSelected)
    : getEvent(percentile, tableRoll);
  const variables = generateEventVariablesWithDefaults(
    correspondingEvent,
    crVal,
    rodOfWonderResultAlwaysSelected
  );

  const finalRound = calculateFinalRound(variables.duration, startRound);

  return {
    ...primalEventInitialState,
    id: Date.now(),
    title: correspondingEvent.title,
    percentileRoll: eventAlwaysSelected
      ? correspondingEvent.percentileMin
      : percentile,
    tableRoll: eventAlwaysSelected ? correspondingEvent.table : tableRoll,
    cr: crVar,
    startRound,
    finalRound,
    variables,
    expanded: true,
    triggerType,
  };
};

// Thunk that handles all state when pressing the manual trigger button
// Rolls a percentile, then generates the dialog state, and the event state if roll was high enought
// Then opens the dialog with that state
export const manualTriggerThunk = () => (dispatch, getState) => {
  const state = getState();
  const percentile = rollPercentile();
  const currentCr = specifiedCrSelector(state);
  const dialogState = {
    ...triggerDialogInitialState,
    open: true,
    triggerType: manualTriggerType,
    percentile,
    cr: currentCr,
  };

  const eventsAlwaysTrigger = eventsAlwaysTriggerSelector(state);

  if (eventsAlwaysTrigger || percentile <= dialogState.threshold) {
    const currentRound = currentRoundSelector(state);
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
    const tableRoll = rollTableDice();
    const event = generateDialogEvent(
      eventPercentile,
      tableRoll,
      currentCr,
      currentRound,
      eventAlwaysSelected,
      rodOfWonderResultAlwaysSelected,
      dialogState.triggerType
    );
    dialogState.currentEvent = event;
  }

  dispatch(setTriggerDialogState(dialogState));
};

export const saveManualTriggerCharactersThunk = characters => (
  dispatch,
  getState
) => {
  const state = getState();
  const currentCharacter = characterSelector(state);

  if (!characters.find(c => c.id === currentCharacter.id)) {
    dispatch(setManualTriggerCharacter(characterInitialState.id));
  }

  dispatch(saveManualTriggerCharacters(characters));
};
