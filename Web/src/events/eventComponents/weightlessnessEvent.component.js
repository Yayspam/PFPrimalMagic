import { Typography } from '@material-ui/core';
import React from 'react';
import VM, {
  dist,
  reflexSave,
  time,
} from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const weightlessness = {
  table: 2,
  percentileMin: 65,
  percentileMax: 77,
  title: 'Weightlessness',
  createVariables: () => ({
    save: makeConstantVariable(20, 'DC 20 Reflex Save', 'Reflex Save'),
    duration: makeVariable(6),
    rate: makeConstantVariable(10, '10ft. per round'),
  }),
};

const WeightlessnessEvent = ({ event }) => {
  const { save, duration, rate } = event.variables;
  return (
    <Typography>
      A high-pitched ringing accompanies a feeling of weightlessness, and{' '}
      <mark>
        any creature that would have been targeted by the effect that triggered
        this Primal Magic event
      </mark>{' '}
      must succeed at a <VM v={save} u={reflexSave} /> or float straight up at a
      rate of <VM v={rate} u={dist} /> per round for{' '}
      <VM v={duration} u={time} />. Creatures may attempt to grab hold of nearby
      objects to slow or halt their ascent at the GM&apos;s discretion.
    </Typography>
  );
};

export default WeightlessnessEvent;
