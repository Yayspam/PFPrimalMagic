import { makeStyles } from '@material-ui/core';
import React from 'react';
import PrimalMagicHomepageCard from './primalMagicHomepageCard.component';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

const Homepage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <PrimalMagicHomepageCard />
    </div>
  );
};

export default Homepage;
