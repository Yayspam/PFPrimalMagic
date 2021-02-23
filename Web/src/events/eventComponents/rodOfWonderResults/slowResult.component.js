import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import { willSave } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const slow = {
  percentileMin: 1,
  percentileMax: 5,
  title: 'Slow',
  createVariables: () => ({
    duration: makeConstantVariable(10, 'Rod CL = 10; 10 minutes'),
    save: makeConstantVariable(15, 'DC 15 Will Save'),
  }),
};

const SlowResult = ({ variables }) => {
  return (
    <Fragment>
      Target affected by a{' '}
      <Spell
        name="Slow"
        casterLevel={variables.casterLevel}
        save={variables.save}
        saveType={willSave}
        duration={variables.duration}
      />
    </Fragment>
  );
};

export default SlowResult;
