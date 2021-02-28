import React from 'react';
import {
  getLimitedEventCardContent,
  limitedEvents,
} from './eventComponents/twoSimlultaneousEvents/limitedEvents';
import TwoSimultaneousEventsEvent, {
  twoSimultaneousEvents,
} from './eventComponents/twoSimlultaneousEvents/twoSimultaneousEventsEvent.component';

export const getEventCardContent = event => {
  if (event.title === twoSimultaneousEvents.title) {
    return <TwoSimultaneousEventsEvent event={event} />;
  }

  return getLimitedEventCardContent(event);
};

export const events = [...limitedEvents, twoSimultaneousEvents];

export const getEvent = (percentileRoll, tableRoll) => {
  const eventsInRange = events
    .filter(e => e.table === tableRoll)
    .filter(
      e =>
        percentileRoll >= e.percentileMin && percentileRoll <= e.percentileMax
    );

  if (eventsInRange.length === 0) {
    return events[0];
  }

  return eventsInRange[0];
};

export const getEventByTitle = title => {
  const eventsWithTitle = events.filter(e => e.title === title);

  if (eventsWithTitle.length === 0) {
    return events[0];
  }

  return eventsWithTitle[0];
};
