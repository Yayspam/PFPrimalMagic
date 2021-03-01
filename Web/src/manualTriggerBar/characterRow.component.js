import { IconButton, TableCell, TableRow, TextField } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { characterInitialState } from '../state/manualTrigger/manualTriggerState';

const isEmptyOrSpace = value => {
  return value === undefined || value === null || value.match(/^ *$/) !== null;
};

export const characterDataErrors = characterData => {
  const nameError = isEmptyOrSpace(characterData?.name);

  const clError =
    characterData?.cl === null ||
    characterData?.cl === undefined ||
    characterData?.cl < 1 ||
    characterData?.cl > 20;

  return [nameError, clError];
};

const CharacterRow = ({ characterData, onUpdate, onDelete }) => {
  const [nameError, clError] = characterDataErrors(characterData);

  const onNameChanged = event => {
    const value = event.target.value;
    const newData = { ...characterData, name: value };
    onUpdate(newData);
  };

  const onClChanged = event => {
    const value = event.target.value;
    const number = value === undefined ? undefined : parseInt(value);
    const newData = { ...characterData, cl: number };
    onUpdate(newData);
  };

  const isOtherCharacter = characterData.id === characterInitialState.id;

  const conditionalOnDelete = () => {
    if (isOtherCharacter) {
      return;
    }

    onDelete(characterData);
  };

  return (
    <TableRow key={characterData.id}>
      <TableCell padding="none">
        <TextField
          disabled={isOtherCharacter}
          variant="outlined"
          fullWidth
          margin="dense"
          inputProps={{ style: { textAlign: 'center' } }}
          error={nameError}
          helperText={nameError ? 'Must be entered' : ''}
          value={characterData?.name}
          onChange={onNameChanged}
        />
      </TableCell>
      <TableCell padding="none">
        <TextField
          disabled={isOtherCharacter}
          style={{ marginLeft: 5 }}
          variant="outlined"
          fullWidth
          margin="dense"
          type="number"
          error={clError}
          inputProps={{
            style: {
              textAlign: 'center',
            },
          }}
          helperText={clError ? 'Must be between 1 and 20' : ''}
          value={characterData?.cl}
          onChange={onClChanged}
        />
      </TableCell>
      <TableCell padding="none">
        <IconButton
          disableRipple
          onClick={conditionalOnDelete}
          disabled={isOtherCharacter}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CharacterRow;
