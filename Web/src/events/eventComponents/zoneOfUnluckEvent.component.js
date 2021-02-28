import { Typography } from '@material-ui/core';
import React from 'react';
import VM, { dist, time } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const zoneOfUnluck = {
  table: 1,
  percentileMin: 15,
  percentileMax: 18,
  title: 'Zone of Unluck',
  createVariables: cr => ({
    radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
    duration: makeConstantVariable(cr * 10 * 60, 'CR hours'),
  }),
};

const ZoneOfUnluckEvent = ({ event }) => {
  const { radius, duration } = event.variables;
  return (
    <Typography>
      A zone of unluck and a strange pale violet radience equivalent to
      candlelight fills a <VM v={radius} u={dist} /> radius for{' '}
      <VM v={duration} u={time} />. All <mark>d20 rolls</mark> made in the must
      be <mark>rolled twice, taking the lower</mark> of the two rolls.
    </Typography>
  );
};

export default ZoneOfUnluckEvent;
