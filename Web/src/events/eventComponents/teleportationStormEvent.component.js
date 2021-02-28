import { Typography } from '@material-ui/core';
import React from 'react';
import Spell from '../../common/spellDisplay.component';
import VM, {
  dist,
  willSave,
  direction,
} from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const teleportationStorm = {
  percentileMin: 89,
  percentileMax: 94,
  title: 'Teleportation Storm',
  createVariables: cr => ({
    duration: makeConstantVariable(0),
    save: makeConstantVariable(cr + 10, 'DC = CR + 10', 'Will Save'),
    distance: makeConstantVariable(cr * 5, 'CR x 5ft.'),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
    cardinalDirection: makeVariable(8),
  }),
};

const TeleportationStormEvent = ({ event }) => {
  const { distance, save, casterLevel, cardinalDirection } = event.variables;
  return (
    <Typography>
      A teleportation storm occurs. All creatures in the area must make a{' '}
      <VM v={save} u={willSave} />. Those who fail are teleported, as if via
      <Spell name="Dimension Door" casterLevel={casterLevel} />, so that they
      randomly{' '}
      <mark>swap places with another creature that failed their save</mark>.
      this places a creature in an area too small to accept its space, it
      instead appears in the closest adjacent space that can contain it. If only
      one creature is affected, it teleports <VM v={distance} u={dist} /> to the{' '}
      <VM v={cardinalDirection} u={direction} />.
    </Typography>
  );
};

export default TeleportationStormEvent;
