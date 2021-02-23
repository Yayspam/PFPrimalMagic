import React, { Fragment } from 'react';
import Spell from '../../../common/spellDisplay.component';
import VM, { time } from '../../../common/variableMark.component';
import { makeVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const detectThoughts = {
  percentileMin: 21,
  percentileMax: 25,
  title: 'Detect Thoughts',
  createVariables: () => ({
    duration: makeVariable(4),
  }),
};

const DetectThoughtsResult = ({ variables }) => {
  return (
    <Fragment>
      Wielder learns the target&apos;s surface thoughts (as with{' '}
      <Spell name="Detect Thoughts" casterLevel={variables.casterLevel} />) for{' '}
      <VM v={variables.duration} u={time} />
    </Fragment>
  );
};

export default DetectThoughtsResult;
