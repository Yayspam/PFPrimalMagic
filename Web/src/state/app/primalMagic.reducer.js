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
};

const ResetAllType = 'primalMagic:resetAll';

export const resetAll = () => ({
  type: ResetAllType,
});

const handleResetAll = () => ({ ...initialState });

const PrimalMagicReducer = createReducer(initialState, {
  [ResetAllType]: handleResetAll,
  ...eventExpansionReducers,
  ...activePrimalEventsReducers,
  ...manualTriggerStateReducers,
  ...roundsStateReducers,
  ...triggerDialogStateReducers,
});

export default PrimalMagicReducer;
