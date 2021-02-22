import {
  Button,
  Card,
  CardActions,
  CardHeader,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import ProperLink from '../common/properLink.component';
import primalMagicImage from '../images/primal_magic_image.png';
import { resetPrimalMagic } from '../state/app/primalMagic.reducer';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
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

const Homepage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onResetClicked = () => {
    dispatch(resetPrimalMagic());
  };

  return (
    <div className={classes.container}>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title={'Primal Magic Utility'}
        />
        <ProperLink to="/PrimalMagicTracker">
          <img src={primalMagicImage} />
        </ProperLink>
        <CardActions className={classes.cardActions}>
          <Button
            component={ProperLink}
            variant="contained"
            to="/PrimalMagicTracker"
          >
            Visit
          </Button>
          <Button variant="contained" onClick={onResetClicked}>
            Reset Data
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Homepage;
