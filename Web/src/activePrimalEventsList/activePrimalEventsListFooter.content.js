import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  alwaysSelectSameEventSelector,
  eventAlwaysSelectedSelector,
  eventsAlwaysTriggerSelector,
  resetOnlyResetsRoundsSelector,
  setAlwaysSelectSameEvent,
  setEventAlwaysSelected,
  setEventsAlwaysTrigger,
  setResetOnlyResetsRounds,
} from '../state/userSettings/userSetingsState';
import { events } from '../events/events';
import { userSettingsHeader } from '../common/colours';

const useStyles = makeStyles({
  footer: {
    margin: 20,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 150,
    minWidth: 420,
  },
  dialogHeader: {
    backgroundColor: userSettingsHeader,
    color: 'white',
    textAlign: 'center',
  },
  dropDown: {
    marginLeft: 5,
    minWidth: 215,
  },
  divider: {
    width: '100%',
  },
});

const ActivePrimalEventsListFooter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const eventsAlwaysTrigger = useSelector(eventsAlwaysTriggerSelector);
  const alwaysSelectSameEvent = useSelector(alwaysSelectSameEventSelector);
  const eventAlwaysSelected = useSelector(eventAlwaysSelectedSelector);
  const resetOnlyResetsRounds = useSelector(resetOnlyResetsRoundsSelector);

  const onUserSettingsClicked = () => {
    setDialogOpen(true);
  };

  const onClose = () => {
    setDialogOpen(false);
  };

  const eventsAlwaysTriggerClicked = event => {
    const value = event.target.checked;
    dispatch(setEventsAlwaysTrigger(value));
  };

  const alwaysSelectSameEventClicked = event => {
    const value = event.target.checked;
    dispatch(setAlwaysSelectSameEvent(value));
  };

  const sameEventSelected = event => {
    const value = event.target.value;
    dispatch(setEventAlwaysSelected(value));
  };

  const resetOnlyResetsRoundsClicked = event => {
    const value = event.target.checked;
    dispatch(setResetOnlyResetsRounds(value));
  };

  return (
    <Fragment>
      <Box className={classes.footer}>
        <Button variant="contained" onClick={onUserSettingsClicked}>
          Settings
        </Button>
      </Box>
      <Dialog open={dialogOpen}>
        <DialogTitle className={classes.dialogHeader}>
          User Settings
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <FormControlLabel
            label="'Reset' Only Resets Current Round"
            labelPlacement="start"
            control={
              <Checkbox
                color="default"
                checked={resetOnlyResetsRounds}
                onChange={resetOnlyResetsRoundsClicked}
              />
            }
          />
          <FormControlLabel
            label="Events Always Trigger"
            labelPlacement="start"
            control={
              <Checkbox
                color="default"
                checked={eventsAlwaysTrigger}
                onChange={eventsAlwaysTriggerClicked}
              />
            }
          />
          <FormControlLabel
            label="Always Show Same Event"
            labelPlacement="start"
            control={
              <Checkbox
                color="default"
                checked={alwaysSelectSameEvent}
                onChange={alwaysSelectSameEventClicked}
              />
            }
          />
          {alwaysSelectSameEvent && (
            <FormControlLabel
              label="Same Event Shown:"
              labelPlacement="start"
              control={
                <Select
                  variant="outlined"
                  className={classes.dropDown}
                  value={eventAlwaysSelected}
                  onChange={sameEventSelected}
                >
                  {events.map(event => (
                    <MenuItem key={event.title} value={event.title}>
                      {event.title}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ActivePrimalEventsListFooter;
