import { Typography } from '@material-ui/core';
import React from 'react';
import Condition from '../../common/conditionDisplay.component';
import VM, { dist, time, willSave } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const colourDrain = {
  percentileMin: 1,
  percentileMax: 6,
  title: 'Colour Drain',
  createVariables: cr => ({
    radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
    duration: makeConstantVariable(cr * 10, 'CR mins'),
    save: makeConstantVariable(15, 'DC 15 Will Save', 'Will Save'),
  }),
};

const ColourDrainEvent = ({ event }) => {
  const { radius, duration, save } = event.variables;
  return (
    <Typography>
      Creatures and objects within a <VM v={radius} u={dist} /> radius are
      drained of colour for <VM v={duration} u={time} />. A gnome in this area
      must succeed at a <VM v={save} u={willSave} /> to avoid being{' '}
      <Condition name="Shaken" /> by this effect for the duration of the loss
      colour. This is a mind-affecting fear effect.
    </Typography>
  );
};

export default ColourDrainEvent;
