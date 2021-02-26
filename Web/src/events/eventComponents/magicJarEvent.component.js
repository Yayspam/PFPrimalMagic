import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import Condition from '../../common/conditionDisplay.component';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import Spell from '../../common/spellDisplay.component';
import VM, { time, willSave } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const magicJar = {
  percentileMin: 95,
  percentileMax: 98,
  title: 'Magic Jar',
  createVariables: cr => ({
    duration: makeConstantVariable(0),
    save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10'),
    stunDuration: makeVariable(4), // 1d4 rounds stun duration
    bodySwapDuration: makeConstantVariable(cr, 'CR rounds'),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
  }),
};

const MagicJarEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound } = event;
  const { result: crVal } = cr;
  const { save, stunDuration, bodySwapDuration, casterLevel } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip />
      </Box>
      <Typography>
        A <Spell name="Magic Jar" casterLevel={casterLevel} /> like effect
        affects two creatures. A <VM v={save} u={willSave} /> negates the
        effect. If one creature fails this save but the other succeeds, the
        creature that fails the save is merely <Condition name="Stunned" /> for{' '}
        <VM v={stunDuration} u={time} />. If both creatures fail the save, their{' '}
        <mark>minds are switched</mark> into each other&apos;s bodies for{' '}
        <VM v={bodySwapDuration} u={time} />.
      </Typography>
    </Fragment>
  );
};

export default MagicJarEvent;
