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
