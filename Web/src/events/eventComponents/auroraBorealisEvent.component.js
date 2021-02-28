import { Typography } from '@material-ui/core';
import React from 'react';
import Condition from '../../common/conditionDisplay.component';
import VM, { dist, time, willSave } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const auroraBorealis = {
  table: 1,
  percentileMin: 55,
  percentileMax: 62,
  title: 'Aurora Borealis',
  createVariables: cr => ({
    radius: makeConstantVariable(cr * 10, 'CR x 10ft.'),
    save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10', 'Will Save'),
    duration: makeConstantVariable(cr, 'CR rounds'),
  }),
};

const AuroraBorealisEvent = ({ event }) => {
  const { radius, duration, save } = event.variables;
  return (
    <Typography>
      Strange, shifting curtains of colour, akin to an aurora borealis, manifest
      in the sky but are visible only to those in a <VM v={radius} u={dist} />{' '}
      radius. Every creature in this area must make a{' '}
      <VM v={save} u={willSave} /> or become <Condition name="Dazed" /> by the
      shifting colours <mark>for 1 round</mark>. The colours persist for{' '}
      <VM v={duration} u={time} />. Creatures must make a{' '}
      <mark>new save each round</mark> to avoid becoming dazed. This is a
      mind-affecting effect.
    </Typography>
  );
};

export default AuroraBorealisEvent;
