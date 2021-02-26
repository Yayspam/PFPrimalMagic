import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
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
    save: makeConstantVariable(cr + 10, 'Reflex Save DC = CR + 10'),
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
  const { cr, variables, percentileRoll, startRound, finalRound } = event;
  const { result: crVal } = cr;
  const { energyType, radius, damage, duration, save } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip value={finalRound} />
        <CustomChip label="Reflex Save" value={save?.result} />
      </Box>
      <Typography>
        A storm of <VM v={energyType} h={handleEnergyType} /> sweeps through a{' '}
        <VM v={radius} u={dist} /> radius spread. Each round, the storm inflicts{' '}
        <VM v={damage} /> points of damage; a <VM v={save} u={reflexSave} />{' '}
        halves the damage done. The storm persists for{' '}
        <VM v={duration} u={time} />
      </Typography>
    </Fragment>
  );
};

export default EnergyStormEvent;
