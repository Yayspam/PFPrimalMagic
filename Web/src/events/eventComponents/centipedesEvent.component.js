import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import VM from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const centipedes = {
  percentileMin: 7,
  percentileMax: 10,
  title: 'Centipedes',
  createVariables: () => ({
    duration: makeConstantVariable(0),
    centipedeCount: makeVariable(6), // new - centipede count, need to figure out how this works to make the CR total work
  }),
};

const CentipedesEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound } = event;
  const { result: crVal } = cr;
  const { centipedeCount } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <CustomChip label="Instantaneous" />
      </Box>
      <Typography>
        <VM v={centipedeCount} /> strangely coloured centipedes appear in the
        area. These centipedes <mark>ignore non-spellcasters</mark> and attack
        only creatures capable of casting spells or using spell-like abilities.
        This encounter should be a mix of centipedes that equals the CR of the
        primal magic event. The corpses of any slaind centipedes pivot their
        heads in the direction of the Pit of Gormuz.
      </Typography>
    </Fragment>
  );
};

export default CentipedesEvent;
