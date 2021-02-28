import { Typography } from '@material-ui/core';
import React from 'react';
import Condition from '../../common/conditionDisplay.component';
import VM, { dist, time, willSave } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const icyDread = {
  table: 2,
  percentileMin: 78,
  percentileMax: 90,
  title: 'Icy Dread',
  createVariables: () => ({
    radius: makeConstantVariable(30, '30ft. radius spread'),
    save: makeConstantVariable(20, 'DC 20 Will Save', 'Will Save'),
    duration: makeVariable(6),
  }),
};

const IcyDreadEvent = ({ event }) => {
  const { save, duration, radius } = event.variables;
  return (
    <Typography>
      Icy dread cripples all creatures within a <VM v={radius} u={dist} />{' '}
      radius spread. Affected creatures must succeed at a{' '}
      <VM v={save} u={willSave} /> or become <Condition name="Staggered" /> for{' '}
      <VM v={duration} u={time} />. This is a mind-affecting fear effect.
    </Typography>
  );
};

export default IcyDreadEvent;
