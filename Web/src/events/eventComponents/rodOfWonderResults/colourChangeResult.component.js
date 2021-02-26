import React, { Fragment } from 'react';
import { objectToArrayString } from '../../../common/utils';
import VM from '../../../common/variableMark.component';
import { makeVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const colourChange = {
  percentileMin: 96,
  percentileMax: 97,
  title: 'Colour Change',
  createVariables: () => ({
    target: makeVariable(2),
    colour: makeVariable(3),
  }),
};

const targets = {
  1: 'wielder',
  2: 'target',
};

const handleTargets = {
  getValues: variable => {
    return {
      value: targets[variable.result],
    };
  },
  getToolTip: variable => {
    return `1d2 [${variable.result}]: ${objectToArrayString(targets)}`;
  },
};

const colours = {
  1: 'blue',
  2: 'green',
  3: 'purple',
};

const handleColours = {
  getValues: variable => {
    return {
      value: colours[variable.result],
    };
  },
  getToolTip: variable => {
    return `1d3 [${variable.result}]: ${objectToArrayString(colours)}`;
  },
};

const ColourChangeResult = ({ variables }) => {
  return (
    <Fragment>
      The <VM v={variables.target} h={handleTargets} /> turns permanently{' '}
      <VM v={variables.colour} h={handleColours} /> (no save).
    </Fragment>
  );
};

export default ColourChangeResult;
