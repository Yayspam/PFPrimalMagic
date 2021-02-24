import React, { Fragment } from 'react';
import AonLink from '../../../common/linkDisplay.component';
import VM, { dist, time } from '../../../common/variableMark.component';
import {
  makeConstantVariable,
  makeVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';

export const summonAnimal = {
  percentileMin: 34,
  percentileMax: 36,
  title: 'Summon Animal',
  createVariables: () => ({
    animalSummonPercentile: makeVariable(100),
  }),
};

const handleAnimalType = {
  getValues: variable => {
    console.log('CALLED', variable);

    if (variable.result <= 25) {
      return {
        value: (
          <Fragment>
            a{' '}
            <AonLink
              link="https://aonprd.com/MonsterDisplay.aspx?ItemName=Rhinoceros"
              name="rhino"
              noHighlight
            />
          </Fragment>
        ),
      };
    }

    if (variable.result <= 50) {
      return {
        value: (
          <Fragment>
            an{' '}
            <AonLink
              link="https://aonprd.com/MonsterDisplay.aspx?ItemName=Elephant"
              name="elephant"
              noHighlight
            />
          </Fragment>
        ),
      };
    }

    return {
      value: (
        <Fragment>
          a{' '}
          <AonLink
            link="https://aonprd.com/MonsterDisplay.aspx?ItemName=Rat"
            name="mouse"
            noHighlight
          />
        </Fragment>
      ),
    };
  },
  getToolTip: variable => {
    return `1d% [${variable.result}]: 01-25=rhino; 26-50=elephant; 51-100=mouse`;
  },
};

const SummonAnimalResult = ({ variables }) => {
  return (
    <Fragment>
      Summons <VM v={variables.animalSummonPercentile} h={handleAnimalType} />
    </Fragment>
  );
};

export default SummonAnimalResult;
