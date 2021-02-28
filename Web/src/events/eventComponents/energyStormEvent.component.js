import { Typography } from '@material-ui/core';
import React from 'react';
import { objectToArrayString } from '../../common/utils';
import VM, {
  dist,
  reflexSave,
  time,
} from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const energyStorm = {
  percentileMin: 69,
  percentileMax: 74,
  title: 'Energy Storm',
  createVariables: cr => ({
    energyType: makeVariable(4, 1, 0, ''), // 1d4; 1=acid, 2=cold, 3=electricity, 4=fire
    radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
    damage: makeConstantVariable(cr * 2, 'CR x 2 damage'),
    duration: makeConstantVariable(cr, 'CR rounds'),
    save: makeConstantVariable(
      cr + 10,
      'Reflex Save DC = CR + 10',
      'Reflex Save'
    ),
  }),
};

const energyTypes = {
  1: 'acid',
  2: 'cold',
  3: 'electricity',
  4: 'fire',
};

const handleEnergyType = {
  getValues: variable => {
    return {
      value: energyTypes[variable.result],
      unit: 'energy',
    };
  },
  getToolTip: variable => {
    return `1d4 [${variable.result}]: ${objectToArrayString(energyTypes)}`;
  },
};

const EnergyStormEvent = ({ event }) => {
  const { energyType, radius, damage, duration, save } = event.variables;
  return (
    <Typography>
      A storm of <VM v={energyType} h={handleEnergyType} /> sweeps through a{' '}
      <VM v={radius} u={dist} /> radius spread. Each round, the storm inflicts{' '}
      <VM v={damage} /> points of damage; a <VM v={save} u={reflexSave} />{' '}
      halves the damage done. The storm persists for{' '}
      <VM v={duration} u={time} />
    </Typography>
  );
};

export default EnergyStormEvent;
