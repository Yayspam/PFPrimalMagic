import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import BarHeader from '../common/barHeader.component';
import { manualTriggerHeader } from '../common/colours';
import { manualTriggerThunk } from '../state/manualTrigger/manualTriggerState.thunk';
import CharacterSwitch from './characterSwitch.component';
import CrInput from './crInput.component';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
  },
  footer: {
    margin: 20,
    alignSelf: 'center',
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
      <CrInput />
      <CharacterSwitch />
      <Box className={classes.footer}>
        <Button variant="contained" onClick={onManualTriggerClicked}>
          Manually Trigger Event
        </Button>
      </Box>
    </Box>
  );
};

export default ManualTriggerBar;
