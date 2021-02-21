import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import Spell from '../../common/spellDisplay.component';
import VM, { dist } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const utterDarkness = {
  percentileMin: 45,
  percentileMax: 48,
  title: 'Utter Darkness',
  createVariables: cr => ({
    duration: makeConstantVariable(cr * 10 * 10, '10 min./level'),
    radius: makeConstantVariable(cr * 10, 'CR x 10ft.'),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
  }),
};

const UtterDarknessEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound, finalRound } = event;
  const { result: crVal } = cr;
  const { casterLevel, radius } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip value={finalRound} />
      </Box>
      <Typography>
        A <VM v={radius} u={dist} /> radius area becomes utterly dark, as if
        from a{' '}
        <Spell
          link={
            'https://aonprd.com/SpellDisplay.aspx?ItemName=Deeper%20Darkness'
          }
          name="Deeper Darkness"
          casterLevel={casterLevel}
        />
      </Typography>
    </Fragment>
  );
};

export default UtterDarknessEvent;
