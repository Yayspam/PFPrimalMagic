import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const enantiomaticSelf = {
  percentileMin: 19,
  percentileMax: 22,
  title: 'Enantiomatic Self',
  createVariables: () => ({
    duration: makeConstantVariable(0),
  }),
};

const EnantiomaticSelfEvent = ({ event }) => {
  const { cr, percentileRoll, startRound } = event;
  const { result: crVal } = cr;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip />
      </Box>
      <Typography>
        One creature&apos;s body and all its posessions reverse into a mirror
        image of themselves. The binding of any book in its posession is
        reversed, though the text within remains normal and legible. This effect
        is unusal but has <mark>no actual game effect</mark>. Reversing this
        effect is possible via break enchantment, limited wish, miracle,
        polymorph and object, or wish.
      </Typography>
    </Fragment>
  );
};

export default EnantiomaticSelfEvent;
