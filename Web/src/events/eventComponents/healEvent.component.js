import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../../common/customChip.component';
import Spell from '../../common/spellDisplay.component';
import VM, { willSave } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const heal = {
  percentileMin: 33,
  percentileMax: 38,
  title: 'Heal',
  createVariables: cr => ({
    duration: makeConstantVariable(0),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
    creaturesAffected: makeVariable(cr, 1, 0, '# Creatures <= CR in total'),
    save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10'),
  }),
};

const HealEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound } = event;
  const { result: crVal } = cr;
  const { casterLevel, creaturesAffected, save } = variables;
  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <CustomChip label="Instantaneous" />
        <CustomChip label="Will Save" value={save?.result} />
      </Box>
      <Typography>
        Positive energy affects <VM v={creaturesAffected} /> nearby creatures.
        These creatures are affected by a{' '}
        <Spell
          link={'https://aonprd.com/SpellDisplay.aspx?ItemName=Heal'}
          name="Heal"
          casterLevel={casterLevel}
          save={save}
          saveType={willSave}
        />
      </Typography>
    </Fragment>
  );
};

export default HealEvent;
