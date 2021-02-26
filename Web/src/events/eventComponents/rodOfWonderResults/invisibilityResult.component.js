import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const invisibility = {
  percentileMin: 80,
  percentileMax: 84,
  title: 'Invisibility',
  createVariables: () => ({
    duration: makeConstantVariable(10 * 10, '10 minutes'),
  }),
};

const InvisibilityResult = ({ variables }) => {
  return (
    <Fragment>
      The wielder turns invisible as per the{' '}
      <Spell
        name="Invisibility"
        casterLevel={variables.casterLevel}
        duration={variables.duration}
      />
      .
    </Fragment>
  );
};

export default InvisibilityResult;
