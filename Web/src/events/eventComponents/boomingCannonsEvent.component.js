import { Typography } from '@material-ui/core';
import React from 'react';
import VM, { dist, time } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const boomingCannons = {
  table: 2,
  percentileMin: 26,
  percentileMax: 38,
  title: 'Booming Cannons',
  createVariables: cr => ({
    radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
    duration: makeVariable(6),
    misfire: makeVariable(3),
  }),
};

const BoomingCannonsEvent = ({ event }) => {
  const { radius, duration, misfire } = event.variables;
  return (
    <Typography>
      The sound of booming cannons fills the air, and all <mark>firearms</mark>{' '}
      in a <VM v={radius} u={dist} /> radius spread{' '}
      <mark>increase their misfire chance</mark> by <VM v={misfire} /> for{' '}
      <VM v={duration} u={time} />
    </Typography>
  );
};

export default BoomingCannonsEvent;
