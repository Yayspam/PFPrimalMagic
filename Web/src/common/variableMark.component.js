import { makeStyles, Tooltip } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import React from 'react';
import { objectToArrayString } from './utils';

const useStyles = makeStyles({
  mark: {
    backgroundColor: ({ u }) =>
      u?.includes('SAVE') ? 'yellow' : lightBlue[50],
  },
});

export const time = 'TIME';
export const dist = 'DISTANCE';
export const willSave = 'WILL_SAVE';
export const fortSave = 'FORT_SAVE';
export const reflexSave = 'REFLEX_SAVE';
export const strengthCheck = 'STRENGTH_CHECK';
export const cl = 'CASTER_LEVEL';
export const weight = 'WEIGHT';
export const direction = 'DIRECTION';
export const energy = 'ENERGY';

const energyTypes = {
  1: 'acid',
  2: 'cold',
  3: 'electricity',
  4: 'fire',
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

const getEnergy = variable => {
  return {
    value: energyTypes[variable.result],
    unit: 'energy',
  };
};

const getDirection = variable => {
  return {
    value: directions[Math.floor(variable.result, 8)],
  };
};

const getWeight = variable => {
  return {
    value: variable.result,
    unit: `lb${variable.result > 1 ? 's' : ''}`,
  };
};

const getCasterLevel = variable => {
  return {
    prefix: 'Caster Level',
    value: variable.result,
  };
};

const getTime = variable => {
  let value = variable.result;
  let unit = `round${value > 1 ? 's' : ''}`;

  if (value >= 24 * 60 * 10) {
    value = Math.floor(value / (24 * 60 * 10));
    unit = `day${value > 1 ? 's' : ''}`;
  } else if (value >= 60 * 10) {
    value = Math.floor(value / (60 * 10));
    unit = `hour${value > 1 ? 's' : ''}`;
  } else if (value > 20) {
    value = Math.floor(value / 10);
    unit = `minute${value > 1 ? 's' : ''}`;
  }

  return {
    value,
    unit,
  };
};

const getDist = variable => {
  const value = variable.result;
  const unit = 'ft.';

  return {
    value,
    unit,
  };
};

const getSave = (variable, saveType, isCheck = false) => {
  const value = variable.result;
  const unit = `${saveType} ${isCheck ? 'Check' : 'Save'}`;

  return {
    prefix: 'DC ',
    value,
    unit,
  };
};

const getValues = (variable, unitType) => {
  if (unitType === time) {
    return getTime(variable);
  }

  if (unitType === dist) {
    return getDist(variable);
  }

  if (unitType === willSave) {
    return getSave(variable, 'Will');
  }

  if (unitType === fortSave) {
    return getSave(variable, 'Fortitude');
  }

  if (unitType === reflexSave) {
    return getSave(variable, 'Reflex');
  }

  if (unitType === strengthCheck) {
    return getSave(variable, 'Strength', true);
  }

  if (unitType === cl) {
    return getCasterLevel(variable);
  }

  if (unitType === weight) {
    return getWeight(variable);
  }

  if (unitType === direction) {
    return getDirection(variable);
  }

  if (unitType === energy) {
    return getEnergy(variable);
  }

  return {
    value: variable.result,
    unit: undefined,
  };
};

export const getToolTip = (variable, unit) => {
  if (variable.description) {
    return variable.description;
  }

  if (unit === direction) {
    return `1d8 [${variable.result}]: ${objectToArrayString(directions)}`;
  }

  if (unit === energy) {
    return `1d4 [${variable.result}]: ${objectToArrayString(energyTypes)}`;
  }

  let modifier = `+ ${variable.modifier}`;

  if (!variable.modifier) {
    modifier = '';
  } else if (variable.modifier < 0) {
    modifier = `- ${variable.modifier}`;
  }

  return `${variable.diceCount}d${variable.diceSize} [${variable.result -
    variable.modifier}] ${modifier}`;
};

const VM = ({ v, u, h }) => {
  const classes = useStyles({ u });
  const { prefix, value, unit } = h?.getValues
    ? h.getValues(v)
    : getValues(v, u);
  const toolTip = h?.getToolTip ? h.getToolTip(v) : getToolTip(v, u);
  return (
    <Tooltip title={toolTip} placement="left">
      <mark className={classes.mark}>
        {!prefix ? null : `${prefix} `}
        {value}
        {!unit ? null : ` ${unit}`}
      </mark>
    </Tooltip>
  );
};

VM.defaultProps = {
  u: undefined,
  h: undefined,
};

export default VM;
