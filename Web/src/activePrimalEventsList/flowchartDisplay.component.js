import { Button, Dialog, DialogContent, makeStyles } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import primalMagicFlowchart from '../images/primal_magic_flowchart.png';

const useStyles = makeStyles({
  footerButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    height: '100%',
  },
  dailogPaper: {
    maxHeight: 'calc(100% - 10px)',
    maxWidth: 'calc(100% - 10px)',
  },
  dialogContent: {
    height: '100vh',
    overflowY: 'hidden',
    display: 'flex',
    alignItems: 'center',
    '&:first-child': {
      padding: 5,
    },
  },
});

const FlowchartDisplay = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const onOpen = () => {
    setDialogOpen(true);
  };

  const onClose = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <Button
        className={classes.footerButton}
        variant="contained"
        onClick={onOpen}
      >
        Flowchart
      </Button>
      <Dialog
        maxWidth={false}
        open={dialogOpen}
        onClose={onClose}
        PaperProps={{ className: classes.dailogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <img className={classes.image} src={primalMagicFlowchart} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default FlowchartDisplay;
