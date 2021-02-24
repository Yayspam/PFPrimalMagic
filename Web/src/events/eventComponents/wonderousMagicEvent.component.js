import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
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
  const { cr, variables, percentileRoll, startRound } = event;
  const { result: crVal } = cr;
  const { rodOfWonderPercentile, duration } = variables;

  const rodResult = getRodResult(rodOfWonderPercentile.result);
  const rodComponent = getRodOfWonderComponent(rodResult, variables);

  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip value={duration?.result} />
      </Box>
      <Typography>
        Choose two random creatures in the area, then randomly pick one to be
        the &quot;wielder&quot; and one to be the &quot;target&quot;. A roll of{' '}
        <VM v={rodOfWonderPercentile} /> on the{' '}
        <AonLink
          name="Rod of Wonder table"
          link="https://aonprd.com/MagicRodsDisplay.aspx?FinalName=Rod%20of%20Wonder"
        />{' '}
        has determined the strange effect that occurs between these two
        creatures: <br /> <br />
        {rodComponent}
      </Typography>
    </Fragment>
  );
};

export default WonderousMagicEvent;
