import { Avatar, Chip, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import { getToolTip } from './variableMark.component';

const useStyles = makeStyles({
  chip: {
    marginRight: 2,
    backgroundColor: 'white',
  },
});

const VariableChip = ({ label, variable }) => {
  const classes = useStyles();
  const toolTip = getToolTip(variable);
  const value = variable.result;
  return (
    <Chip
      className={classes.chip}
      size="small"
      variant="outlined"
      avatar={
        <Tooltip title={toolTip} placement="bottom">
          <Avatar>{value}</Avatar>
        </Tooltip>
      }
      label={label}
    />
  );
};

export default VariableChip;
