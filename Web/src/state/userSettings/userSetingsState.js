export const userSettingsInitialState = {
  eventsAlwaysTrigger: false,
  alwaysSelectSameEvent: false,
  eventAlwaysSelected: 'Colour Drain',
};

export const userSettingsStateSelector = state =>
  state.primalMagic.userSettingsState;
export const eventsAlwaysTriggerSelector = state =>
  userSettingsStateSelector(state).eventsAlwaysTrigger;
export const alwaysSelectSameEventSelector = state =>
  userSettingsStateSelector(state).alwaysSelectSameEvent;
export const eventAlwaysSelectedSelector = state =>
  userSettingsStateSelector(state).eventAlwaysSelected;

const SetEventsAlwaysTriggerType =
  'primalMagic:userSettingsState:setEventsAlwaysTrigger';
const SetAlwaysSelectSameEventType =
  'primalMagic:userSettingsState:setAlwaysSelectSameEvent';
const SetEventAlwaysSelectedType =
  'primalMagic:userSettingsState:setEventAlwaysSelectedType';

export const setEventsAlwaysTrigger = shouldAlwaysTrigger => ({
  type: SetEventsAlwaysTriggerType,
  payload: shouldAlwaysTrigger,
});

export const setAlwaysSelectSameEvent = alwaysSelectSame => ({
  type: SetAlwaysSelectSameEventType,
  payload: alwaysSelectSame,
});

export const seteventAlwaysSelected = eventAlwaysSelected => ({
  type: SetEventAlwaysSelectedType,
  payload: eventAlwaysSelected,
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

export const userSettingsStateReducers = {
  [SetEventsAlwaysTriggerType]: handleSetEventsAlwaysTrigger,
  [SetAlwaysSelectSameEventType]: handleSetAlwaysSelectSameEvent,
  [SetEventAlwaysSelectedType]: handleSetEventAlwaysSelected,
};
