import { wonderousMagic } from '../../events/eventComponents/wonderousMagicEvent.component';
import { rollPercentile } from '../../random';
import {
  addActivePrimalEvent,
  reRollVariable,
} from '../activePrimalEvents/activePrimalEventsState';
import { allExpandedSelector } from '../eventExpansionState/eventExpansionState';
import {
  generateDialogEvent,
  specifiedCrSelector,
} from '../manualTrigger/manualTriggerState';
import { currentRoundSelector } from '../rounds/roundsState';
import {
  alwaysSelectSameEventSelector,
  alwaysSelectSameRodResultSelector,
  eventAlwaysSelectedSelector,
  rodOfWonderAlwaysSelectedSelector,
} from '../userSettings/userSetingsState';

export const manualTriggerType = 'MANUAL';
export const stormTrigerType = 'STORM';

export const triggerDialogInitialState = {
  open: false,
  triggerType: undefined,
  percentile: 0,
  threshold: 50,
  cr: undefined,
  currentEvent: undefined,
};

export const triggerDialogStateSelector = state =>
  state.primalMagic.triggerDialogState;
export const triggerDialogCurrentEventSelector = state =>
  triggerDialogStateSelector(state).currentEvent;

const SetTriggerDialogStateType =
  'primalMagic:triggerDialogState:setTriggerDialogState';
const SetTriggerDialogPrimalEventType =
  'primalMagic:triggerDialogState:setTriggerDialogPrimalEvent';
const ToggleTriggerDialogPrimalEventExpandedType =
  'primalMagic:triggerDialogState:toggleTriggerDialogPrimalEventExpanded';
const CloseTriggerDialogType =
  'primalMagic:triggerDialogState:closeTriggerDialog';

export const setTriggerDialogState = triggerDialogState => ({
  type: SetTriggerDialogStateType,
  payload: triggerDialogState,
});

export const setTriggerDialogPrimalEvent = primalEvent => ({
  type: SetTriggerDialogPrimalEventType,
  payload: primalEvent,
});

export const toggleTriggerDialogPrimalEventExpanded = () => ({
  type: ToggleTriggerDialogPrimalEventExpandedType,
});

export const closeTriggerDialog = () => ({
  type: CloseTriggerDialogType,
});

const handleSetTriggerDialogState = (state, payload) => ({
  ...state,
  triggerDialogState: {
    ...payload,
  },
});

const handleSetTriggerDialogPrimalEvent = (state, payload) => ({
  ...state,
  triggerDialogState: {
    ...state.triggerDialogState,
    currentEvent: payload,
  },
});

const handleToggleTriggerDialogPrimalEventExpanded = state => ({
  ...state,
  triggerDialogState: {
    ...state.triggerDialogState,
    currentEvent: {
      ...state.triggerDialogState.currentEvent,
      expanded: !state.triggerDialogState.currentEvent.expanded,
    },
  },
});

const handleCloseTriggerDialog = state => ({
  ...state,
  triggerDialogState: {
    ...triggerDialogInitialState,
  },
});

export const triggerDialogStateReducers = {
  [SetTriggerDialogStateType]: handleSetTriggerDialogState,
  [SetTriggerDialogPrimalEventType]: handleSetTriggerDialogPrimalEvent,
  [ToggleTriggerDialogPrimalEventExpandedType]: handleToggleTriggerDialogPrimalEventExpanded,
  [CloseTriggerDialogType]: handleCloseTriggerDialog,
};

// Thunk that handles all state when pressing the confirm button in a trigger dialog
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
    currentCr,
    currentRound,
    eventAlwaysSelected,
    rodOfWonderResultAlwaysSelected
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

  let newVariables = {};

  if (currentDialogState.currentEvent.title === wonderousMagic.title) {
    // Because wonderous magic has an inner table we need to handle it separately
    // We must completely reroll the variables object, not just each variable
    const alwaysShowSameRodResult = alwaysSelectSameRodResultSelector(state);
    const rodOfWonderResultAlwaysSelected = alwaysShowSameRodResult
      ? rodOfWonderAlwaysSelectedSelector(state)
      : undefined;
    newVariables = wonderousMagic.createVariables(
      undefined,
      rodOfWonderResultAlwaysSelected
    );
  } else {
    Object.entries(currentDialogState.currentEvent.variables).forEach(
      ([key, variable]) => {
        newVariables[key] = reRollVariable(variable);
      }
    );
  }

  const newDialogState = {
    ...currentDialogState,
    currentEvent: {
      ...currentDialogState.currentEvent,
      variables: newVariables,
    },
  };

  dispatch(setTriggerDialogState(newDialogState));
};
