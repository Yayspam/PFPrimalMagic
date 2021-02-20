import React from 'react'
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { characterInitialState, characterSelector, setManualTriggerCr, specifiedCrSelector } from '../state/manualTrigger/manualTriggerState';

const useStyles = makeStyles({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20
  },
  input: {
    textAlign: 'center'
  },
  label: {
    marginTop: 5
  }
});

const CrInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentCharacter = useSelector(characterSelector);
  const disabled = currentCharacter?.name !== characterInitialState.name;
  const currentCr = useSelector(specifiedCrSelector);
  const crError = !disabled && (currentCr > 20 || currentCr < 1);
  const crErrorLabel = (!disabled && crError) ? 'between 1 and 20' : null;

  const onCrChanged = (event) => {
    dispatch(setManualTriggerCr(event.target.value))
  }

  return (
    <Grid className={classes.inputContainer} container spacing={1}>
      <Grid item>
        <Typography className={classes.label}>
          CR / CL:
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          disabled={disabled}
          error={crError}
          helperText={crErrorLabel}
          type="number"
          InputLabelProps={{
            hidden: true,
          }}
          inputProps={{
            className: classes.input,
          }}
          value={currentCr}
          onChange={onCrChanged}
        />
      </Grid>
    </Grid>
  );
}

export default CrInput;