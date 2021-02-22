import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ManualTriggerBar from '../manualTriggerBar/manualTrigger.component';
import ActivePrimalEventsList from '../activePrimalEventsList/activePrimalEventsList.component';
import RoundsBar from '../roundsBar/roundsBar.component';
import ManualPrimalEventDialog from '../primalEventDialog/manualPrimalEventDialog.component';

const useStyles = makeStyles({
  contentContainer: {
    height: 'calc(100vh - 20px)',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: grey[100],
  },
  buttonPage: {
    margin: 10,
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    margin: 10,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinnedEventsPage: {
    margin: 10,
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PrimalEventPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.contentContainer}>
      <Paper elevation={3} variant="outlined" className={classes.buttonPage}>
        <ManualTriggerBar />
      </Paper>
      <Paper elevation={3} variant="outlined" className={classes.page}>
        <ActivePrimalEventsList />
      </Paper>
      <Paper
        elevation={3}
        variant="outlined"
        className={classes.pinnedEventsPage}
      >
        <RoundsBar />
      </Paper>
      <ManualPrimalEventDialog />
    </div>
  );
};

export default PrimalEventPage;
