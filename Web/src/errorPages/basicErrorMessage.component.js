import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

const styles = {
  message: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 10,
    display: 'flex',
  },
  icon: {
    marginRight: 10,
  },
};

const BasicErrorMessage = ({ classes, children }) => (
  <div className={classes.message}>
    <ErrorIcon className={classes.icon} />
    <Typography variant="body1">{children}</Typography>
  </div>
);

export default withStyles(styles)(BasicErrorMessage);
