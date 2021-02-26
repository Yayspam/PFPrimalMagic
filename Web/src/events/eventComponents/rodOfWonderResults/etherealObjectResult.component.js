import { makeStyles, Tooltip } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import VM, { dist, weight } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

const useStyles = makeStyles({
  mark: {
    backgroundColor: lightBlue[50],
  },
});

export const etherealObject = {
  percentileMin: 63,
  percentileMax: 65,
  title: 'Ethereal Object',
  createVariables: () => ({
    mass: makeConstantVariable(1000, '1,000 lbs of mass'),
    volume: makeConstantVariable(30, '30 cubic feet'),
  }),
};

const EtherealObjectResult = ({ variables }) => {
  const classes = useStyles();

  const etherealTooltip =
    'An ethereal object is invisible, insubstantial, and exists on the Ethereal plane. ' +
    'Creatures and solid objects on the Material plane can move through ethereal objects. ' +
    'Force effects and abjurations affect ethereal objects normally, their effects extend onto ' +
    'the Ethereal plane from the Material plane but not vice versa. ' +
    'Certain material creatures or objects have attacks or effects that work on the Ethereal plane';

  return (
    <Fragment>
      Any non-living object of up to <VM v={variables.mass} u={weight} /> of
      mass and up to <VM v={variables.volume} u={dist} /> cube in size turns{' '}
      <Tooltip title={etherealTooltip} placement="left">
        <mark className={classes.mark}>Ethereal</mark>
      </Tooltip>
      .
    </Fragment>
  );
};

export default EtherealObjectResult;
