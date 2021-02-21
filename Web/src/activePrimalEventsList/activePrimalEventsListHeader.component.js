import React from 'react';
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { activePrimalEventsSelector } from '../state/activePrimalEvents/activePrimalEventsState';
import {
  allExpandedSelector,
  toggleAllExpandedThunk,
} from '../state/eventExpansionState/eventExpansionState';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
  header: {
    paddingTop: 4,
    paddingBottom: 5,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#3f51b5',
    color: 'white',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitle: {
    marginLeft: 5,
    marginRight: 5,
  },
  expandButton: {
    color: 'white',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  headerText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const ActivePrimalEventsListHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const activePrimalEvents = useSelector(activePrimalEventsSelector);
  const allExpanded = useSelector(allExpandedSelector);

  const toggleAllClicked = () => {
    dispatch(toggleAllExpandedThunk());
  };

  const buildExpandIcon = expanded => {
    if (expanded === undefined) {
      return <RemoveIcon />;
    }

    if (!expanded) {
      return <ExpandLessIcon />;
    }

    return <ExpandMoreIcon />;
  };

  const buildExpandButton = expanded => {
    return (
      <IconButton
        disableRipple
        className={classes.expandButton}
        onClick={toggleAllClicked}
      >
        {buildExpandIcon(expanded)}
      </IconButton>
    );
  };

  return (
    <Box className={classes.header}>
      <Box className={classes.headerText}>
        {buildExpandButton(allExpanded)}
        <Typography variant="h4">Active Primal Events</Typography>
        {buildExpandButton(allExpanded)}
      </Box>
      <Box className={classes.subtitleContainer}>
        <Typography className={classes.subtitle}>
          Active Primal Magic Events: {activePrimalEvents.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default ActivePrimalEventsListHeader;
