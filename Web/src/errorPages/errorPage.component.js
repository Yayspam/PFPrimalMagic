import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '10vw',
    height: '10vw',
    color: theme.palette.primary.main,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: '10vw',
    color: theme.palette.primary.main,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    padding: 15,
    maxWidth: 600,
    textAlign: 'center',
  },
});

const ErrorPage = ({ classes, children, errorTitle }) => (
  <div>
    <div className={classes.titleContainer}>
      <Typography className={classes.titleText}>{errorTitle}</Typography>
    </div>
    <div className={classes.container}>{children}</div>
  </div>
);

export default withStyles(styles)(ErrorPage);
