import { IconButton, TableCell, TableRow, TextField } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

const isEmptyOrSpace = value => {
  return value === undefined || value === null || value.match(/^ *$/) !== null;
};

export const characterDataErrors = characterData => {
  const nameError = isEmptyOrSpace(characterData?.name);

  const clError =
    characterData?.casterLevel === null ||
    characterData?.casterLevel === undefined ||
    characterData?.casterLevel < 1 ||
    characterData?.casterLevel > 20;

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
    const newData = { ...characterData, casterLevel: number };
    onUpdate(newData);
  };

  return (
    <TableRow key={characterData.id}>
      <TableCell padding="none">
        <TextField
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
          value={characterData?.casterLevel}
          onChange={onClChanged}
        />
      </TableCell>
      <TableCell padding="none">
        <IconButton disableRipple onClick={() => onDelete(characterData)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CharacterRow;
