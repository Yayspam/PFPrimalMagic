import { Button, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activePrimalEventsSelector } from '../state/activePrimalEvents/activePrimalEventsState';
import { allExpandedSelector, toggleAllExpandedThunk, toggleSingleExpandedThunk } from '../state/eventExpansionState/eventExpansionState';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  }
});

// export const primalEventInitialState = {
//   id: undefined,
//   percentileRoll: undefined,
//   cr: {...variableInitialState},
//   startRound: undefined,
//   finalRound: undefined,
//   variables: [],
//   expanded: true,
// };

const booleanToString = (boolVal) => boolVal === undefined ? '-' : (boolVal ? 'true' : 'false');

const ActivePrimalEventsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const activePrimalEvents = useSelector(activePrimalEventsSelector);
  const allExpanded = useSelector(allExpandedSelector);

  const toggleAllClicked = () => {
    dispatch(toggleAllExpandedThunk());
  };

  const toggleSingleClicked = (primalEvent) => () => {
    dispatch(toggleSingleExpandedThunk(primalEvent.id));
  };

  return (
    <div className={classes.content}>
      <div>
        <Typography>
          Active Primal Events: {activePrimalEvents.length}; All expanded: {booleanToString(allExpanded)}
          <Button variant='contained' onClick={toggleAllClicked} >
            Toggle
          </Button>
        </Typography>
      </div>
      {activePrimalEvents.length > 0 && (<List>
        {activePrimalEvents.map((primalEvent, index) => (
          <ListItem key={primalEvent.id}>
            <Typography>
              Primal Event: {index + 1}; d%: {primalEvent.percentileRoll}; CR: {primalEvent.cr.result}; Expanded: {booleanToString(primalEvent.expanded)}
              <Button variant='contained' onClick={toggleSingleClicked(primalEvent)} >
                Toggle
              </Button>
            </Typography>
          </ListItem>
        ))}
      </List>)}
    </div>
  );
};

export default ActivePrimalEventsList