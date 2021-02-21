import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import VM, { dist, time, willSave } from '../../common/variableMark.component';

const ColourDrainEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound, finalRound } = event;
  const { result: crVal } = cr;
  const { radius, duration, save } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip value={finalRound} startRound={startRound} />
        <CustomChip label="Will Save" value={save?.result} />
      </Box>
      <Typography>
        Creatures and objects within a <VM v={radius} u={dist} /> radius are
        drained of colour for <VM v={duration} u={time} />. A gnome in this area
        must succeed at a <VM v={save} u={willSave} /> to avoid being shaken by
        this effect for the duration of the loss of colour. This is a
        mind-affecting fear effect.
      </Typography>
    </Fragment>
  );
};

export default ColourDrainEvent;
