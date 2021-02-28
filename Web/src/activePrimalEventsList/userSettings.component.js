import {
  Button,
  Checkbox,
  Dialog,
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
  rodOfWonderAlwaysSelectedSelector,
  resetOnlyResetsRoundsSelector,
  setAlwaysSelectSameEvent,
  setEventAlwaysSelected,
  setEventsAlwaysTrigger,
  setRodOfWonderAlwaysSelected,
  setResetOnlyResetsRounds,
  alwaysSelectSameRodResultSelector,
  setAlwaysSelectSameRodResult,
} from '../state/userSettings/userSetingsState';
import { events } from '../events/events';
import { userSettingsHeader } from '../common/colours';
import { wonderousMagic } from '../events/eventComponents/wonderousMagicEvent.component';
import { rodOfWonderResults } from '../events/eventComponents/rodOfWonderResults/rodOfWonderResults';

const useStyles = makeStyles({
  footerButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 550,
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
});

const UserSettings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const eventsAlwaysTrigger = useSelector(eventsAlwaysTriggerSelector);
  const alwaysSelectSameEvent = useSelector(alwaysSelectSameEventSelector);
  const eventAlwaysSelected = useSelector(eventAlwaysSelectedSelector);
  const eventIsRodOfWonder =
    alwaysSelectSameEvent && eventAlwaysSelected === wonderousMagic.title;
  const rodResultAlwaysSelected = useSelector(
    alwaysSelectSameRodResultSelector
  );
  const rodOfWonderAlwaysSelected = useSelector(
    rodOfWonderAlwaysSelectedSelector
  );
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

  const alwaysSelectSameRodResultClicked = event => {
    const value = event.target.checked;
    dispatch(setAlwaysSelectSameRodResult(value));
  };

  const sameRodOfWonderSelected = event => {
    const value = event.target.value;
    dispatch(setRodOfWonderAlwaysSelected(value));
  };

  const resetOnlyResetsRoundsClicked = event => {
    const value = event.target.checked;
    dispatch(setResetOnlyResetsRounds(value));
  };

  return (
    <Fragment>
      <Button
        className={classes.footerButton}
        variant="contained"
        onClick={onUserSettingsClicked}
      >
        Settings
      </Button>
      <Dialog open={dialogOpen} onClose={onClose}>
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
                  {events
                    .sort((a, b) => a.percentileMin - b.percentileMin)
                    .sort((a, b) => a.table - b.table)
                    .map(event => (
                      <MenuItem key={event.title} value={event.title}>
                        Table {event.table}, {event.percentileMin}-
                        {event.percentileMax}% - {event.title}
                      </MenuItem>
                    ))}
                </Select>
              }
            />
          )}
          {eventIsRodOfWonder && (
            <FormControlLabel
              label="Always Show Same Rod Of Wonder Result"
              labelPlacement="start"
              control={
                <Checkbox
                  color="default"
                  checked={rodResultAlwaysSelected}
                  onChange={alwaysSelectSameRodResultClicked}
                />
              }
            />
          )}
          {eventIsRodOfWonder && rodResultAlwaysSelected && (
            <FormControlLabel
              label="Same Rod Of Wonder Result Shown:"
              labelPlacement="start"
              control={
                <Select
                  variant="outlined"
                  className={classes.dropDown}
                  value={rodOfWonderAlwaysSelected}
                  onChange={sameRodOfWonderSelected}
                >
                  {rodOfWonderResults.map(result => (
                    <MenuItem key={result.title} value={result.title}>
                      {result.title}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default UserSettings;
