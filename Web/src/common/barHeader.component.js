import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    textAlign: 'center',
    backgroundColor: ({ colour }) => colour,
    color: 'white',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});

const BarHeader = ({ title, colour }) => {
  const classes = useStyles({ colour });

  return (
    <Box className={classes.header}>
      <Typography variant="h4">
        {title}
      </Typography>
    </Box>
  );
}

export default BarHeader;