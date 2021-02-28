import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import VM, { reflexSave } from '../../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';

export const lightningBolt = {
  percentileMin: 37,
  percentileMax: 46,
  title: 'Lightning Bolt',
  createVariables: () => ({
    length: makeConstantVariable(70, '70ft. long'),
    damage: makeVariable(6, 6),
    save: makeConstantVariable(15, 'DC 15 Reflex Save', 'Reflex Save'),
  }),
};

const LightningBoltEvent = ({ variables }) => {
  return (
    <Fragment>
      <Spell
        name="Lightning Bolt"
        casterLevel={variables.casterLevel}
        save={variables.save}
        saveType={reflexSave}
      />{' '}
      dealing <VM v={variables.damage} /> damage
    </Fragment>
  );
};

export default LightningBoltEvent;
