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
  alwaysSelectSameRodResultSelector,
  eventAlwaysSelectedSelector,
  eventsAlwaysTriggerSelector,
  rodOfWonderAlwaysSelectedSelector,
} from '../userSettings/userSetingsState';
import { specifiedCrSelector } from './manualTriggerState';

export const calculateFinalRound = (durationVariable, startRound) => {
  const durationInRounds = durationVariable?.result;
  return durationInRounds === undefined
    ? undefined
    : startRound + durationInRounds;
};

export const generateDialogEvent = (
  percentile,
  cr,
  startRound,
  eventAlwaysSelected,
  rodOfWonderResultAlwaysSelected
) => {
  const crVal = cr.result ?? cr;
  const crVar = cr.result ? cr : makeConstantVariable(cr, 'CR = CL');
  const correspondingEvent = eventAlwaysSelected
    ? getEventByTitle(eventAlwaysSelected)
    : getEvent(percentile);
  const variables = correspondingEvent.createVariables(
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
    cr: crVar,
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
