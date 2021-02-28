import { Typography } from '@material-ui/core';
import React from 'react';
import Spell from '../../common/spellDisplay.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const blackTentacles = {
  table: 2,
  percentileMin: 13,
  percentileMax: 25,
  title: 'Black Tentacles',
  createVariables: cr => ({
    duration: makeConstantVariable(cr, 'CL = CR'),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
  }),
};

const BlackTentaclesEvent = ({ event }) => {
  const { duration, casterLevel } = event.variables;
  return (
    <Typography>
      The ground lurches to life and attacks creatures in the area as though
      with the{' '}
      <Spell
        name="Black Tentacles"
        casterLevel={casterLevel}
        duration={duration}
      />
    </Typography>
  );
};

export default BlackTentaclesEvent;
