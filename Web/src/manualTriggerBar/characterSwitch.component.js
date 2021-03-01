import React from 'react';
import {
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  characterInitialState,
  characterSelector,
  charactersSelector,
  setManualTriggerCharacter,
} from '../state/manualTrigger/manualTriggerState';
import ManageCharacters from './manageCharacters.component';

const useStyles = makeStyles({
  radioContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100%',
    width: 'calc(100% - 20px)',
    paddingLeft: 20,
  },
});

const CharacterSwitch = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentCharacter = useSelector(characterSelector);
  const currentCharacters = useSelector(charactersSelector);

  const handleCharacterChanged = event => {
    const selected = event?.target?.value ?? characterInitialState.id;
    dispatch(setManualTriggerCharacter(selected));
  };

  return (
    <FormControl className={classes.radioContainer}>
      <ManageCharacters />
      <RadioGroup value={currentCharacter.id} onChange={handleCharacterChanged}>
        {Object.entries(currentCharacters).map(([_, value]) => (
          <FormControlLabel
            labelPlacement="end"
            key={value.id}
            value={value.id}
            control={<Radio color="default" />}
            label={
              <Typography noWrap className={classes.characterNameText}>
                {value.name}
                {value.id === characterInitialState.id
                  ? ''
                  : ` (CL ${value.cl})`}
              </Typography>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CharacterSwitch;
