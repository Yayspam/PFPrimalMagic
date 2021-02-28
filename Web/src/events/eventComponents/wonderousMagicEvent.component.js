import { Typography } from '@material-ui/core';
import React from 'react';
import AonLink from '../../common/linkDisplay.component';
import VM from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';
import {
  getRodOfWonderComponent,
  getRodResult,
  getRodResultByTitle,
} from './rodOfWonderResults/rodOfWonderResults';

export const wonderousMagic = {
  table: 1,
  percentileMin: 79,
  percentileMax: 88,
  title: 'Wonderous Magic',
  createVariables: (_, rodOfWonderEventAlwaysSelected) => {
    const match = rodOfWonderEventAlwaysSelected
      ? getRodResultByTitle(rodOfWonderEventAlwaysSelected)
      : undefined;
    const rodOfWonderPercentile = makeVariable(100);

    if (match) {
      rodOfWonderPercentile.result = match.percentileMin;
    }

    const rodOfWonderVariables = getRodResult(
      rodOfWonderPercentile.result
    ).createVariables();

    return {
      duration: makeConstantVariable(0), // May get over-written by the specific rod result
      casterLevel: makeConstantVariable(10, 'Rod CL = 10'),
      rodOfWonderPercentile,
      ...rodOfWonderVariables,
    };
  },
};

const WonderousMagicEvent = ({ event }) => {
  const { variables } = event;
  const { rodOfWonderPercentile } = variables;

  const rodResult = getRodResult(rodOfWonderPercentile.result);
  const rodComponent = getRodOfWonderComponent(rodResult, variables);

  return (
    <Typography>
      Choose two random creatures in the area, then randomly pick one to be the
      &quot;wielder&quot; and one to be the &quot;target&quot;. A roll of{' '}
      <VM v={rodOfWonderPercentile} /> on the{' '}
      <AonLink
        name="Rod of Wonder table"
        link="https://aonprd.com/MagicRodsDisplay.aspx?FinalName=Rod%20of%20Wonder"
      />{' '}
      has determined the strange effect that occurs between these two creatures:{' '}
      <br /> <br />
      {rodComponent}
    </Typography>
  );
};

export default WonderousMagicEvent;
