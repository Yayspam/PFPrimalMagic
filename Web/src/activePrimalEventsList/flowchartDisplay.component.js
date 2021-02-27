import { Button, Dialog, DialogContent, makeStyles } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import primalMagicFlowchart from '../images/primal_magic_flowchart.png';

const useStyles = makeStyles({
  footerButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    width: '100%',
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
      <Dialog open={dialogOpen} onClose={onClose}>
        <DialogContent>
          <img className={classes.image} src={primalMagicFlowchart} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default FlowchartDisplay;
