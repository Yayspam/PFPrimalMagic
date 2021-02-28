import { Typography } from '@material-ui/core';
import React from 'react';
import Spell from '../../common/spellDisplay.component';
import VM, { dist } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const utterDarkness = {
  table: 1,
  percentileMin: 45,
  percentileMax: 48,
  title: 'Utter Darkness',
  createVariables: cr => ({
    duration: makeConstantVariable(cr * 10 * 10, '10 min./level'),
    radius: makeConstantVariable(cr * 10, 'CR x 10ft.'),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
  }),
};

const UtterDarknessEvent = ({ event }) => {
  const { casterLevel, radius } = event.variables;
  return (
    <Typography>
      A <VM v={radius} u={dist} /> radius area becomes utterly dark, as if from
      a <Spell name="Deeper Darkness" casterLevel={casterLevel} />
    </Typography>
  );
};

export default UtterDarknessEvent;
