import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import { fortSave } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const gustOfWind = {
  percentileMin: 16,
  percentileMax: 20,
  title: 'Gust of Wind',
  createVariables: () => ({
    duration: makeConstantVariable(1, '1 round'),
    save: makeConstantVariable(14, 'DC 15 Fortitude Save'),
  }),
};

const GustOfWindResult = ({ variables }) => {
  return (
    <Fragment>
      <Spell
        name="Gust of Wind"
        casterLevel={variables.casterLevel}
        save={variables.save}
        saveType={fortSave}
        duration={variables.duration}
      />
      , but at <mark>windstorm</mark> force
    </Fragment>
  );
};

export default GustOfWindResult;
