import {
  setPrimalStormActive,
  setPrimalStormCurrentChance,
  setPrimalStormLeftArea,
  setPrimalStormSuppressed,
} from './primalStormState';

export const activatePrimalStormThunk = isActive => dispatch => {
  dispatch(setPrimalStormActive(isActive));

  if (!isActive) {
    dispatch(setPrimalStormSuppressed(false));
    dispatch(setPrimalStormLeftArea(false));
    dispatch(setPrimalStormCurrentChance(0));
  }
};
