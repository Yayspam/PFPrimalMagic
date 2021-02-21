import { makeStyles, Tooltip } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import React from 'react';

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

const getTime = variable => {
  let value = variable.result;
  let unit = `round${value > 1 ? 's' : ''}`;

  if (value > 600) {
    value = Math.floor(value / 600);
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

const getSave = (variable, saveType) => {
  const value = variable.result;
  const unit = `${saveType} Save`;

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

  return {
    value: variable.result,
    unit: undefined,
  };
};

const getToolTip = variable => {
  if (variable.description) {
    return variable.description;
  }

  let modifier = `+${variable.modifier}`;

  if (!variable.modifier) {
    modifier = '';
  } else if (variable.modifier < 0) {
    modifier = `-${variable.modifier}`;
  }

  return `${variable.diceCount}d${variable.diceSize} [${variable.result -
    variable.modifier}] ${modifier}`;
};

const VM = ({ v, u }) => {
  const classes = useStyles({ u });
  const { prefix, value, unit } = getValues(v, u);
  const toolTip = getToolTip(v);
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

export default VM;
