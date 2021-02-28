import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import Spell from '../../common/spellDisplay.component';
import VM, { dist } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';
import EventCardChips from '../eventCardChips.component';

export const utterDarkness = {
  percentileMin: 45,
  percentileMax: 48,
  title: 'Utter Darkness',
  createVariables: cr => ({
    duration: makeConstantVariable(cr * 10 * 10, '10 min./level'),
    radius: makeConstantVariable(cr * 10, 'CR x 10ft.'),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
  }),
};

const UtterDarknessEvent = ({ event }) => {
  const { casterLevel, radius } = event.variables;
  return (
    <Fragment>
      <EventCardChips event={event} />
      <Typography>
        A <VM v={radius} u={dist} /> radius area becomes utterly dark, as if
        from a <Spell name="Deeper Darkness" casterLevel={casterLevel} />
      </Typography>
    </Fragment>
  );
};

export default UtterDarknessEvent;
