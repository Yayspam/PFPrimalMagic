import { Typography } from '@material-ui/core';
import React from 'react';
import VM, { energy, time } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const energeticTouch = {
  table: 2,
  percentileMin: 52,
  percentileMax: 64,
  title: 'Energetic Touch',
  createVariables: cr => ({
    energyType: makeVariable(4),
    duration: makeConstantVariable(3, 'dissapates in 3 rounds'),
    damage: makeVariable(6, cr, 0, 'CR x 1d6'),
  }),
};

const EnergeticTouchEvent = ({ event }) => {
  const { energyType, duration, damage } = event.variables;
  return (
    <Typography>
      The character that triggered this event glows fluorescent with{' '}
      <VM v={energyType} u={energy} />, and deals <VM v={damage} /> points of{' '}
      <VM v={energyType} u={energy} /> damage to the{' '}
      <mark>next creature it touches</mark> (touch attack required). This energy
      disappates in <VM v={duration} u={time} /> if not released.
    </Typography>
  );
};

export default EnergeticTouchEvent;
