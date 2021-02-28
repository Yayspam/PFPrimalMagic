import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import VM, { dist, fortSave } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const stinkingCloud = {
  percentileMin: 26,
  percentileMax: 30,
  title: 'Stinking Cloud',
  createVariables: () => ({
    duration: makeConstantVariable(10, 'Rod CL = 10; 10 rounds'),
    distance: makeConstantVariable(30, '30-foot range'),
    save: makeConstantVariable(15, 'DC 15 Fortitude Save', 'Fort Save'),
  }),
};

const StinkingCloudResult = ({ variables }) => {
  return (
    <Fragment>
      <Spell
        name="Stinking Cloud"
        casterLevel={variables.casterLevel}
        save={variables.save}
        saveType={fortSave}
        duration={variables.duration}
      />{' '}
      appears at a <VM v={variables.distance} u={dist} /> range.
    </Fragment>
  );
};

export default StinkingCloudResult;
