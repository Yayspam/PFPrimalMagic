import createReducer from './createReducer';
import {
  manualTriggerInitialState,
  manualTriggerStateReducers,
} from '../manualTrigger/manualTriggerState';
import {
  activePrimalEventsInitialState,
  activePrimalEventsReducers,
} from '../activePrimalEvents/activePrimalEventsState';
import { primalStormInitialState } from '../primalStorm/primalStormState';
import {
  triggerDialogInitialState,
  triggerDialogStateReducers,
} from '../triggerDialog/triggerDialogState';
import {
  eventExpansionInitialState,
  eventExpansionReducers,
} from '../eventExpansionState/eventExpansionState';
import { roundsInitialState, roundsStateReducers } from '../rounds/roundsState';
import {
  userSettingsInitialState,
  userSettingsStateReducers,
} from '../userSettings/userSetingsState';

export const initialState = {
  activePrimalEventsState: [...activePrimalEventsInitialState],
  eventExpansionState: {
    ...eventExpansionInitialState,
  },
  manualTriggerState: {
    ...manualTriggerInitialState,
  },
  primalStormState: {
    ...primalStormInitialState,
  },
  roundsState: {
    ...roundsInitialState,
  },
  triggerDialogState: {
    ...triggerDialogInitialState,
  },
  userSettingsState: {
    ...userSettingsInitialState,
  },
};

const ResetAllType = 'primalMagic:resetAll';
const ResetAllForceType = 'primalMagic:resetAllForce';

export const resetAll = () => ({
  type: ResetAllType,
});

export const resetPrimalMagic = () => ({
  type: ResetAllType,
});

const handleResetAll = state => {
  if (state?.userSettingsState?.resetOnlyResetsRounds) {
    return {
      ...state,
      roundsState: { ...roundsInitialState },
    };
  }

  return {
    ...initialState,
    userSettingsState: { ...state.userSettingsState },
  };
};

export const handleResetAllForce = state => {
  return {
    ...initialState,
  };
};

const PrimalMagicReducer = createReducer(initialState, {
  [ResetAllType]: handleResetAll,
  [ResetAllForceType]: handleResetAllForce,
  ...eventExpansionReducers,
  ...activePrimalEventsReducers,
  ...manualTriggerStateReducers,
  ...roundsStateReducers,
  ...triggerDialogStateReducers,
  ...userSettingsStateReducers,
});

export default PrimalMagicReducer;
