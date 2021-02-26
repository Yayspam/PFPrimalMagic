import React, { Fragment } from 'react';
import VM, { dist } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const grass = {
  percentileMin: 59,
  percentileMax: 62,
  title: 'Grass',
  createVariables: () => ({
    area: makeConstantVariable(160, '160ft. square'),
    existingGrowthAmount: makeConstantVariable(10, '10x normal size'),
  }),
};

const GrassResult = ({ variables }) => {
  return (
    <Fragment>
      Grass grows in a <VM v={variables.area} u={dist} /> square immediately in
      front of the rod, or any existing grass there grows to{' '}
      <VM v={variables.existingGrowthAmount} /> times its normal size.
    </Fragment>
  );
};

export default GrassResult;
