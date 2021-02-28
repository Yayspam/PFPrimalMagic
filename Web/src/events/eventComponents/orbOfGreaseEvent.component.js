import { Typography } from '@material-ui/core';
import React from 'react';
import VM, { dist, time } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const orbOfGrease = {
  table: 2,
  percentileMin: 97,
  percentileMax: 100,
  title: 'Orb of Grease',
  createVariables: cr => ({
    duration: makeVariable(4),
    radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
  }),
};

const OrbOfGreaseEvent = ({ event }) => {
  const { radius, duration } = event.variables;
  return (
    <Typography>
      An orb of grease explodes and covers all creatures in a{' '}
      <VM v={radius} u={dist} /> radius burst,{' '}
      <mark>increasing all affected creatures&apos; CMD by 10</mark> for{' '}
      <VM v={duration} u={time} />
    </Typography>
  );
};

export default OrbOfGreaseEvent;
