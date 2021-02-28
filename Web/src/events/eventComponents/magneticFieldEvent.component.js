import { Typography } from '@material-ui/core';
import React from 'react';
import Condition from '../../common/conditionDisplay.component';
import VM, {
  dist,
  strengthCheck,
  time,
} from '../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';

export const magneticField = {
  table: 2,
  percentileMin: 39,
  percentileMax: 51,
  title: 'Magnetic Field',
  createVariables: cr => ({
    radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
    cmb: makeConstantVariable(cr + 10, 'CMB = CR + 10'),
    duration: makeVariable(6),
    strengthDc: makeConstantVariable(cr + 5, 'CR + 5'),
  }),
};

const MagneticFieldEvent = ({ event }) => {
  const { radius, duration, cmb, strengthDc } = event.variables;
  return (
    <Typography>
      A powerful magnetic field opens up in a <VM v={radius} u={dist} /> radius
      spread; this acts as a <mark>trip attempt</mark> against any creatures in
      the area <mark>wearing metal armor</mark> (CMB = +<VM v={cmb} />
      ). As a standard action, a creature knocked <Condition name="Prone" /> by
      this effect may attempt a <VM v={strengthDc} u={strengthCheck} /> to
      stand. This effect lasts for <VM v={duration} u={time} />.
    </Typography>
  );
};

export default MagneticFieldEvent;
