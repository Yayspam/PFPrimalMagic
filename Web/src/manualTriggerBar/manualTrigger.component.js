import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { manualTriggerThunk } from '../state/manualTrigger/manualTriggerState';
import ManualTriggerContent from './manualTriggerContent.component';
import ManualTriggerHeader from './manualTriggerHeader.component';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  footer: {
    margin: 20
  }
});

const ManualTriggerBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onManualTriggerClicked = () => {
    dispatch(manualTriggerThunk());
  }

  return (
    <Box className={classes.container}>
      <ManualTriggerHeader />
      <ManualTriggerContent />
      <Box className={classes.footer}>
        <Button 
          variant='contained'
          onClick={onManualTriggerClicked}>
            Manually Trigger Event
        </Button>
      </Box>
    </Box>
  );
};

export default ManualTriggerBar