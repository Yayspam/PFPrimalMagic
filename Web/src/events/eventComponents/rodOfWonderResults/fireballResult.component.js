import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import VM, { dist, reflexSave } from '../../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';

export const fireball = {
  percentileMin: 70,
  percentileMax: 79,
  title: 'Fireball',
  createVariables: () => ({
    save: makeConstantVariable(15, 'DC 15 Reflex Save'),
    distance: makeConstantVariable(100, '100ft straight ahead'),
    damage: makeVariable(6, 6),
  }),
};

const FireballResult = ({ variables }) => {
  return (
    <Fragment>
      The wielder fires a{' '}
      <Spell
        name="Fireball"
        casterLevel={variables.casterLevel}
        save={variables.save}
        saveType={reflexSave}
      />{' '}
      straight ahead up to <VM v={variables.distance} u={dist} /> dealing{' '}
      <VM v={variables.damage} /> points of damage.
    </Fragment>
  );
};

export default FireballResult;
