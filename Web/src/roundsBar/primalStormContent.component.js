import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  primalStormStateSelector,
  setPrimalStormLeftArea,
  setPrimalStormSuppressed,
} from '../state/primalStorm/primalStormState';
import { activatePrimalStormThunk } from '../state/primalStorm/primalStormState.thunk';

function getColor(value) {
  //value from 0 to 1
  var hue = ((1 - value) * 120).toString(10);
  return ['hsl(', hue, ',60%,50%)'].join('');
}

const useStyles = makeStyles({
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  divider: {
    width: '100%',
  },
  currentChanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentChanceText: {
    marginLeft: 16,
  },
  currentChanceAvatar: {
    backgroundColor: ({ value }) => getColor(value),
    marginLeft: 10,
    fontSize: '15px',
    color: 'black',
  },
});

const PrimalStormContent = () => {
  const dispatch = useDispatch();

  const { active, suppressed, leftArea, currentChance } = useSelector(
    primalStormStateSelector
  );

  const classes = useStyles({ value: currentChance / 100 });

  const enablePrimalStorm = event => {
    const value = event.target.checked;
    dispatch(activatePrimalStormThunk(value));
  };

  const suppressPrimalStorm = event => {
    const value = event.target.checked;
    dispatch(setPrimalStormSuppressed(value));
  };

  const leavePrimalStorm = event => {
    const value = event.target.checked;
    dispatch(setPrimalStormLeftArea(value));
  };

  const makeCheckboxWithTooltip = (label, toolTip, checked, onChange) => (
    <Tooltip placement="left" title={toolTip}>
      <FormControlLabel
        label={label}
        labelPlacement="start"
        control={
          <Checkbox color="default" checked={checked} onChange={onChange} />
        }
      />
    </Tooltip>
  );

  return (
    <Box className={classes.content}>
      <FormControlLabel
        label="Enable Primal Storm"
        labelPlacement="start"
        control={
          <Checkbox
            color="default"
            checked={active}
            onChange={enablePrimalStorm}
          />
        }
      />
      {active && (
        <Fragment>
          <Divider className={classes.divider} />
          {makeCheckboxWithTooltip(
            'Storm Suppressed',
            'If the weather is suppressed by any means, the ' +
              'chance increases by 5% per round to a maximum of 50%',
            suppressed,
            suppressPrimalStorm
          )}
          {makeCheckboxWithTooltip(
            'Left Storm Area',
            'If all creatures leave the area of the storm the ' +
              'chance is reduced to 50% if higher, or remains ' +
              'static if lower. It reduces to 0% when an event ' +
              'triggers',
            leftArea,
            leavePrimalStorm
          )}
          <Box className={classes.currentChanceContainer}>
            <Typography className={classes.currentChanceText}>
              Current Primal Event Chance:
            </Typography>
            <Avatar className={classes.currentChanceAvatar}>
              {currentChance}%
            </Avatar>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default PrimalStormContent;
