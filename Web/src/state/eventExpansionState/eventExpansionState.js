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
