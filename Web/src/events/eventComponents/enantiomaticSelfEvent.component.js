import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';
import EventCardChips from '../eventCardChips.component';

export const enantiomaticSelf = {
  percentileMin: 19,
  percentileMax: 22,
  title: 'Enantiomatic Self',
  createVariables: () => ({
    duration: makeConstantVariable(0),
  }),
};

const EnantiomaticSelfEvent = ({ event }) => {
  return (
    <Fragment>
      <EventCardChips event={event} />
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
