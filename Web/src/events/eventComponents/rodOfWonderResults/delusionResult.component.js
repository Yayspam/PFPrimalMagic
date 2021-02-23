import React, { Fragment } from 'react';
import AonLink from '../../../common/linkDisplay.component';
import VM, { time } from '../../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';

export const delusion = {
  percentileMin: 11,
  percentileMax: 15,
  title: 'Delusion',
  createVariables: () => ({
    duration: makeConstantVariable(1, '1 round'),
    secondDieRoll: makeVariable(100),
  }),
};

const DelusionResult = ({ variables }) => {
  return (
    <Fragment>
      Deludes the wielder for <VM v={variables.duration} u={time} /> into
      believing the rod functions as if they had rolled a{' '}
      <VM v={variables.secondDieRoll} /> on the{' '}
      <AonLink
        name="Rod of Wonder table"
        link="https://aonprd.com/MagicRodsDisplay.aspx?FinalName=Rod%20of%20Wonder"
      />
    </Fragment>
  );
};

export default DelusionResult;
