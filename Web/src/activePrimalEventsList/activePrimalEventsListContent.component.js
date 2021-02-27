import React from 'react';
import { Box, List, ListItem, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSingleExpandedThunk } from '../state/eventExpansionState/eventExpansionState.thunk';
import { activePrimalEventsSelector } from '../state/activePrimalEvents/activePrimalEventsState';
import EventCard from '../events/eventCard.component';
import { getEventCardContent } from '../events/events';

const useStyles = makeStyles({
  content: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'auto',
  },
});

const ActivePrimalEventsListContent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const activePrimalEvents = useSelector(activePrimalEventsSelector);

  const toggleSingleClicked = primalEvent => () => {
    dispatch(toggleSingleExpandedThunk(primalEvent.id));
  };

  return (
    <Box className={classes.content}>
      {activePrimalEvents.length > 0 && (
        <List>
          {activePrimalEvents.map(primalEvent => (
            <ListItem key={primalEvent.id}>
              <EventCard
                event={primalEvent}
                onExpandToggleClicked={toggleSingleClicked(primalEvent)}
                getEventCardContent={getEventCardContent}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ActivePrimalEventsListContent;
