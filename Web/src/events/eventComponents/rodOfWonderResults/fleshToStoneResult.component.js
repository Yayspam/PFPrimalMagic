import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import VM, { dist, fortSave } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const fleshToStone = {
  percentileMin: 98,
  percentileMax: 100,
  title: 'Flesh to Stone',
  createVariables: () => ({
    distance: makeConstantVariable(60, '60ft. away'),
    save: makeConstantVariable(18, 'DC 18 Fortitude'),
  }),
};

const FleshToStoneResult = ({ variables }) => {
  return (
    <Fragment>
      The target is affected by a{' '}
      <Spell
        name="Flesh to Stone"
        casterLevel={variables.casterLevel}
        save={variables.save}
        saveType={fortSave}
      />{' '}
      (or stone to flesh, if the target is already stone) as long as they are
      within <VM v={variables.distance} u={dist} /> of the wielder.
    </Fragment>
  );
};

export default FleshToStoneResult;
