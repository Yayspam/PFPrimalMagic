import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import {
  userSettingsHeader,
  userSettingsHeaderEmphasis,
} from '../common/colours';
import CharacterRow, { characterDataErrors } from './characterRow.component';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { charactersSelector } from '../state/manualTrigger/manualTriggerState';
import { saveManualTriggerCharactersThunk } from '../state/manualTrigger/manualTriggerState.thunk';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  manageButton: {
    color: blue[500],
    marginRight: 10,
  },
  dialogTitle: {
    backgroundColor: userSettingsHeader,
    color: 'white',
    textAlign: 'center',
  },
  dialogActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerCell: {
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: userSettingsHeader,
    color: 'white',
    '&:hover': {
      backgroundColor: userSettingsHeaderEmphasis,
    },
  },
});

const ManageCharacters = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentCharacters = useSelector(charactersSelector);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState(currentCharacters);

  useEffect(() => {
    setData(currentCharacters);
  }, [currentCharacters, setData]);

  const dataHasAnyErrors = data
    .map(c => characterDataErrors(c))
    .some(e => e[0] || e[1]);

  const onUpdate = newEntry => {
    const newData = data.map(entry =>
      entry.id === newEntry.id ? newEntry : entry
    );
    setData(newData);
  };

  const onDelete = deleteEntry => {
    const deleteId = deleteEntry.id;
    const newData = data
      .map(entry => (entry.id === deleteId ? undefined : entry))
      .filter(entry => !!entry);
    setData(newData);
  };

  const onAdd = () => {
    setData([...data, { id: Date.now(), name: '', cl: 0 }]);
  };

  const onSaveAndClose = () => {
    dispatch(saveManualTriggerCharactersThunk(data));

    setDialogOpen(false);
  };

  const onCancel = () => {
    setDialogOpen(false);
  };

  return (
    <Box className={classes.container}>
      <Typography>Characters</Typography>
      <Button
        disableRipple
        className={classes.manageButton}
        onClick={() => setDialogOpen(true)}
      >
        (Manage)
      </Button>
      <Dialog fullWidth open={dialogOpen}>
        <DialogTitle className={classes.dialogTitle}>
          Manage Characters
        </DialogTitle>
        <DialogContent className={classes.dialogActions}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headerCell}>
                    Character Name
                  </TableCell>
                  <TableCell className={classes.headerCell}>
                    Caster Level
                  </TableCell>
                  <TableCell className={classes.headerCell}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(entry => (
                  <CharacterRow
                    key={entry.id}
                    characterData={entry}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Tooltip title="Add a new character to the bottom of this list">
            <IconButton onClick={onAdd}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={dataHasAnyErrors}
            className={classes.saveButton}
            variant="contained"
            onClick={onSaveAndClose}
          >
            Save & Close
          </Button>
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCharacters;
