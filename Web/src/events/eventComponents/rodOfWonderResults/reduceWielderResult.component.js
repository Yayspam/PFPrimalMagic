import React, { Fragment } from 'react';
import VM, { time } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const reduceWielder = {
  percentileMin: 66,
  percentileMax: 69,
  title: 'Reduce Wielder',
  createVariables: () => ({
    duration: makeConstantVariable(24 * 60 * 10, '1 day'),
  }),
};

const ReduceWielderResult = ({ variables }) => {
  return (
    <Fragment>
      Reduce the wielder two size categories <mark>(no save)</mark> for{' '}
      <VM v={variables.duration} u={time} />.
    </Fragment>
  );
};

export default ReduceWielderResult;
