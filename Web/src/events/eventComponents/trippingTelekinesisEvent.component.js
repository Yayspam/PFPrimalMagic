import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import VM, { dist } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const trippingTelekinesis = {
  percentileMin: 75,
  percentileMax: 78,
  title: 'Tripping Telekinesis',
  createVariables: cr => ({
    duration: makeConstantVariable(0),
    radius: makeConstantVariable(cr * 10, 'CR x 10ft.'),
    cmb: makeConstantVariable(cr + 10, 'CMB = CR + 10'),
  }),
};

const TrippingTelekinesisEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound } = event;
  const { result: crVal } = cr;
  const { radius, cmb } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip />
      </Box>
      <Typography>
        Strange telekinetic forces rip through the area, attempting to trip all
        creatures in a <VM v={radius} u={dist} /> radius. The event makes a{' '}
        <mark>trip combat maneuver</mark> check against all available targets,
        using a CMB of +<VM v={cmb} />. Any creature tripped by the event has
        its equipment reorganized and tangled by the mischievous telekinesis.
        Until a creature takes a <mark>minute to reogranise</mark> its
        belongings, <mark>retrieving a stowed item is a full-round action</mark>
      </Typography>
    </Fragment>
  );
};

export default TrippingTelekinesisEvent;
