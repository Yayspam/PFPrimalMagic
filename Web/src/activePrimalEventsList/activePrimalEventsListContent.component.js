import React from 'react'
import { Box, Button, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSingleExpandedThunk } from '../state/eventExpansionState/eventExpansionState';
import { activePrimalEventsSelector } from '../state/activePrimalEvents/activePrimalEventsState';
import { booleanToString } from '../common/utils';

const useStyles = makeStyles({
  content: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'auto'
  }
});

const ActivePrimalEventsListContent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const activePrimalEvents = useSelector(activePrimalEventsSelector);

  const toggleSingleClicked = (primalEvent) => () => {
    dispatch(toggleSingleExpandedThunk(primalEvent.id));
  };

  return (
    <Box className={classes.content}>
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
    </Box>
  );
}

export default ActivePrimalEventsListContent;