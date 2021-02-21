import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import VM from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const elementalUprising = {
  percentileMin: 49,
  percentileMax: 54,
  title: 'Elemental Uprising',
  createVariables: () => ({
    duration: makeConstantVariable(0),
    elementalCount: makeVariable(6), // new - elemental count, need to figure out how this works to make the CR total work
  }),
};

const handleElementals = {
  getValues: variable => {
    return {
      value: variable.result,
      unit: 'terrain-appropriate elementals',
    };
  },
};

const ElementalUprisingEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound } = event;
  const { result: crVal } = cr;
  const { elementalCount } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <CustomChip label="Instantaneous" />
      </Box>
      <Typography>
        The enviroment suddenly springs to life and attacks all{' '}
        <mark>non-elemental creatures</mark> in the immediate area. This is an
        encounter with <VM v={elementalCount} h={handleElementals} /> drawn from
        the surroundings with mix of elementals that equals the CR of the primal
        magic event.
      </Typography>
    </Fragment>
  );
};

export default ElementalUprisingEvent;
