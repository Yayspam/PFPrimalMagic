import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import VM, { dist, time } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';
import EventCardChips from '../eventCardChips.component';

export const rainOfSmallObjects = {
  percentileMin: 27,
  percentileMax: 32,
  title: 'Rain of Small Objects',
  createVariables: cr => ({
    radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
    duration: makeConstantVariable(cr, 'CR rounds'),
  }),
};

const RainOfSmallObjectsEvent = ({ event }) => {
  const { radius, duration } = event.variables;
  return (
    <Fragment>
      <EventCardChips event={event} />
      <Typography>
        A rain of small objects (anything from flowers to rotten fruit) pelts an
        area with a <VM v={radius} u={dist} /> radius for{' '}
        <VM v={duration} u={time} />. This strange hail is not harmful, but
        duing this time all creatures in the area{' '}
        <mark>gain concealment (20% miss chance)</mark> and must make{' '}
        <mark>concentration checks (DC 15 + SL)</mark> to cast spells.
      </Typography>
    </Fragment>
  );
};

export default RainOfSmallObjectsEvent;
