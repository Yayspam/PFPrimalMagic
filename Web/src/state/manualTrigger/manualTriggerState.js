export const characterInitialState = {
  name: 'Other',
  cl: undefined,
};

export const characters = {
  Other: { ...characterInitialState },
  Thunder: { ...characterInitialState, name: 'Thunder', cl: 8 },
  Finley: { ...characterInitialState, name: 'Finley', cl: 12 },
  Autumn: { ...characterInitialState, name: 'Autumn', cl: 14 },
  Poli: { ...characterInitialState, name: 'Poli', cl: 1 },
  Katsu: { ...characterInitialState, name: 'Katsu', cl: 1 },
};

export const manualTriggerInitialState = {
  specifiedCr: 11,
  character: { ...characterInitialState },
};

export const manualTriggerStateSelector = state =>
  state.primalMagic.manualTriggerState;
export const characterSelector = state =>
  manualTriggerStateSelector(state).character;
export const specifiedCrSelector = state =>
  manualTriggerStateSelector(state).specifiedCr;

const SetManualTriggerCrType =
  'primalMagic:manualTriggerState:setManualTriggerCr';
const SetManualTriggerCharacterType =
  'primalMagic:manualTriggerState:setManualTriggerCharacter';

export const setManualTriggerCr = cr => ({
  type: SetManualTriggerCrType,
  payload: cr,
});

export const setManualTriggerCharacter = character => ({
  type: SetManualTriggerCharacterType,
  payload: character,
});

const copyState = state => ({
  ...state,
  manualTriggerState: {
    ...state.manualTriggerState,
  },
});

const handleSetManualTriggerCr = (state, payload) => {
  const newState = copyState(state);
  newState.manualTriggerState.specifiedCr = payload;
  newState.manualTriggerState.character = { ...characterInitialState };
  return newState;
};

const handleSetManualTriggerCharacter = (state, payload) => {
  const newState = copyState(state);
  newState.manualTriggerState.character = payload;
  if (payload.cl) {
    newState.manualTriggerState.specifiedCr = payload.cl;
  }

  return newState;
};

export const manualTriggerStateReducers = {
  [SetManualTriggerCrType]: handleSetManualTriggerCr,
  [SetManualTriggerCharacterType]: handleSetManualTriggerCharacter,
};
