import React from 'react'
import { Box, makeStyles } from '@material-ui/core';
import CrInput from './crInput.component';
import CharacterSwitch from './characterSwitch.component';

const useStyles = makeStyles({
  content: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 30
  },
  radioContainer: {
    marginTop: 10,
    marginRight: 78
  }
});

const ManualTriggerContent = () => {
  const classes = useStyles();

  return (
    <Box className={classes.content} >
      <CrInput/>
      <CharacterSwitch/>
    </Box>
  );
}

export default ManualTriggerContent;