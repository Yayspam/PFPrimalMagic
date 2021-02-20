import { Box, makeStyles } from '@material-ui/core';
import React from 'react'
import ActivePrimalEventsListContent from './activePrimalEventsListContent.component';
import ActivePrimalEventsListHeader from './activePrimalEventsListHeader.component';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  }
});

const ActivePrimalEventsList = () => {
  const classes = useStyles();

  return (
    <Box className={classes.content}>
      <ActivePrimalEventsListHeader/>
      <ActivePrimalEventsListContent/>
    </Box>
  );
};

export default ActivePrimalEventsList