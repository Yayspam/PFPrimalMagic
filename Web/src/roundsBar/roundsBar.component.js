import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import BarHeader from '../common/barHeader.component';
import { primalStormHeader } from '../common/colours';
import { advanceRoundThunk } from '../state/rounds/roundsState';
import RoundsContent from './roundsContent.component';

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

const RoundsBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onNextRoundClicked = () => {
    dispatch(advanceRoundThunk());
  };

  return (
    <Box className={classes.container}>
      <BarHeader title="Rounds & Primal Storm" colour={primalStormHeader} />
      <RoundsContent />
      <Box className={classes.footer}>
        <Button variant="contained" onClick={onNextRoundClicked}>
          Next Round
        </Button>
      </Box>
    </Box>
  );
};

export default RoundsBar;
