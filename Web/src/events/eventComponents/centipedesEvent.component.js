import { Typography } from '@material-ui/core';
import React from 'react';
import VM from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const centipedes = {
  percentileMin: 7,
  percentileMax: 10,
  title: 'Centipedes',
  createVariables: () => ({
    duration: makeConstantVariable(0),
    centipedeCount: makeVariable(6), // new - centipede count, need to figure out how this works to make the CR total work
  }),
};

const handleCentipedes = {
  getValues: variable => {
    return {
      value: variable.result,
      unit: 'strangely coloured centipedes',
    };
  },
};

const CentipedesEvent = ({ event }) => {
  const { centipedeCount } = event.variables;
  return (
    <Typography>
      <VM v={centipedeCount} h={handleCentipedes} /> appear in the area. These
      centipedes <mark>ignore non-spellcasters</mark> and attack only creatures
      capable of casting spells or using spell-like abilities. This encounter
      should be a mix of centipedes that equals the CR of the primal magic
      event. The corpses of any slaind centipedes pivot their heads in the
      direction of the Pit of Gormuz.
    </Typography>
  );
};

export default CentipedesEvent;
