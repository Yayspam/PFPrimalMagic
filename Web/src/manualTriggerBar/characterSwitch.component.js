import React from 'react'
import { FormControl, FormControlLabel, makeStyles, Radio, RadioGroup, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { characterInitialState, characters, characterSelector, setManualTriggerCharacter } from '../state/manualTrigger/manualTriggerState';

const useStyles = makeStyles({
  radioContainer: {
    padding: 20
  }
});

const CharacterSwitch = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentCharacter = useSelector(characterSelector);

  const handleCharacterChanged = (event) => {
    const selected = event?.target?.value ?? characterInitialState.name;
    const character = characters[selected];
    dispatch(setManualTriggerCharacter(character));
  }

  return (
    <FormControl className={classes.radioContainer}>
      <Typography>Character</Typography>
      <RadioGroup value={currentCharacter.name} onChange={handleCharacterChanged}>
        {Object.keys(characters).map(key => (
          <FormControlLabel 
            labelPlacement="end" 
            key={key}
            value={key}
            control={<Radio color="default" />}
            label={<Typography>{characters[key].name}</Typography>} 
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CharacterSwitch;