import { Box } from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';
import React, { Fragment, useState } from 'react';
import CustomChip from '../../common/customChip.component';
import DurationEndChip from '../../common/durationChip.component';
import {
  makeConstantVariable,
  makeLimitedVariable,
} from '../../state/activePrimalEvents/activePrimalEventsState';
import { calculateFinalRound } from '../../state/manualTrigger/manualTriggerState';
import EventCard from '../eventCard.component';
import { getEvent } from '../events';

const prefixVariableKeys = (variables, prefix) => {
  let newVariables = {};

  Object.entries(variables).forEach(([key, value]) => {
    newVariables[`${prefix}${key}`] = value;
  });

  return newVariables;
};

const removeVariableKeyPrefix = (variables, prefix) => {
  let newVariables = {
    ...variables,
  };

  Object.entries(variables)
    .filter(([key]) => key.startsWith(prefix))
    .forEach(([key, value]) => {
      newVariables[key.replace(prefix, '')] = value;
    });

  return newVariables;
};

const longestDuration = (firstVars, secondVars) => {
  const firstDuration = firstVars.oneduration;
  const secondDuration = secondVars.twoduration;

  if (!firstDuration && !secondDuration) {
    return makeConstantVariable(0);
  }

  if (!secondDuration) {
    return firstDuration;
  }

  if (!firstDuration) {
    return secondDuration;
  }

  return firstDuration.result > secondDuration.result
    ? firstDuration
    : secondDuration;
};

export const twoSimultaneousEvents = {
  percentileMin: 99,
  percentileMax: 100,
  title: 'Two Simultaneous Events',
  createVariables: cr => {
    // Never allow either simultaneous event to be another two simultaneous events
    const percentileOne = makeLimitedVariable(100, 98);
    const percentileTwo = makeLimitedVariable(100, 98);

    const eventOne = getEvent(percentileOne.result);
    const eventOneVariables = prefixVariableKeys(
      eventOne.createVariables(cr),
      'one'
    );

    const eventTwo = getEvent(percentileTwo.result);
    const eventTwoVariables = prefixVariableKeys(
      eventTwo.createVariables(cr),
      'two'
    );

    const duration = longestDuration(eventOneVariables, eventTwoVariables);

    return {
      duration: duration,
      percentileOne,
      percentileTwo,
      ...eventOneVariables,
      ...eventTwoVariables,
    };
  },
};

const deconstructEvent = (
  event,
  isOpen,
  percentile,
  variables,
  variablePrefix
) => {
  const title = getEvent(percentile).title;
  const deconstructedEventVariables = removeVariableKeyPrefix(
    variables,
    variablePrefix
  );
  const finalRound = calculateFinalRound(
    deconstructedEventVariables.duration,
    event.startRound
  );

  return {
    ...event,
    title,
    percentileRoll: percentile,
    variables: deconstructedEventVariables,
    expanded: isOpen,
    finalRound,
  };
};

const TwoSimultaneousEventsEvent = ({ event }) => {
  const { cr, variables, percentileRoll, startRound, finalRound } = event;
  const { result: crVal } = cr;
  const { percentileOne, percentileTwo, duration } = variables;
  const isInstantaneous = duration.result === 0;

  const [eventOneOpen, setEventOneOpen] = useState(true);
  const [eventTwoOpen, setEventTwoOpen] = useState(true);
  const eventOne = deconstructEvent(
    event,
    eventOneOpen,
    percentileOne.result,
    variables,
    'one'
  );
  const eventTwo = deconstructEvent(
    event,
    eventTwoOpen,
    percentileTwo.result,
    variables,
    'two'
  );

  return (
    <Fragment>
      <Box>
        <CustomChip label="d%" value={percentileRoll} />
        <CustomChip label="CR" value={crVal} />
        <CustomChip label="Start" value={startRound} />
        <DurationEndChip value={isInstantaneous ? undefined : finalRound} />
      </Box>
      <Box>
        <EventCard
          event={eventOne}
          titleColour={cyan['A700']}
          onExpandToggleClicked={() => setEventOneOpen(!eventOneOpen)}
        />
        <EventCard
          event={eventTwo}
          titleColour={cyan['A700']}
          onExpandToggleClicked={() => setEventTwoOpen(!eventTwoOpen)}
        />
      </Box>
    </Fragment>
  );
};

export default TwoSimultaneousEventsEvent;
