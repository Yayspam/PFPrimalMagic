import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import VM, { time } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const catchyMusic = {
  percentileMin: 11,
  percentileMax: 14,
  title: 'Catchy Music',
  createVariables: cr => ({
    duration: makeConstantVariable(cr * 10, 'CR mins'),
    chantType: makeVariable(4), // 1d4; 1=Ulfen battle chants, 2=Chelish opera arias, 3=Desnan Prayers, 4=Vudrani monastic chants
  }),
};

const battleChants = {
  1: 'Ulfen battle chants',
  2: 'Chelish opera arias',
  3: 'Desnan prayers',
  4: 'Vudrani monastic chants',
};

const handleChant = {
  getValues: variable => {
    return {
      value: battleChants[variable.result],
      unit: undefined,
    };
  },
  getToolTip: variable => {
    return `1d4 [${variable.result}]: 1=${battleChants[1]}; 2=${battleChants[2]}; 3=${battleChants[3]}; 4=${battleChants[4]}`;
  },
};

const CatchyMusicEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound, finalRound } = event;
  const { result: crVal } = cr;
  const { duration, chantType } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip value={finalRound} />
      </Box>
      <Typography>
        Strange music fills the air for <VM v={duration} u={time} />. The music
        reminds you of <VM v={chantType} h={handleChant} />. Those who hear the
        music are instilled with a strong urge to sing or dance along. A
        creature who does so gains a{' '}
        <mark>+2 morale bonus on attack rolls and saving throws</mark> for the
        duration of the music. heads in the direction of the Pit of Gormuz.
      </Typography>
    </Fragment>
  );
};

export default CatchyMusicEvent;
