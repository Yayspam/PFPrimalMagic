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
