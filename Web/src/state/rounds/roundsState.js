import {
  primalStormActiveSelector,
  primalStormStateSelector,
  setPrimalStormCurrentChance,
} from '../primalStorm/primalStormState';

export const roundsInitialState = {
  currentRound: 0,
};

export const currentRoundSelector = state =>
  state.primalMagic.roundsState.currentRound;

const IncrementRoundType = 'primalMagic:roundsState:incrementRound';

export const incrementRound = () => ({
  type: IncrementRoundType,
});

const handleIncrementRound = state => ({
  ...state,
  roundsState: {
    ...state.roundsState,
    currentRound: state.roundsState.currentRound + 1,
  },
});

export const roundsStateReducers = {
  [IncrementRoundType]: handleIncrementRound,
};

// Thunk that handles all state when pressing the advance round button
// Increments the round number
// Then, if primal magic storm is on, generates the dialog state and event state if roll is high enough
//  and opens the event dialog (this functionality comes later)
export const advanceRoundThunk = () => (dispatch, getState) => {
  const state = getState();
  dispatch(incrementRound());

  const {
    active,
    suppressed,
    leftArea,
    currentChance,
  } = primalStormStateSelector(state);

  if (!active) {
    return;
  }

  let chanceIncrement = 10;
  let maximumChance = 100;

  if (suppressed) {
    chanceIncrement = 5;
    maximumChance = 50;
  }

  if (leftArea) {
    chanceIncrement = 0;
  }

  const newChance = Math.min(maximumChance, currentChance + chanceIncrement);

  // TODO: Do this after resetting to zero if event was triggered
  dispatch(setPrimalStormCurrentChance(newChance));
};
