import { rollPercentile } from "../../random";
import { addActivePrimalEvent } from "../activePrimalEvents/activePrimalEventsState";
import { allExpandedSelector } from "../eventExpansionState/eventExpansionState";
import { generateDialogEvent, specifiedCrSelector } from "../manualTrigger/manualTriggerState";
import { currentRoundSelector } from "../rounds/roundsState";

export const manualTriggerType = "MANUAL";
export const stormTrigerType = "STORM";

export const triggerDialogInitialState = {
  open: false,
  triggerType: undefined,
  percentile: 0,
  threshold: 50,
  cr: undefined,
  currentEvent: undefined
}

export const triggerDialogStateSelector = (state) => state.primalMagic.triggerDialogState;
export const triggerDialogCurrentEventSelector = (state) => triggerDialogStateSelector(state).currentEvent;

const SetTriggerDialogStateType = "primalMagic:triggerDialogState:setTriggerDialogState";
const SetTriggerDialogPrimalEventType = "primalMagic:triggerDialogState:setTriggerDialogPrimalEvent";
const CloseTriggerDialogType = "primalMagic:triggerDialogState:closeTriggerDialog";

export const setTriggerDialogState = (triggerDialogState) => ({
  type: SetTriggerDialogStateType,
  payload: triggerDialogState
});

export const setTriggerDialogPrimalEvent = (primalEvent) => ({
  type: SetTriggerDialogPrimalEventType,
  payload: primalEvent
});

export const closeTriggerDialog = () => ({
  type: CloseTriggerDialogType
});

const handleSetTriggerDialogState = (state, payload) => ({
  ...state,
  triggerDialogState: {
    ...payload
  }
});

const handleSetTriggerDialogPrimalEvent = (state, payload) => ({
  ...state,
  triggerDialogState: {
    ...state.triggerDialogState,
    currentEvent: payload
  }
});

const handleCloseTriggerDialog = (state) => ({
  ...state,
  triggerDialogState: {
    ...triggerDialogInitialState
  }
});

export const triggerDialogStateReducers = ({
  [SetTriggerDialogStateType]: handleSetTriggerDialogState,
  [SetTriggerDialogPrimalEventType]: handleSetTriggerDialogPrimalEvent,
  [CloseTriggerDialogType]: handleCloseTriggerDialog
});

// Thunk that handles all state when pressing the confirm button in a trigger dialog
// Adds the trigger dialog's current event to the active primal events then wipes the dialog to close it
export const confirmDialogPrimalEventThunk = () => (dispatch, getState) => {
  const currentEvent = triggerDialogCurrentEventSelector(getState());
  dispatch(addActivePrimalEvent(currentEvent));
  dispatch(closeTriggerDialog());
};

// Thunk that handles all state when pressing the re-roll event button in a trigger dialog
// Re-rolls the primal magic event based on the current dialog settings and updates the dialog state
export const rerollDialogPrimalEventThunk = () => (dispatch, getState) => {
  const currentDialogState = triggerDialogStateSelector(getState());
  const eventPercentile = rollPercentile();
  const currentCr = specifiedCrSelector(getState());
  const currentRound = currentRoundSelector(getState());
  const allExpanded = allExpandedSelector(getState());
  const event = generateDialogEvent(eventPercentile, currentCr, currentRound, !!(allExpanded));
  const newDialogState = {
    ...currentDialogState,
    currentEvent: event
  };

  dispatch(setTriggerDialogState(newDialogState));
}