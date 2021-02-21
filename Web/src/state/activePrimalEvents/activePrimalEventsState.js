import { rollMultipleD } from '../../random';

export const variableInitialState = {
  diceSize: undefined,
  diceCount: undefined,
  modifier: undefined,
  result: undefined,
};

export const makeConstantVariable = value => ({
  ...variableInitialState,
  diceSize: 0,
  diceCount: 0,
  modifier: value,
  result: value,
});

export const makeVariable = (diceSize, diceCount = 1, modifier = 0) => ({
  ...variableInitialState,
  diceSize: diceSize,
  diceCount: diceCount,
  modifier: modifier,
  result: rollMultipleD(diceSize, diceCount, modifier),
});

export const reRollVariable = variable => ({
  ...variable,
  result: rollMultipleD(
    variable.diceSize,
    variable.diceCount,
    variable.modifier
  ),
});

export const primalEventInitialState = {
  id: undefined,
  percentileRoll: undefined,
  cr: { ...variableInitialState },
  startRound: undefined,
  finalRound: undefined,
  variables: [],
  expanded: true,
};

export const activePrimalEventsInitialState = [];

export const activePrimalEventsSelector = state =>
  state.primalMagic.activePrimalEventsState;
export const activePrimalEventSelector = id => state =>
  activePrimalEventsSelector(state).find(primalEvent => primalEvent.id === id);
export const activePrimalEventIsExpandedSelector = id => state =>
  activePrimalEventSelector(id)(state).expanded;

const ExpandAllEventsType = 'primalMagic:activePrimalEvents:expandAllEvents';
const CollapseAllEventsType =
  'primalMagic:activePrimalEvents:collapseAllEvents';
const ToggleSingleExpandedType =
  'primalMagic:activePrimalEvents:toggleSingleExpanded';
const AddActivePrimalEventType =
  'primalMagic:activePrimalEvents:addActivePrimalEvent';

export const expandAll = () => ({
  type: ExpandAllEventsType,
});

export const collapseAll = () => ({
  type: CollapseAllEventsType,
});

export const toggleSingleExpanded = id => ({
  type: ToggleSingleExpandedType,
  payload: id,
});

export const addActivePrimalEvent = primalEvent => ({
  type: AddActivePrimalEventType,
  payload: primalEvent,
});

const copyState = state => ({
  ...state,
  activePrimalEventsState: [...state.activePrimalEventsState],
});

const handleExpandAll = state => {
  const newState = copyState(state);
  newState.activePrimalEventsState = newState.activePrimalEventsState.map(
    activePrimalEvent => ({ ...activePrimalEvent, expanded: true })
  );

  return newState;
};

const handleCollapseAll = state => {
  const newState = copyState(state);
  newState.activePrimalEventsState = newState.activePrimalEventsState.map(
    activePrimalEvent => ({ ...activePrimalEvent, expanded: false })
  );

  return newState;
};

const handleToggleSingleExpanded = (state, payload) => {
  const newState = copyState(state);
  const match = newState.activePrimalEventsState.find(
    activePrimalEvent => activePrimalEvent.id === payload
  );

  if (!match) {
    return newState;
  }

  const matchIndex = newState.activePrimalEventsState.indexOf(match);
  const matchToggled = { ...match, expanded: !match.expanded };
  newState.activePrimalEventsState[matchIndex] = matchToggled;
  return newState;
};

const handleAddActivePrimalEvent = (state, payload) => {
  const newState = copyState(state);
  newState.activePrimalEventsState.push(payload);
  return newState;
};

export const activePrimalEventsReducers = {
  [ExpandAllEventsType]: handleExpandAll,
  [CollapseAllEventsType]: handleCollapseAll,
  [ToggleSingleExpandedType]: handleToggleSingleExpanded,
  [AddActivePrimalEventType]: handleAddActivePrimalEvent,
};
