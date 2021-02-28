// Thunk that handles all state when pressing the confirm button in a trigger dialog

import { twoSimultaneousEvents } from '../../events/eventComponents/twoSimlultaneousEvents/twoSimultaneousEventsEvent.component';
import { wonderousMagic } from '../../events/eventComponents/wonderousMagicEvent.component';
import { rollPercentile, rollTableDice } from '../../random';
import {
  addActivePrimalEvent,
  reRollVariable,
} from '../activePrimalEvents/activePrimalEventsState';
import { allExpandedSelector } from '../eventExpansionState/eventExpansionState';
import { specifiedCrSelector } from '../manualTrigger/manualTriggerState';
import {
  calculateFinalRound,
  generateDialogEvent,
  generateEventVariablesWithDefaults,
} from '../manualTrigger/manualTriggerState.thunk';
import { currentRoundSelector } from '../rounds/roundsState';
import {
  alwaysSelectSameEventSelector,
  alwaysSelectSameRodResultSelector,
  eventAlwaysSelectedSelector,
  rodOfWonderAlwaysSelectedSelector,
} from '../userSettings/userSetingsState';
import {
  closeTriggerDialog,
  setTriggerDialogState,
  triggerDialogCurrentEventSelector,
  triggerDialogStateSelector,
} from './triggerDialogState';

// Adds the trigger dialog's current event to the active primal events then wipes the dialog to close it
export const confirmDialogPrimalEventThunk = () => (dispatch, getState) => {
  const state = getState();
  const currentEvent = triggerDialogCurrentEventSelector(state);
  const allExpanded = allExpandedSelector(state);
  const dispatchedEvent = {
    ...currentEvent,
    expanded: !!allExpanded,
  };
  dispatch(addActivePrimalEvent(dispatchedEvent));
  dispatch(closeTriggerDialog());
};

// Thunk that handles all state when pressing the re-roll event button in a trigger dialog
// Re-rolls the primal magic event based on the current dialog settings and updates the dialog state
export const rerollDialogPrimalEventThunk = () => (dispatch, getState) => {
  const state = getState();
  const currentDialogState = triggerDialogStateSelector(state);
  const eventPercentile = rollPercentile();
  const tableRoll = rollTableDice();
  const currentCr = specifiedCrSelector(state);
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
  const event = generateDialogEvent(
    eventPercentile,
    tableRoll,
    currentCr,
    currentRound,
    eventAlwaysSelected,
    rodOfWonderResultAlwaysSelected,
    currentDialogState.triggerType
  );
  event.expanded = currentDialogState.currentEvent.expanded;
  const newDialogState = {
    ...currentDialogState,
    currentEvent: event,
  };

  dispatch(setTriggerDialogState(newDialogState));
};

// Thunk that handles all state when pressing the re-roll event variables button in a trigger dialog
// Keeps the current primal magic event but re-rolls any variables
export const rerollDialogPrimalEventVariablesThunk = () => (
  dispatch,
  getState
) => {
  const state = getState();
  const currentDialogState = triggerDialogStateSelector(state);
  const currentEvent = currentDialogState.currentEvent;

  let newVariables = {};

  if (currentEvent.title === wonderousMagic.title) {
    // Because wonderous magic has an inner table we need to handle it separately
    // We must completely reroll the variables object, not just each variable
    const alwaysShowSameRodResult = alwaysSelectSameRodResultSelector(state);
    const rodOfWonderResultAlwaysSelected = alwaysShowSameRodResult
      ? rodOfWonderAlwaysSelectedSelector(state)
      : undefined;
    newVariables = generateEventVariablesWithDefaults(
      wonderousMagic,
      currentEvent.cr.result,
      rodOfWonderResultAlwaysSelected
    );
  } else if (currentEvent.title === twoSimultaneousEvents.title) {
    // Because two simultaneous events has two events inside which need variables rerolling
    // we need to completely re roll the variables object, not just each variable
    newVariables = generateEventVariablesWithDefaults(
      twoSimultaneousEvents,
      currentEvent.cr.result
    );
  } else {
    Object.entries(currentEvent.variables).forEach(([key, variable]) => {
      newVariables[key] = reRollVariable(variable);
    });
  }

  const newDialogState = {
    ...currentDialogState,
    currentEvent: {
      ...currentEvent,
      variables: newVariables,
      finalRound: calculateFinalRound(
        newVariables.duration,
        currentEvent.startRound
      ),
    },
  };

  dispatch(setTriggerDialogState(newDialogState));
};
