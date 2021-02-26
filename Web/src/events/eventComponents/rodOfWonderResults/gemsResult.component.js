import React, { Fragment } from 'react';
import VM, { dist, time } from '../../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';

export const gems = {
  percentileMin: 88,
  percentileMax: 90,
  title: 'Gems',
  createVariables: () => ({
    gemCount: makeVariable(10, 3, 10),
    distance: makeConstantVariable(30, '30ft long stream'),
    damage: makeConstantVariable(1, '1 damage'),
    numberOfHits: makeVariable(4, 5),
  }),
};

const GemsResult = ({ variables }) => {
  return (
    <Fragment>
      <VM v={variables.gemCount} /> gemstones, <mark>valued at 1gp each</mark>,
      shoot forth from the rod in a <VM v={variables.distance} u={dist} /> long
      stream. <VM v={variables.numberOfHits} /> of these gemstones{' '}
      <mark>hit creatures along the path</mark>. Divide these hits evenly among
      the available targets to determine the damage each creature takes.
    </Fragment>
  );
};

export default GemsResult;
