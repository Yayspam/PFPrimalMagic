import React from 'react';
import { Avatar, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { currentRoundSelector } from '../state/rounds/roundsState';
import { resetAll } from '../state/app/primalMagic.reducer';
import { primalStormHeader } from '../common/colours';
import PrimalStormContent from './primalStormContent.component';

const useStyles = makeStyles({
  content: {
    height: '100%',
    width: '100%',
  },
  roundsContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  resetButton: {
    width: 130,
    height: 30,
    margin: 20,
  },
  currentRoundDisplay: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  roundAvatar: {
    backgroundColor: primalStormHeader,
    height: 30,
    width: 30,
    marginLeft: 10,
  },
});

const RoundsContent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentRound = useSelector(currentRoundSelector);

  const onResetClicked = () => {
    dispatch(resetAll());
  };

  return (
    <Box className={classes.content}>
      <Box className={classes.roundsContent}>
        <Box className={classes.currentRoundDisplay}>
          <Typography>Current Round: </Typography>
          <Avatar className={classes.roundAvatar}>{currentRound}</Avatar>
        </Box>
        <Button
          className={classes.resetButton}
          variant="contained"
          onClick={onResetClicked}
        >
          Reset
        </Button>
      </Box>
      <PrimalStormContent />
    </Box>
  );
};

export default RoundsContent;
