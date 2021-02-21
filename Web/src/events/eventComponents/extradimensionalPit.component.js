import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import Spell from '../../common/spellDisplay.component';
import VM, { dist, reflexSave } from '../../common/variableMark.component';
import { makeConstantVariable } from '../../state/activePrimalEvents/activePrimalEventsState';

export const extradimensionalPit = {
  percentileMin: 23,
  percentileMax: 26,
  title: 'Extradimensional Pit',
  createVariables: cr => ({
    duration: makeConstantVariable(cr + 1, '1 + 1 round/level'),
    depth: makeConstantVariable(cr * 10, 'CR x 10ft.'),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
    save: makeConstantVariable(cr + 10, 'Reflex Save DC = CR + 10'),
  }),
};

const ExtradimensionalPitEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound, finalRound } = event;
  const { result: crVal } = cr;
  const { depth, duration, casterLevel, save } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip value={finalRound} />
        <CustomChip label="Reflex Save" value={save?.result} />
      </Box>
      <Typography>
        A circular pit opens under the feet of a random target. The pit creates
        an extradimensional space in the gorund, not an actual pit. The pit is{' '}
        <VM v={depth} u={dist} />, but otherwise functions as the{' '}
        <Spell
          link={'https://aonprd.com/SpellDisplay.aspx?ItemName=Create%20Pit'}
          name="Create Pit"
          casterLevel={casterLevel}
          save={save}
          saveType={reflexSave}
          duration={duration}
        />
      </Typography>
    </Fragment>
  );
};

export default ExtradimensionalPitEvent;
