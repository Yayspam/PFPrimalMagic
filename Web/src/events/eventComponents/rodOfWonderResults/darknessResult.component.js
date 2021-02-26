import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import { objectToArrayString } from '../../../common/utils';
import VM, { dist, fortSave } from '../../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';

export const darkness = {
  percentileMin: 54,
  percentileMax: 58,
  title: 'Darkness',
  createVariables: () => ({
    duration: makeConstantVariable(10, '10 rounds'),
    diameter: makeConstantVariable(30, '30ft diameter'),
    distance: makeConstantVariable(30, '30ft away'),
    direction: makeVariable(8),
  }),
};

const directions = {
  1: 'north',
  2: 'north east',
  3: 'east',
  4: 'south east',
  5: 'south',
  6: 'south west',
  7: 'west',
  8: 'north west',
};

const handleDirection = {
  getValues: variable => {
    return {
      value: directions[variable.result],
    };
  },
  getToolTip: variable => {
    return `1d8 [${variable.result}]: ${objectToArrayString(directions)}`;
  },
};

const DarknessResult = ({ variables }) => {
  return (
    <Fragment>
      A <VM v={variables.diameter} u={dist} /> diameter hemisphere of the{' '}
      <Spell
        name="Darkness"
        casterLevel={variables.casterLevel}
        duration={variables.duration}
      />{' '}
      appears <VM v={variables.distance} u={dist} /> to the{' '}
      <VM v={variables.direction} h={handleDirection} /> of the rod
    </Fragment>
  );
};

export default DarknessResult;
