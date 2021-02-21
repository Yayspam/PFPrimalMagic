import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  alwaysSelectSameEventSelector,
  eventAlwaysSelectedSelector,
  eventsAlwaysTriggerSelector,
  setAlwaysSelectSameEvent,
  seteventAlwaysSelected,
  setEventsAlwaysTrigger,
} from '../state/userSettings/userSetingsState';
import { events } from '../events/events';

const useStyles = makeStyles({
  footer: {
    margin: 20,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 200,
    minWidth: 450,
  },
  dialogHeader: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#ff9800',
    color: 'white',
    width: '100%',
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
    dispatch(seteventAlwaysSelected(value));
  };

  return (
    <Fragment>
      <Box className={classes.footer}>
        <Button variant="contained" onClick={onUserSettingsClicked}>
          Settings
        </Button>
      </Box>
      <Dialog open={dialogOpen}>
        <Box className={classes.dialogContent}>
          <Typography className={classes.dialogHeader} variant="h5">
            User Settings
          </Typography>
          <Divider className={classes.divider} />
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
        </Box>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Dialog>
    </Fragment>
  );
};

export default ActivePrimalEventsListFooter;
