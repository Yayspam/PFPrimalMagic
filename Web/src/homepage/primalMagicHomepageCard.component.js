import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { appVersion } from '../common/utils';
import primalMagicImage from '../images/primal_magic_image.png';
import { resetPrimalMagic } from '../state/app/primalMagic.reducer';

const useStyles = makeStyles({
  cardHeader: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const PrimalMagicHomepageCard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [primalResetOpen, setPrimalResetOpen] = useState(false);

  const onResetConfirmed = () => {
    dispatch(resetPrimalMagic());
    setPrimalResetOpen(false);
  };

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title={`Primal Magic Utility - ${appVersion}`}
      />
      <NavLink to="/PrimalMagicTracker">
        <img src={primalMagicImage} />
      </NavLink>
      <CardActions className={classes.cardActions}>
        <Button
          component={NavLink}
          variant="contained"
          to="/PrimalMagicTracker"
        >
          Visit
        </Button>
        <Tooltip
          title={
            'Resets all data to default, removing any existing data ' +
            'such as settings, characters and active events. May be ' +
            'useful in the unlikely event that you encounter an error ' +
            'and/or the data has become corrupted'
          }
        >
          <Button variant="contained" onClick={() => setPrimalResetOpen(true)}>
            Delete Data
          </Button>
        </Tooltip>
        <Dialog
          open={primalResetOpen}
          onClose={() => setPrimalResetOpen(false)}
        >
          <DialogContent>
            <Typography variant="h6">
              Are you sure you wish to delete all primal magic data?
            </Typography>
            <Typography variant="subtitle">
              This includes settings, characters, and active events
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={onResetConfirmed}>
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={() => setPrimalResetOpen(false)}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
};

export default PrimalMagicHomepageCard;
