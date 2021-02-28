import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { rollTableDice } from '../../../random';
import {
  makeConstantVariable,
  makeLimitedVariable,
} from '../../../state/activePrimalEvents/activePrimalEventsState';
import { calculateFinalRound } from '../../../state/manualTrigger/manualTriggerState.thunk';
import EventCard from '../../eventCard.component';
import { getLimitedEvent, getLimitedEventCardContent } from './limitedEvents';

const useStyles = makeStyles({
  divider: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
});

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
  table: 1,
  percentileMin: 99,
  percentileMax: 100,
  title: 'Two Simultaneous Events',
  createVariables: cr => {
    // Never allow either simultaneous event to be another two simultaneous events
    const percentileOne = makeLimitedVariable(100, 98);
    const tableOne = rollTableDice();
    const percentileTwo = makeLimitedVariable(100, 98);
    const tableTwo = rollTableDice();

    const eventOne = getLimitedEvent(percentileOne.result, tableOne);
    const eventOneVariables = prefixVariableKeys(
      eventOne.createVariables(cr),
      'one'
    );

    const eventTwo = getLimitedEvent(percentileTwo.result, tableTwo);
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
  const title = getLimitedEvent(percentile).title;
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
  const classes = useStyles();
  const { percentileOne, percentileTwo } = event.variables;

  const [eventOneOpen, setEventOneOpen] = useState(true);
  const [eventTwoOpen, setEventTwoOpen] = useState(true);
  const eventOne = deconstructEvent(
    event,
    eventOneOpen,
    percentileOne.result,
    event.variables,
    'one'
  );
  const eventTwo = deconstructEvent(
    event,
    eventTwoOpen,
    percentileTwo.result,
    event.variables,
    'two'
  );

  return (
    <Box>
      <Typography>The following two events occur simultaneously</Typography>
      <Divider className={classes.divider} />
      <EventCard
        event={eventOne}
        titleColour={cyan['A700']}
        onExpandToggleClicked={() => setEventOneOpen(!eventOneOpen)}
        getEventCardContent={getLimitedEventCardContent}
      />
      <Divider className={classes.divider} />
      <EventCard
        event={eventTwo}
        titleColour={cyan['A700']}
        onExpandToggleClicked={() => setEventTwoOpen(!eventTwoOpen)}
        getEventCardContent={getLimitedEventCardContent}
      />
    </Box>
  );
};

export default TwoSimultaneousEventsEvent;
