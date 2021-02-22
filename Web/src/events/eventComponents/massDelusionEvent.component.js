import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import Condition from '../../common/conditionDisplay.component';
import CustomChip from '../../common/customChip.component';
import VM, { willSave } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const massDelusion = {
  percentileMin: 63,
  percentileMax: 68,
  title: 'Mass Delusion',
  createVariables: cr => ({
    duration: makeConstantVariable(0),
    creaturesAffected: makeVariable(cr, 1, 0, '# Creatures <= CR in total'),
    save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10'),
  }),
};

const MassDelusionEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound } = event;
  const { result: crVal } = cr;
  const { creaturesAffected, save } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <CustomChip label="Instantaneous" />
      </Box>
      <Typography>
        <VM v={creaturesAffected} /> creatures become{' '}
        <Condition name="Confused" /> unless they succeed at a{' '}
        <VM v={save} u={willSave} />. For each affected creature, this effect{' '}
        <mark>persists until</mark> that creature&apos;s confusion effect
        results in <mark>&quot;act normally&quot;</mark>, at which point the
        effect ends for that creature. This is a mind-affecting effect.
        mind-affecting effect.
      </Typography>
    </Fragment>
  );
};

export default MassDelusionEvent;
