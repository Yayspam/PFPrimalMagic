export const userSettingsInitialState = {
  eventsAlwaysTrigger: false,
  alwaysSelectSameEvent: false,
  eventAlwaysSelected: 'Colour Drain',
  alwaysSelectSameRodResult: false,
  rodOfWonderAlwaysSelected: 'Slow',
  resetOnlyResetsRounds: false,
};

export const userSettingsStateSelector = state =>
  state.primalMagic.userSettingsState;
export const eventsAlwaysTriggerSelector = state =>
  userSettingsStateSelector(state).eventsAlwaysTrigger;
export const alwaysSelectSameEventSelector = state =>
  userSettingsStateSelector(state).alwaysSelectSameEvent;
export const eventAlwaysSelectedSelector = state =>
  userSettingsStateSelector(state).eventAlwaysSelected;
export const alwaysSelectSameRodResultSelector = state =>
  userSettingsStateSelector(state).alwaysSelectSameRodResult;
export const rodOfWonderAlwaysSelectedSelector = state =>
  userSettingsStateSelector(state).rodOfWonderAlwaysSelected;
export const resetOnlyResetsRoundsSelector = state =>
  userSettingsStateSelector(state).resetOnlyResetsRounds;

const SetEventsAlwaysTriggerType =
  'primalMagic:userSettingsState:setEventsAlwaysTrigger';
const SetAlwaysSelectSameEventType =
  'primalMagic:userSettingsState:setAlwaysSelectSameEvent';
const SetEventAlwaysSelectedType =
  'primalMagic:userSettingsState:setEventAlwaysSelected';
const SetRodResultAlwaysSelectedType =
  'primalMagic:userSettingsState:setRodResultAlwaysSelected';
const SetRodOfWonderAlwaysSelectedType =
  'primalMagic:userSettingsState:setRodOfWonderAlwaysSelected';
const SetResetOnlyResetsRoundsType =
  'primalMagic:userSettingsState:setResetOnlyResetsRounds';

export const setEventsAlwaysTrigger = shouldAlwaysTrigger => ({
  type: SetEventsAlwaysTriggerType,
  payload: shouldAlwaysTrigger,
});

export const setAlwaysSelectSameEvent = alwaysSelectSame => ({
  type: SetAlwaysSelectSameEventType,
  payload: alwaysSelectSame,
});

export const setEventAlwaysSelected = eventAlwaysSelected => ({
  type: SetEventAlwaysSelectedType,
  payload: eventAlwaysSelected,
});

export const setAlwaysSelectSameRodResult = alwaysSelectSame => ({
  type: SetRodResultAlwaysSelectedType,
  payload: alwaysSelectSame,
});

export const setRodOfWonderAlwaysSelected = rodOfWonderAlwaysSelected => ({
  type: SetRodOfWonderAlwaysSelectedType,
  payload: rodOfWonderAlwaysSelected,
});

export const setResetOnlyResetsRounds = onlyResetsRounds => ({
  type: SetResetOnlyResetsRoundsType,
  payload: onlyResetsRounds,
});

const copyState = state => ({
  ...state,
  userSettingsState: {
    ...state.userSettingsState,
  },
});

const handleSetEventsAlwaysTrigger = (state, payload) => {
  const newState = copyState(state);
  newState.userSettingsState.eventsAlwaysTrigger = payload;
  return newState;
};

const handleSetAlwaysSelectSameEvent = (state, payload) => {
  const newState = copyState(state);
  newState.userSettingsState.alwaysSelectSameEvent = payload;
  return newState;
};

const handleSetEventAlwaysSelected = (state, payload) => {
  const newState = copyState(state);
  newState.userSettingsState.eventAlwaysSelected = payload;
  return newState;
};

const handleSetAlwaysSelectSameRodResult = (state, payload) => {
  const newState = copyState(state);
  newState.userSettingsState.alwaysSelectSameRodResult = payload;
  return newState;
};

const handleSetRodOfWonderAlwaysSelected = (state, payload) => {
  const newState = copyState(state);
  newState.userSettingsState.rodOfWonderAlwaysSelected = payload;
  return newState;
};

const handleSetResetOnlyResetsRounds = (state, payload) => {
  const newState = copyState(state);
  newState.userSettingsState.resetOnlyResetsRounds = payload;
  return newState;
};

export const userSettingsStateReducers = {
  [SetEventsAlwaysTriggerType]: handleSetEventsAlwaysTrigger,
  [SetAlwaysSelectSameEventType]: handleSetAlwaysSelectSameEvent,
  [SetEventAlwaysSelectedType]: handleSetEventAlwaysSelected,
  [SetRodResultAlwaysSelectedType]: handleSetAlwaysSelectSameRodResult,
  [SetRodOfWonderAlwaysSelectedType]: handleSetRodOfWonderAlwaysSelected,
  [SetResetOnlyResetsRoundsType]: handleSetResetOnlyResetsRounds,
};
