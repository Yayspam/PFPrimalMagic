import { Typography } from '@material-ui/core';
import React from 'react';
import Spell from '../../common/spellDisplay.component';
import VM, { willSave } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const heal = {
  percentileMin: 33,
  percentileMax: 38,
  title: 'Heal',
  createVariables: cr => ({
    duration: makeConstantVariable(0),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
    creaturesAffected: makeVariable(cr, 1, 0, '# Creatures <= CR in total'),
    save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10', 'Will Save'),
  }),
};

const HealEvent = ({ event }) => {
  const { casterLevel, creaturesAffected, save } = event.variables;
  return (
    <Typography>
      Positive energy affects <VM v={creaturesAffected} /> nearby creatures.
      These creatures are affected by a{' '}
      <Spell
        name="Heal"
        casterLevel={casterLevel}
        save={save}
        saveType={willSave}
      />
    </Typography>
  );
};

export default HealEvent;
