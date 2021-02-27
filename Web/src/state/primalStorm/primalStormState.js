export const primalStormInitialState = {
  active: false,
  suppressed: false,
  leftArea: false,
  currentChance: 0,
};

export const primalStormStateSelector = state =>
  state.primalMagic.primalStormState;
export const primalStormActiveSelector = state =>
  primalStormStateSelector(state).active;
export const primalStormSuppressedSelector = state =>
  primalStormStateSelector(state).suppressed;
export const primalStormLeftAreaSelector = state =>
  primalStormStateSelector(state).leftArea;
export const primalStormCurrentChanceSelector = state =>
  primalStormStateSelector(state).currentChance;

const SetActiveType = 'primalMagic:primalStormState:setActiveType';
const SetSuppressedType = 'primalMagic:primalStormState:setSuppressedType';
const SetLeftAreaType = 'primalMagic:primalStormState:setLeftAreaType';
const SetCurrentChanceType =
  'primalMagic:primalStormState:setCurrentChanceType';

export const setPrimalStormActive = isActive => ({
  type: SetActiveType,
  payload: isActive,
});

export const setPrimalStormSuppressed = isSuppressed => ({
  type: SetSuppressedType,
  payload: isSuppressed,
});

export const setPrimalStormLeftArea = haveLeftArea => ({
  type: SetLeftAreaType,
  payload: haveLeftArea,
});

export const setPrimalStormCurrentChance = chance => ({
  type: SetCurrentChanceType,
  payload: chance,
});

const copyState = state => ({
  ...state,
  primalStormState: {
    ...state.primalStormState,
  },
});

const handleSetPrimalStormActive = (state, payload) => {
  const newState = copyState(state);
  newState.primalStormState.active = payload;
  return newState;
};

const handleSetPrimalStormSuppressed = (state, payload) => {
  const newState = copyState(state);
  newState.primalStormState.suppressed = payload;
  return newState;
};

const handleSetPrimalStormLeftArea = (state, payload) => {
  const newState = copyState(state);
  newState.primalStormState.leftArea = payload;
  return newState;
};

const handleSetPrimalStormCurrentChance = (state, payload) => {
  const newState = copyState(state);
  newState.primalStormState.currentChance = payload;
  return newState;
};

export const primalStormStateReducers = {
  [SetActiveType]: handleSetPrimalStormActive,
  [SetSuppressedType]: handleSetPrimalStormSuppressed,
  [SetLeftAreaType]: handleSetPrimalStormLeftArea,
  [SetCurrentChanceType]: handleSetPrimalStormCurrentChance,
};

export const activatePrimalStormThunk = isActive => dispatch => {
  dispatch(setPrimalStormActive(isActive));

  if (!isActive) {
    dispatch(setPrimalStormSuppressed(false));
    dispatch(setPrimalStormLeftArea(false));
    dispatch(setPrimalStormCurrentChance(0));
  }
};
