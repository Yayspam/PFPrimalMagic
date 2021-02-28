import { Typography } from '@material-ui/core';
import React from 'react';
import VM, { dist, time } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const forgeOfCriticals = {
  table: 2,
  percentileMin: 1,
  percentileMax: 12,
  title: 'Forge of Criticals',
  createVariables: cr => ({
    radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
    duration: makeVariable(6),
  }),
};

const ForgeOfCriticalsEvent = ({ event }) => {
  const { radius, duration } = event.variables;
  return (
    <Typography>
      The sound of hammers ringing against anvils fills a{' '}
      <VM v={radius} u={dist} /> radius spread area for{' '}
      <VM v={duration} u={time} />. Creatures in this area{' '}
      <mark>automatically confirm critical hits</mark>.
    </Typography>
  );
};

export default ForgeOfCriticalsEvent;
