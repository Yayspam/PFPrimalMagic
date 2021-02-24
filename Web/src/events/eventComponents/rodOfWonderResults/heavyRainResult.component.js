import React, { Fragment } from 'react';
import AonLink from '../../../common/linkDisplay.component';
import VM, { dist, time } from '../../../common/variableMark.component';
import { makeConstantVariable } from '../../../state/activePrimalEvents/activePrimalEventsState';

export const heavyRain = {
  percentileMin: 31,
  percentileMax: 33,
  title: 'Heavy Rain',
  createVariables: () => ({
    duration: makeConstantVariable(1, '1 round'),
    radius: makeConstantVariable(60, '60ft. Radius'),
  }),
};

const HeavyRainResult = ({ variables }) => {
  return (
    <Fragment>
      <AonLink
        link="https://aonprd.com/Rules.aspx?Name=Rain,%20Snow,%20Sleet,%20and%20Hail&Category=Weather#ctl00_MainContent_RulesResult:~:text=Rain:"
        name="Heavy Rain"
      />{' '}
      falls for <VM v={variables.duration} u={time} /> in a{' '}
      <VM v={variables.radius} u={dist} /> radius centered on the rod wielder
    </Fragment>
  );
};

export default HeavyRainResult;
