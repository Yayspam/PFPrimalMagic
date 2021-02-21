import React from 'react';
import {
  makeConstantVariable,
  makeVariable,
} from '../state/activePrimalEvents/activePrimalEventsState';
import CatchyMusicEvent, {
  catchyMusic,
} from './eventComponents/catchyMusicEvent.component';
import CentipedesEvent, {
  centipedes,
} from './eventComponents/centipedesEvent.component';
import ColourDrainEvent, {
  colourDrain,
} from './eventComponents/colourDrainEvent.component';
import ElementalUprisingEvent, {
  elementalUprising,
} from './eventComponents/elementalUprisingEvent.component';
import EnantiomaticSelfEvent, {
  enantiomaticSelf,
} from './eventComponents/enantiomaticSelfEvent.component';
import ExtradimensionalPitEvent, {
  extradimensionalPit,
} from './eventComponents/extradimensionalPit.component';
import HarmEvent, { harm } from './eventComponents/harmEvent.component';
import HealEvent, { heal } from './eventComponents/healEvent.component';
import RainOfSmallObjectsEvent, {
  rainOfSmallObjects,
} from './eventComponents/rainOfSmallObjectsEvent.component';
import UtterDarknessEvent, {
  utterDarkness,
} from './eventComponents/utterDarknessEvent.component';
import ZoneOfUnluckEvent, {
  zoneOfUnluck,
} from './eventComponents/zoneOfUnluckEvent.component';

export const getEventCardContent = event => {
  if (event.title === colourDrain.title) {
    return <ColourDrainEvent event={event} />;
  }

  if (event.title === centipedes.title) {
    return <CentipedesEvent event={event} />;
  }

  if (event.title === catchyMusic.title) {
    return <CatchyMusicEvent event={event} />;
  }

  if (event.title === zoneOfUnluck.title) {
    return <ZoneOfUnluckEvent event={event} />;
  }

  if (event.title === enantiomaticSelf.title) {
    return <EnantiomaticSelfEvent event={event} />;
  }

  if (event.title === extradimensionalPit.title) {
    return <ExtradimensionalPitEvent event={event} />;
  }

  if (event.title === rainOfSmallObjects.title) {
    return <RainOfSmallObjectsEvent event={event} />;
  }

  if (event.title === heal.title) {
    return <HealEvent event={event} />;
  }

  if (event.title === harm.title) {
    return <HarmEvent event={event} />;
  }

  if (event.title === utterDarkness.title) {
    return <UtterDarknessEvent event={event} />;
  }

  if (event.title === elementalUprising.title) {
    return <ElementalUprisingEvent event={event} />;
  }

  return <div>UNKNOWN EVENT {event.title}</div>;
};

export const events = [
  colourDrain,
  centipedes,
  catchyMusic,
  zoneOfUnluck,
  enantiomaticSelf,
  extradimensionalPit,
  rainOfSmallObjects,
  heal,
  harm,
  utterDarkness,
  elementalUprising,
  {
    percentileMin: 55,
    percentileMax: 62,
    title: 'Aurora Borealis',
    createVariables: cr => ({
      elementalCount: makeVariable(6), // new - elemental count, need to figure out how this works to make the CR total work
      save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10'),
      duration: makeConstantVariable(cr), // CR rounds
    }),
  },
  {
    percentileMin: 63,
    percentileMax: 68,
    title: 'Mass Delusion',
    createVariables: cr => ({
      duration: makeConstantVariable(0),
      creatureCount: makeVariable(cr), // 1d(cr) creatures confused
      save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10'),
    }),
  },
  {
    percentileMin: 69,
    percentileMax: 74,
    title: 'Energy Storm',
    createVariables: cr => ({
      energyType: makeVariable(4), // 1d4; 1=acid, 2=cold, 3=electricity, 4=fire
      radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
      damage: makeConstantVariable(cr * 2, 'CR x 2 damage'),
      duration: makeConstantVariable(cr, 'CR rounds'),
      save: makeConstantVariable(cr + 10, 'Reflex Save DC = CR + 10'),
    }),
  },
  {
    percentileMin: 75,
    percentileMax: 78,
    title: 'Telekinesis',
    createVariables: cr => ({
      duration: makeConstantVariable(0),
      radius: makeConstantVariable(cr * 10, 'CR x 10ft.'),
      cmb: makeConstantVariable(cr + 10, 'CMB = CR + 10'),
    }),
  },
  {
    percentileMin: 79,
    percentileMax: 88,
    title: 'Wonderous Magic',
    createVariables: () => ({
      duration: makeConstantVariable(0),
      rodOfWonderPercentile: makeVariable(100), // rod of wander percentile roll
    }),
  },
  {
    percentileMin: 89,
    percentileMax: 94,
    title: 'Teleportation Storm',
    createVariables: cr => ({
      save: makeConstantVariable(cr + 10, 'DC = CR + 10'),
      distance: makeConstantVariable(cr * 5, 'CR x 5ft.'), // 5xCR ft - only for one creature? Not sure on this one
    }),
  },
  {
    percentileMin: 95,
    percentileMax: 98,
    title: 'Magic Jar',
    createVariables: cr => ({
      duration: makeConstantVariable(0),
      save: makeConstantVariable(cr + 10, 'Will Save DC = CR + 10'),
      stunDuration: makeVariable(4), // 1d4 rounds stun duration
      bodyStopDuration: makeConstantVariable(cr, 'CR rounds'),
    }),
  },
  {
    percentileMin: 99,
    percentileMax: 100,
    title: 'Two Simultaneous Events',
    createVariables: () => ({
      duration: makeConstantVariable(0),
      percentileOne: makeVariable(100), // First event percentile
      percentileTwo: makeVariable(100), // Second even percentile
    }), // Not sure how to do this one...
  },
];

export const getEvent = percentileRoll => {
  const eventsInRange = events.filter(
    e => percentileRoll >= e.percentileMin && percentileRoll <= e.percentileMax
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
