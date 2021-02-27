// Thunk that handles all state when toggling all expanded or not

import {
  collapseAll,
  expandAll,
  toggleSingleExpanded,
} from '../activePrimalEvents/activePrimalEventsState';
import {
  allExpandedSelector,
  setAllExpandedState,
} from './eventExpansionState';

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
