import { rollD, rollMultipleD } from '../../random';
import { currentRoundSelector } from '../rounds/roundsState';

export const variableInitialState = {
  diceSize: undefined,
  diceCount: undefined,
  modifier: undefined,
  result: undefined,
  description: undefined,
};

export const makeConstantVariable = (
  value,
  description = undefined,
  type = undefined
) => ({
  ...variableInitialState,
  diceSize: 0,
  diceCount: 0,
  modifier: value,
  result: value,
  description,
  type,
});

export const makeVariable = (
  diceSize,
  diceCount = 1,
  modifier = 0,
  description = undefined
) => ({
  ...variableInitialState,
  diceSize: diceSize,
  diceCount: diceCount,
  modifier: modifier,
  result: rollMultipleD(diceSize, diceCount, modifier),
  description,
});

export const makeLimitedVariable = (diceSize, limit) => ({
  ...variableInitialState,
  diceSize: diceSize,
  result: Math.min(rollD(diceSize), limit),
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
  triggerType: undefined,
};

export const activePrimalEventsInitialState = [];

export const activePrimalEventsSelector = state =>
  state.primalMagic.activePrimalEventsState.filter(
    event => event.finalRound >= currentRoundSelector(state)
  );
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
