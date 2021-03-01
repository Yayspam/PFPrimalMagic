export const characterInitialState = {
  id: 1,
  name: 'Other',
  cl: 11,
};

export const manualTriggerInitialState = {
  specifiedCr: 11,
  character: { ...characterInitialState },
  characters: [
    { ...characterInitialState },
    { ...characterInitialState, id: 2, name: 'Example', cl: 14 },
  ],
};

export const manualTriggerStateSelector = state =>
  state.primalMagic.manualTriggerState;
export const characterSelector = state =>
  manualTriggerStateSelector(state).character;
export const specifiedCrSelector = state =>
  manualTriggerStateSelector(state).specifiedCr;
export const charactersSelector = state =>
  manualTriggerStateSelector(state).characters;

const SetManualTriggerCrType =
  'primalMagic:manualTriggerState:setManualTriggerCr';
const SetManualTriggerCharacterType =
  'primalMagic:manualTriggerState:setManualTriggerCharacter';
const SaveManualTriggerCharactersType =
  'primalMagic:manualTriggerState:saveManualTriggerCharacters';

export const setManualTriggerCr = cr => ({
  type: SetManualTriggerCrType,
  payload: cr,
});

export const setManualTriggerCharacter = id => ({
  type: SetManualTriggerCharacterType,
  payload: id,
});

export const saveManualTriggerCharacters = characters => ({
  type: SaveManualTriggerCharactersType,
  payload: characters,
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
  const availableCharacters = state.manualTriggerState.characters;
  const selectedCharacter = availableCharacters.find(c => c.id == payload);
  newState.manualTriggerState.character = selectedCharacter;
  if (selectedCharacter.id !== characterInitialState.id) {
    newState.manualTriggerState.specifiedCr = selectedCharacter.cl;
  }

  return newState;
};

const handleSaveManualTriggerCharacters = (state, payload) => {
  const newState = copyState(state);
  newState.manualTriggerState.characters = payload;
  return newState;
};

export const manualTriggerStateReducers = {
  [SetManualTriggerCrType]: handleSetManualTriggerCr,
  [SetManualTriggerCharacterType]: handleSetManualTriggerCharacter,
  [SaveManualTriggerCharactersType]: handleSaveManualTriggerCharacters,
};
