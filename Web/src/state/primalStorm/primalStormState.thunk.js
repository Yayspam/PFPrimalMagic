import {
  resetPrimalStormState,
  setPrimalStormActive,
} from './primalStormState';

export const activatePrimalStormThunk = isActive => dispatch => {
  dispatch(setPrimalStormActive(isActive));

  if (!isActive) {
    dispatch(resetPrimalStormState());
  }
};
