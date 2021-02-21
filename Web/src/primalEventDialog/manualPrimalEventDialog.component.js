import { Button, Dialog, Typography } from '@material-ui/core';
import React from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeTriggerDialog,
  confirmDialogPrimalEventThunk,
  triggerDialogStateSelector,
} from '../state/triggerDialog/triggerDialogState';

const ManualPrimalEventDialog = () => {
  const dispatch = useDispatch();
  const dialogState = useSelector(triggerDialogStateSelector);

  const onAcceptClicked = () => {
    dispatch(confirmDialogPrimalEventThunk());
  };

  const onCloseDialogClicked = () => {
    dispatch(closeTriggerDialog());
  };

  return (
    <Dialog open={dialogState.open}>
      <Fragment>
        <Typography>Primal Event Dialog.</Typography>
        <Typography>
          d%: {dialogState.percentile}, CR: {dialogState.cr}
        </Typography>
        {dialogState.currentEvent && (
          <Button variant="contained" onClick={onAcceptClicked}>
            Accept
          </Button>
        )}
        <Button variant="contained" onClick={onCloseDialogClicked}>
          Close
        </Button>
      </Fragment>
    </Dialog>
  );
};

export default ManualPrimalEventDialog;
