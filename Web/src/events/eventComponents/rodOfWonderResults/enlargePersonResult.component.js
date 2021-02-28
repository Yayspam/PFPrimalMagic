import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import VM, { dist, fortSave } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const enlargePerson = {
  percentileMin: 50,
  percentileMax: 53,
  title: 'Enlarge Person',
  createVariables: () => ({
    duration: makeConstantVariable(10, '10 rounds'),
    distance: makeConstantVariable(60, 'within 60ft'),
    save: makeConstantVariable(13, 'DC 13 Fortitude Save', 'Fort Save'),
  }),
};

const EnlargePersonResult = ({ variables }) => {
  return (
    <Fragment>
      Target is affected by{' '}
      <Spell
        name="Enlarge Person"
        casterLevel={variables.casterLevel}
        save={variables.save}
        saveType={fortSave}
        duration={variables.duration}
      />{' '}
      if within <VM v={variables.distance} u={dist} /> of the rod
    </Fragment>
  );
};

export default EnlargePersonResult;
