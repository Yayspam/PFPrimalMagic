import { Avatar, Chip, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  chip: {
    margin: 2,
  },
});

const CustomChip = ({ label, value }) => {
  const classes = useStyles();
  return (
    <Chip
      className={classes.chip}
      size="small"
      variant="outlined"
      avatar={value !== undefined ? <Avatar>{value}</Avatar> : null}
      label={label}
    />
  );
};

export default CustomChip;
