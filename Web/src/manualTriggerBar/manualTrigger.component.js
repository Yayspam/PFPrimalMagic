import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import BarHeader from '../common/barHeader.component';
import { manualTriggerHeader } from '../common/colours';
import { manualTriggerThunk } from '../state/manualTrigger/manualTriggerState';
import ManualTriggerContent from './manualTriggerContent.component';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    margin: 20,
  },
});

const ManualTriggerBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onManualTriggerClicked = () => {
    dispatch(manualTriggerThunk());
  };

  return (
    <Box className={classes.container}>
      <BarHeader title="Manual Trigger" colour={manualTriggerHeader} />
      <ManualTriggerContent />
      <Box className={classes.footer}>
        <Button variant="contained" onClick={onManualTriggerClicked}>
          Manually Trigger Event
        </Button>
      </Box>
    </Box>
  );
};

export default ManualTriggerBar;
