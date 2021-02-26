import React, { Fragment } from 'react';
import VM, { dist, time } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const leaves = {
  percentileMin: 85,
  percentileMax: 87,
  title: 'Leaves',
  createVariables: () => ({
    distance: makeConstantVariable(60, '60ft.'),
    duration: makeConstantVariable(24 * 60 * 10, '1 day'),
  }),
};

const LeavesResult = ({ variables }) => {
  return (
    <Fragment>
      Leaves grows from the target&apos;s body, if the target is within{' '}
      <VM v={variables.distance} u={dist} />. These last for{' '}
      <VM v={variables.duration} u={time} />.
    </Fragment>
  );
};

export default LeavesResult;
