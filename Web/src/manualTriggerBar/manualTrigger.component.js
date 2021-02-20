import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { manualTriggerThunk } from '../state/manualTrigger/manualTriggerState';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  }
});

const ManualTriggerBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onManualTriggerClicked = () => {
    dispatch(manualTriggerThunk());
  }

  return (
    <div className={classes.content}>
      <Typography>Manual Trigger</Typography>
      <Button 
        variant='contained'
        onClick={onManualTriggerClicked}>
          Manually Trigger Event
      </Button>
    </div>
  );
};

export default ManualTriggerBar