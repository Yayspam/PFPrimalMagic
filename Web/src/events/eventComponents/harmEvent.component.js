import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import Spell from '../../common/spellDisplay.component';
import VM, { willSave } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const harm = {
  percentileMin: 33,
  percentileMax: 38,
  title: 'Harm',
  createVariables: cr => ({
    duration: makeConstantVariable(0),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
    creaturesAffected: makeVariable(cr, 1, 0, '# Creatures <= CR in total'),
    save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10'),
  }),
};

const HarmEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound } = event;
  const { result: crVal } = cr;
  const { casterLevel, creaturesAffected, save } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip />
        <CustomChip label="Will Save" value={save?.result} />
      </Box>
      <Typography>
        Negative energy affects <VM v={creaturesAffected} /> nearby creatures.
        These creatures are affected by a{' '}
        <Spell
          name="Harm"
          casterLevel={casterLevel}
          save={save}
          saveType={willSave}
        />
      </Typography>
    </Fragment>
  );
};

export default HarmEvent;
