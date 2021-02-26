import React, { Fragment } from 'react';
import Condition from '../../../common/conditionDisplay.component';
import VM, {
  dist,
  reflexSave,
  time,
} from '../../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';

export const butterflyStream = {
  percentileMin: 47,
  percentileMax: 49,
  title: 'Butterfly Stream',
  createVariables: () => ({
    duration: makeConstantVariable(2, '2 rounds'),
    radius: makeConstantVariable(25, '25ft. radius'),
    butteflyCount: makeVariable(100, 2, 400),
    save: makeConstantVariable(14, 'DC 14 Reflex Save'),
  }),
};

const ButterflyStreamResult = ({ variables }) => {
  return (
    <Fragment>
      A stream of <VM v={variables.butteflyCount} /> butterflies pours forth and
      flutters around for <VM v={variables.duration} u={time} />, causing
      everyone within a <VM v={variables.radius} u={dist} /> radius to become{' '}
      <Condition name="Blinded" /> while the butterfies block vision (
      <VM v={variables.save} u={reflexSave} /> negates)
    </Fragment>
  );
};

export default ButterflyStreamResult;
