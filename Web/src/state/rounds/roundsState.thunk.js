// Thunk that handles all state when pressing the advance round button
// Increments the round number
// Then, if primal magic storm is on, generates the dialog state and event state if roll is high enough

import { wonderousMagic } from '../../events/eventComponents/wonderousMagicEvent.component';
import { rollD, rollPercentile } from '../../random';
import { generateDialogEvent } from '../manualTrigger/manualTriggerState.thunk';
import {
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

  let chanceIncrement = 10;
  let maximumChance = 100;

  if (suppressed) {
    chanceIncrement = 5;
    maximumChance = 50;
  }

  if (leftArea) {
    chanceIncrement = 0;
  }

  let newChance = Math.min(maximumChance, currentChance + chanceIncrement);

  const percentile = rollPercentile();
  const currentCr = rollD(3) + 11; // 1d3+11 = CR (between 12 and 14);

  const dialogState = {
    ...triggerDialogInitialState,
    open: true,
    triggerType: stormTrigerType,
    percentile,
    cr: currentCr,
    threshold: newChance,
  };

  const eventsAlwaysTrigger = eventsAlwaysTriggerSelector(state);

  if (eventsAlwaysTrigger || percentile <= newChance) {
    // Chance drops back to zero when an event is triggered
    newChance = 0;

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
    const event = generateDialogEvent(
      eventPercentile,
      currentCr,
      currentRound,
      eventAlwaysSelected,
      rodOfWonderResultAlwaysSelected
    );
    dialogState.currentEvent = event;
  }

  dispatch(setPrimalStormCurrentChance(newChance));
  dispatch(setTriggerDialogState(dialogState));
};
