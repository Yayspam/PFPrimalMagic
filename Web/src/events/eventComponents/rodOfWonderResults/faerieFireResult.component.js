import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const faerieFire = {
  percentileMin: 6,
  percentileMax: 10,
  title: 'Faerie Fire',
  createVariables: () => ({
    duration: makeConstantVariable(10 * 10, 'Rod CL = 10; 10 minutes'),
    save: makeConstantVariable(15, 'DC 15 Will Save'),
  }),
};

const FaerieFireResult = ({ variables }) => {
  return (
    <Fragment>
      <Spell
        name="Faerie Fire"
        casterLevel={variables.casterLevel}
        duration={variables.duration}
      />{' '}
      surrounds the target.
    </Fragment>
  );
};

export default FaerieFireResult;
