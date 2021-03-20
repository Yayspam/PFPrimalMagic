import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  manualTriggerHeader,
  manualTriggerHeaderEmphasis,
  primalStormHeader,
  primalStormHeaderEmphasis,
} from '../common/colours';
import {
  closeTriggerDialog,
  manualTriggerType,
  toggleTriggerDialogPrimalEventExpanded,
  triggerDialogStateSelector,
} from '../state/triggerDialog/triggerDialogState';
import { eventsAlwaysTriggerSelector } from '../state/userSettings/userSetingsState';
import EventCard from '../events/eventCard.component';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import { blue } from '@material-ui/core/colors';
import { getEventCardContent } from '../events/events';
import {
  confirmDialogPrimalEventThunk,
  rerollDialogPrimalEventThunk,
  rerollDialogPrimalEventVariablesThunk,
} from '../state/triggerDialog/triggerDialogState.thunk';
import VM from '../common/variableMark.component';
import {
  calculateIncrementAndMax,
  primalStormStateSelector,
} from '../state/primalStorm/primalStormState';

const getBackgroundColour = isManualTrigger =>
  isManualTrigger ? manualTriggerHeader : primalStormHeader;

const getEmphasisColour = isManualTrigger =>
  isManualTrigger ? manualTriggerHeaderEmphasis : primalStormHeaderEmphasis;

const useStyles = makeStyles({
  dialogHeader: {
    backgroundColor: ({ isManualTrigger }) =>
      getBackgroundColour(isManualTrigger),
    color: 'white',
    textAlign: 'center',
  },
  eventOccurrance: {
    fontWeight: 'bold',
  },
  cardHeader: {
    backgroundColor: ({ isManualTrigger }) =>
      getBackgroundColour(isManualTrigger),
    color: 'white',
    paddingTop: 3,
    paddingBottom: 3,
  },
  reRollButton: {
    margin: 5,
    color: blue[500],
    justifySelf: 'center',
  },
  reRollContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: ({ isManualTrigger }) =>
      getBackgroundColour(isManualTrigger),
    color: 'white',
    '&:hover': {
      backgroundColor: ({ isManualTrigger }) =>
        getEmphasisColour(isManualTrigger),
    },
  },
});

const getChanceMessage = (eventOccurred, primalStormState, threshold) => {
  const { suppressed, leftArea, currentChance } = primalStormState;
  const { increment, max } = calculateIncrementAndMax(suppressed, leftArea);
  const isCapped = currentChance >= max && threshold >= max;

  if (eventOccurred) {
    if (leftArea) {
      return `Chance next round reset to ${currentChance}% (left area)`;
    }

    return `Chance next round reset to ${currentChance}%${
      suppressed ? ' (suppressed)' : ''
    }`;
  } else {
    if (leftArea) {
      return `Chance next round remains at ${currentChance}% (left area)`;
    }

    if (isCapped) {
      return `Chance next round capped at ${max}%${
        suppressed ? ' (suppressed)' : ''
      }`;
    }

    return `Chance next round increased by ${increment}%${
      suppressed ? ' (suppressed)' : ''
    } to ${currentChance}%`;
  }
};

const PrimalEventDialog = () => {
  const dispatch = useDispatch();
  const {
    percentile,
    threshold,
    triggerType,
    open,
    currentEvent,
  } = useSelector(triggerDialogStateSelector);
  const isManualTrigger = triggerType === manualTriggerType;
  const classes = useStyles({ isManualTrigger });
  const eventsAlwaysTriggered = useSelector(eventsAlwaysTriggerSelector);

  const eventOccurred = percentile <= threshold;
  const showEventContent = eventOccurred || eventsAlwaysTriggered;
  let eventOccuranceMessage = `Event did not occur (${percentile}%, <=${threshold}% required)`;

  if (eventOccurred) {
    eventOccuranceMessage = `Event occurred (${percentile}%, <=${threshold}% achieved)`;
  }

  const primalStormState = useSelector(primalStormStateSelector);
  const chanceMessage = getChanceMessage(
    eventOccurred,
    primalStormState,
    threshold
  );

  const onAcceptClicked = () => {
    dispatch(confirmDialogPrimalEventThunk());
  };

  const onCloseDialogClicked = () => {
    dispatch(closeTriggerDialog());
  };

  const onReRollEventClicked = () => {
    dispatch(rerollDialogPrimalEventThunk());
  };

  const onReRollEventVariablesClicked = () => {
    dispatch(rerollDialogPrimalEventVariablesThunk());
  };

  const onExpandToggleClicked = () => {
    dispatch(toggleTriggerDialogPrimalEventExpanded());
  };

  if (!open) {
    return null;
  }

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={
        eventOccurred || eventsAlwaysTriggered
          ? undefined
          : onCloseDialogClicked
      }
    >
      <DialogTitle className={classes.dialogHeader}>
        {isManualTrigger ? 'Manual' : 'Storm'} Primal Event Trigger
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.eventOccurrance}>
          {eventOccuranceMessage}
        </Typography>
        {isManualTrigger && !eventOccurred && !eventsAlwaysTriggered && (
          <Typography variant="caption">
            [TRIGGERING MAGIC HAPPENS AS NORMAL]
          </Typography>
        )}
        {!eventOccurred && eventsAlwaysTriggered && (
          <Typography variant="caption">
            [BUT WAS FORCED TO OCCUR BY USER SETTINGS]
          </Typography>
        )}
        {!isManualTrigger && (
          <Typography className={classes.eventOccurrance}>
            {chanceMessage}
          </Typography>
        )}
        {showEventContent && (
          <Fragment>
            <Typography>
              CR: <VM v={currentEvent.cr} />
            </Typography>
          </Fragment>
        )}
        {showEventContent && (
          <Fragment>
            <Box className={classes.reRollContainer}>
              <Button
                className={classes.reRollButton}
                startIcon={<SyncIcon />}
                onClick={onReRollEventClicked}
              >
                Re-Roll (Event)
              </Button>
              <Button
                className={classes.reRollButton}
                startIcon={<ReplayIcon />}
                onClick={onReRollEventVariablesClicked}
              >
                Re-Roll (Event Variables)
              </Button>
            </Box>
            <EventCard
              event={currentEvent}
              titleColour={
                isManualTrigger ? manualTriggerHeader : primalStormHeader
              }
              onExpandToggleClicked={onExpandToggleClicked}
              getEventCardContent={getEventCardContent}
            />
          </Fragment>
        )}
      </DialogContent>
      <DialogActions>
        {showEventContent && (
          <Button
            className={classes.confirmButton}
            variant="contained"
            onClick={onAcceptClicked}
          >
            Trigger Event
          </Button>
        )}
        <Button variant="contained" onClick={onCloseDialogClicked}>
          {showEventContent ? 'Do Not Trigger' : 'Phew...'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrimalEventDialog;
