import {
  collapseAll,
  expandAll,
  toggleSingleExpanded,
} from '../activePrimalEvents/activePrimalEventsState';

export const eventExpansionInitialState = {
  allExpanded: true,
};

export const allExpandedSelector = state =>
  state.primalMagic.eventExpansionState.allExpanded;

const SetAllExpandedStateType =
  'primalMagic:activePrimalEvents:setAllExpandedState';

export const setAllExpandedState = allExpanded => ({
  type: SetAllExpandedStateType,
  payload: allExpanded,
});

const handleSetAllExpanded = (state, payload) => {
  return {
    ...state,
    eventExpansionState: {
      ...state.eventExpansionState,
      allExpanded: payload,
    },
  };
};

export const eventExpansionReducers = {
  [SetAllExpandedStateType]: handleSetAllExpanded,
};

// Thunk that handles all state when toggling all expanded or not
// If tristate 'allExpanded' is undefined (i.e. some expanded some not) then it will expand all
export const toggleAllExpandedThunk = () => (dispatch, getState) => {
  if (!allExpandedSelector(getState())) {
    dispatch(setAllExpandedState(true));
    dispatch(expandAll());
  } else {
    dispatch(setAllExpandedState(false));
    dispatch(collapseAll());
  }
};

// Thunk that handles all state when toggling a single event
// Sets tristate 'allExpanded' to undefined (i.e. some are expanded, some not)
// May need to reconsider this last part because what if you toggle one so they're all expanded/collapsed...
export const toggleSingleExpandedThunk = id => dispatch => {
  dispatch(toggleSingleExpanded(id));
  dispatch(setAllExpandedState(undefined));
};
