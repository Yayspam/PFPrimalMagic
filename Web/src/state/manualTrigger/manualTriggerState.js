import { rollPercentile } from "../../random";
import { makeConstantVariable, primalEventInitialState } from "../activePrimalEvents/activePrimalEventsState";
import { allExpandedSelector } from "../eventExpansionState/eventExpansionState";
import { currentRoundSelector } from "../rounds/roundsState";
import { manualTriggerType, setTriggerDialogState, triggerDialogInitialState } from "../triggerDialog/triggerDialogState";

export const characterInitialState = {
  name: "other",
  cl: undefined
};

export const manualTriggerInitialState = {
  specifiedCr: 11,
  character: { ...characterInitialState }
};

export const specifiedCrSelector = (state) => state.primalMagic.manualTriggerState.specifiedCr;

const SetManualTriggerCrType = "primalMagic:manualTriggerState:setManualTriggerCr";
const SetManualTriggerCharacterType = "primalMagic:manualTriggerState:setManualTriggerCharacter";

export const setManualTriggerCr = cr => ({
  type: SetManualTriggerCrType,
  payload: cr
});

export const setManualTriggerCharacter = character => ({
  type: SetManualTriggerCharacterType,
  payload: character
});

const copyState = state => ({
  ...state,
  manualTriggerState: {
    ...state.manualTriggerState
  }
});

const handleSetManualTriggerCr = (state, payload) => {
  const newState = copyState(state);
  newState.manualTriggerState.specifiedCr = payload;
  newState.manualTriggerState.character = { ...characterInitialState }
  return newState;
}

const handleSetManualTriggerCharacter = (state, payload) => {
  const newState = copyState(state);
  newState.manualTriggerState.character = payload;
  if(payload.cl){
    newState.manualTriggerState.specifiedCr = payload.cl;
  }

  return newState;
}

export const manualTriggerStateReducers = ({
  [SetManualTriggerCrType]: handleSetManualTriggerCr,
  [SetManualTriggerCharacterType]: handleSetManualTriggerCharacter
});

// TODO: Replace with actual content, we'll need a list of these for each percentile roll, I think
export const generateDialogEvent = (percentile, cr, round, expanded) => ({
  ...primalEventInitialState,
  id: Date.now(),
  percentileRoll: percentile,
  cr: makeConstantVariable(cr),
  startRound: round,
  expanded
});

// Thunk that handles all state when pressing the manual trigger button
// Rolls a percentile, then generates the dialog state, and the event state if roll was high enought
// Then opens the dialog with that state
export const manualTriggerThunk = () => (dispatch, getState) => {
  const percentile = rollPercentile();
  const currentCr = specifiedCrSelector(getState());
  const currentRound = currentRoundSelector(getState());
  const allExpanded = allExpandedSelector(getState());
  const dialogState = { 
    ...triggerDialogInitialState,
    open: true,
    triggerType: manualTriggerType,
    percentile,
    cr: currentCr
   };

  if(percentile > dialogState.threshold){
    const eventPercentile = rollPercentile();
    const event = generateDialogEvent(eventPercentile, currentCr, currentRound, !!(allExpanded));
    dialogState.currentEvent = event;
  }

  dispatch(setTriggerDialogState(dialogState));
};