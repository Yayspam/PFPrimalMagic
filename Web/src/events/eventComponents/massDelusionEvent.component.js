import { Typography } from '@material-ui/core';
import React from 'react';
import Condition from '../../common/conditionDisplay.component';
import VM, { willSave } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const massDelusion = {
  table: 1,
  percentileMin: 63,
  percentileMax: 68,
  title: 'Mass Delusion',
  createVariables: cr => ({
    duration: makeConstantVariable(0),
    creaturesAffected: makeVariable(cr, 1, 0, '# Creatures <= CR in total'),
    save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10', 'Will Save'),
  }),
};

const MassDelusionEvent = ({ event }) => {
  const { variables } = event;
  const { creaturesAffected, save } = variables;
  return (
    <Typography>
      <VM v={creaturesAffected} /> creatures become{' '}
      <Condition name="Confused" /> unless they succeed at a{' '}
      <VM v={save} u={willSave} />. For each affected creature, this effect{' '}
      <mark>persists until</mark> that creature&apos;s confusion effect results
      in <mark>&quot;act normally&quot;</mark>, at which point the effect ends
      for that creature. This is a mind-affecting effect. mind-affecting effect.
    </Typography>
  );
};

export default MassDelusionEvent;
