import { wonderousMagic } from '../../events/eventComponents/wonderousMagicEvent.component';
import { rollPercentile, rollTableDice } from '../../random';
import { makeVariable } from '../activePrimalEvents/activePrimalEventsState';
import { generateDialogEvent } from '../manualTrigger/manualTriggerState.thunk';
import {
  calculateIncrementAndMax,
  primalStormInitialState,
  primalStormStateSelector,
  setPrimalStormCurrentChance,
} from '../primalStorm/primalStormState';
import {
  setTriggerDialogState,
  stormTrigerType,
  triggerDialogInitialState,
} from '../triggerDialog/triggerDialogState';
import {
  alwaysSelectSameEventSelector,
  alwaysSelectSameRodResultSelector,
  eventAlwaysSelectedSelector,
  eventsAlwaysTriggerSelector,
  rodOfWonderAlwaysSelectedSelector,
} from '../userSettings/userSetingsState';
import { currentRoundSelector, incrementRound } from './roundsState';

// Thunk that handles all state when pressing the advance round button
// Increments the round number
// Then, if primal magic storm is on, generates the dialog state and event state if roll is high enough
//  and opens the event dialog (this functionality comes later)
export const advanceRoundThunk = () => (dispatch, getState) => {
  const state = getState();
  dispatch(incrementRound());

  const {
    active,
    suppressed,
    leftArea,
    currentChance,
  } = primalStormStateSelector(state);

  if (!active) {
    return;
  }

  const { increment, max } = calculateIncrementAndMax(suppressed, leftArea);

  let newChance = Math.min(max, currentChance + increment);
  const currentThreshold = Math.min(max, currentChance);

  const percentile = rollPercentile();
  const currentCrVariable = makeVariable(3, 1, 11); // 1d3+11 = CR (between 12 and 14);

  const dialogState = {
    ...triggerDialogInitialState,
    open: true,
    triggerType: stormTrigerType,
    percentile,
    cr: currentCrVariable.result,
    threshold: currentThreshold,
  };

  const eventsAlwaysTrigger = eventsAlwaysTriggerSelector(state);

  if (eventsAlwaysTrigger || percentile <= currentThreshold) {
    // Chance drops back to default when an event is triggered
    newChance = leftArea ? 0 : increment;

    // Need to use current round +1 because we incremented the round above
    const currentRound = currentRoundSelector(state) + 1;
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
      currentCrVariable,
      currentRound,
      eventAlwaysSelected,
      rodOfWonderResultAlwaysSelected,
      dialogState.triggerType
    );
    dialogState.currentEvent = event;
  }

  dispatch(setPrimalStormCurrentChance(newChance));
  dispatch(setTriggerDialogState(dialogState));
};
