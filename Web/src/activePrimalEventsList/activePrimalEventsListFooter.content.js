import { Box, Button, makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import FlowchartDisplay from './flowchartDisplay.component';
import UserSettings from './userSettings.component';

const useStyles = makeStyles({
  footer: {
    margin: 20,
  },
  footerButton: {
    marginLeft: 10,
    marginRight: 10,
  },
});

const ActivePrimalEventsListFooter = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.footer}>
        <UserSettings />
        <FlowchartDisplay />
        <Button
          className={classes.footerButton}
          component={NavLink}
          variant="contained"
          to="/"
        >
          Home
        </Button>
      </Box>
    </Fragment>
  );
};

export default ActivePrimalEventsListFooter;
