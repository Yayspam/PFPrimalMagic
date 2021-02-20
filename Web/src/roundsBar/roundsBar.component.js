import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetAll } from '../state/app/primalMagic.reducer';
import { advanceRoundThunk, currentRoundSelector } from '../state/rounds/roundsState';

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

const RoundsBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const currentRound = useSelector(currentRoundSelector);

  const onResetClicked = () => {
    dispatch(resetAll());
  };

  const onNextRoundClicked = () => {
    dispatch(advanceRoundThunk());
  };

  return (
    <div className={classes.content}>
      <Typography>Rounds and Primal Storm</Typography>
      <Button variant='contained' onClick={onResetClicked}>
        Reset
      </Button>
      <Typography>Current Round: {currentRound}</Typography>
      <Button variant='contained' onClick={onNextRoundClicked}>
        Next Round
      </Button>
    </div>
  );
};

export default RoundsBar