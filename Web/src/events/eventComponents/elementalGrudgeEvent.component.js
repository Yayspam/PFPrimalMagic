import { Typography } from '@material-ui/core';
import React from 'react';
import AonLink from '../../common/linkDisplay.component';
import { objectToArrayString } from '../../common/utils';
import VM, { direction, dist, time } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const elementalGrudge = {
  table: 2,
  percentileMin: 91,
  percentileMax: 96,
  title: 'Elemental Grudge',
  createVariables: () => ({
    distance: makeConstantVariable(10, 'within 10ft.'),
    duration: makeConstantVariable(10, '1 minute'),
    elementalType: makeVariable(8),
    cardinalDirection: makeVariable(8),
  }),
};

const elementalTypes = {
  1: 'Air',
  2: 'Earth',
  3: 'Fire',
  4: 'Ice',
  5: 'Lightning',
  6: 'Magma',
  7: 'Mud',
  8: 'Water',
};

const crSizes = {
  1: 'Small',
  3: 'Medium',
  5: 'Large',
  7: 'Huge',
  9: 'Greater',
  11: 'Elder',
};

const getElementalLink = (result, cr) => {
  const availableSizes = Object.entries(crSizes).filter(([key]) => key <= cr);
  const size = availableSizes[availableSizes.length - 1][1]; // They are in order, so we can grab the last available
  const type = elementalTypes[result];
  const prefix = size === crSizes[11] ? 'an' : 'a';
  const link = `https://aonprd.com/MonsterDisplay.aspx?ItemName=${size}%20${type}%20Elemental`;
  return (
    <AonLink
      link={link}
      name={`${prefix} ${size} ${type} Elemental`}
      noHighlight
    />
  );
};

const handleElementalType = cr => ({
  getValues: variable => {
    return {
      value: getElementalLink(variable.result, cr),
    };
  },
  getToolTip: variable => {
    return `1d8 [${variable.result}]: ${objectToArrayString(elementalTypes)}`;
  },
});

const ElementalGrudgeEvent = ({ event }) => {
  const cr = event.cr;
  const {
    duration,
    distance,
    elementalType,
    cardinalDirection,
  } = event.variables;
  return (
    <Typography>
      An extraplanar rift opens up to the{' '}
      <VM v={cardinalDirection} u={direction} />, <VM v={distance} u={dist} />{' '}
      from the source of this event;{' '}
      <VM v={elementalType} h={handleElementalType(cr.result)} /> comes through
      the rift and <mark>attacks the nearest creature</mark> for{' '}
      <VM v={duration} u={time} /> before returning to its plane of origin.
    </Typography>
  );
};

export default ElementalGrudgeEvent;
