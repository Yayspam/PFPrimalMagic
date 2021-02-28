import React, { Fragment } from 'react';
import Condition from '../../../common/conditionDisplay.component';
import VM, {
  dist,
  fortSave,
  time,
} from '../../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';

export const blindingColours = {
  percentileMin: 91,
  percentileMax: 95,
  title: 'Blinding Colours',
  createVariables: () => ({
    length: makeConstantVariable(40, '40 ft. length'),
    width: makeConstantVariable(30, '30ft. width'),
    duration: makeVariable(6),
    save: makeConstantVariable(15, 'DC 15 Fortitude Save', 'Fort Save'),
  }),
};

const BlindingColoursEvent = ({ variables }) => {
  return (
    <Fragment>
      Shimmering colours dance and play over a{' '}
      <VM v={variables.length} u={dist} /> by{' '}
      <VM v={variables.width} u={dist} /> area in front of the rod. Creatures
      therein are <Condition name="Blinded" /> for{' '}
      <VM v={variables.duration} u={time} /> (
      <VM v={variables.save} u={fortSave} /> negates)
    </Fragment>
  );
};

export default BlindingColoursEvent;
