import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import VM, { direction, dist } from '../../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';

export const darkness = {
  percentileMin: 54,
  percentileMax: 58,
  title: 'Darkness',
  createVariables: () => ({
    duration: makeConstantVariable(10, '10 rounds'),
    diameter: makeConstantVariable(30, '30ft diameter'),
    distance: makeConstantVariable(30, '30ft away'),
    cardinalDirection: makeVariable(8),
  }),
};

const DarknessResult = ({ variables }) => {
  return (
    <Fragment>
      A <VM v={variables.diameter} u={dist} /> diameter hemisphere of the{' '}
      <Spell
        name="Darkness"
        casterLevel={variables.casterLevel}
        duration={variables.duration}
      />{' '}
      appears <VM v={variables.distance} u={dist} /> to the{' '}
      <VM v={variables.cardinalDirection} u={direction} /> of the rod
    </Fragment>
  );
};

export default DarknessResult;
