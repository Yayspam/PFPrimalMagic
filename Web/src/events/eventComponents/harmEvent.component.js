import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import Spell from '../../common/spellDisplay.component';
import VM, { willSave } from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';
import EventCardChips from '../eventCardChips.component';

export const harm = {
  percentileMin: 33,
  percentileMax: 38,
  title: 'Harm',
  createVariables: cr => ({
    duration: makeConstantVariable(0),
    casterLevel: makeConstantVariable(cr, 'CL = CR'),
    creaturesAffected: makeVariable(cr, 1, 0, '# Creatures <= CR in total'),
    save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10', 'Will Save'),
  }),
};

const HarmEvent = ({ event }) => {
  const { casterLevel, creaturesAffected, save } = event.variables;
  return (
    <Fragment>
      <EventCardChips event={event} />
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
