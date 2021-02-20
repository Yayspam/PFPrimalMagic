import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#f44336',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});

const ManualTriggerHeader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Typography variant="h4">
        Manual Trigger
      </Typography>
    </Box>
  );
}

export default ManualTriggerHeader;