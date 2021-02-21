export const userSettingsInitialState = {
  eventsAlwaysTrigger: false,
  alwaysSelectSameEvent: false,
  eventAlwaysSelected: 'Colour Drain',
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
export const resetOnlyResetsRoundsSelector = state =>
  userSettingsStateSelector(state).resetOnlyResetsRounds;

const SetEventsAlwaysTriggerType =
  'primalMagic:userSettingsState:setEventsAlwaysTrigger';
const SetAlwaysSelectSameEventType =
  'primalMagic:userSettingsState:setAlwaysSelectSameEvent';
const SetEventAlwaysSelectedType =
  'primalMagic:userSettingsState:setEventAlwaysSelected';
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

const handleSetResetOnlyResetsRounds = (state, payload) => {
  const newState = copyState(state);
  newState.userSettingsState.resetOnlyResetsRounds = payload;
  return newState;
};

export const userSettingsStateReducers = {
  [SetEventsAlwaysTriggerType]: handleSetEventsAlwaysTrigger,
  [SetAlwaysSelectSameEventType]: handleSetAlwaysSelectSameEvent,
  [SetEventAlwaysSelectedType]: handleSetEventAlwaysSelected,
  [SetResetOnlyResetsRoundsType]: handleSetResetOnlyResetsRounds,
};
