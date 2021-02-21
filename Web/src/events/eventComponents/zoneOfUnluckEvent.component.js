import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import VM, { dist, time } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const zoneOfUnluck = {
  percentileMin: 15,
  percentileMax: 18,
  title: 'Zone of Unluck',
  createVariables: cr => ({
    radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
    duration: makeConstantVariable(cr * 10 * 60, 'CR hours'),
  }),
};

const ZoneOfUnluckEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound, finalRound } = event;
  const { result: crVal } = cr;
  const { radius, duration } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip value={finalRound} />
      </Box>
      <Typography>
        A zone of unluck and a strange pale violet radience equivalent to
        candlelight fills a <VM v={radius} u={dist} /> radius for{' '}
        <VM v={duration} u={time} />. All <mark>d20 rolls</mark> made in the
        area must be <mark>rolled twice, taking the lower</mark> of the two
        rolls.
      </Typography>
    </Fragment>
  );
};

export default ZoneOfUnluckEvent;
