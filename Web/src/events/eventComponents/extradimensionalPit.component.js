import { Typography } from '@material-ui/core';
import React from 'react';
import Spell from '../../common/spellDisplay.component';
import VM, { dist, reflexSave } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const extradimensionalPit = {
  percentileMin: 23,
  percentileMax: 26,
  title: 'Extradimensional Pit',
  createVariables: cr => ({
    duration: makeConstantVariable(cr + 1, '1 + 1 round/level'),
    depth: makeConstantVariable(cr * 10, 'CR x 10ft.'),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
    save: makeConstantVariable(
      cr + 10,
      'Reflex Save DC = CR + 10',
      'Reflex Save'
    ),
  }),
};

const ExtradimensionalPitEvent = ({ event }) => {
  const { depth, duration, casterLevel, save } = event.variables;
  return (
    <Typography>
      A circular pit opens under the feet of a random target. The pit creates an
      extradimensional space in the gorund, not an actual pit. The pit is{' '}
      <VM v={depth} u={dist} />, but otherwise functions as the{' '}
      <Spell
        name="Create Pit"
        casterLevel={casterLevel}
        save={save}
        saveType={reflexSave}
        duration={duration}
      />
    </Typography>
  );
};

export default ExtradimensionalPitEvent;
