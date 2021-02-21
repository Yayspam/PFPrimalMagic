import React from 'react';
import {
  makeConstantVariable,
  makeVariable,
} from '../state/activePrimalEvents/activePrimalEventsState';
import CentipedesEvent, {
  centipedes,
} from './eventComponents/centipedesEvent.component';
import ColourDrainEvent, {
  colourDrain,
} from './eventComponents/colourDrainEvent.component';

export const getEventCardContent = event => {
  if (event.title === colourDrain.title) {
    return <ColourDrainEvent event={event} />;
  }

  if (event.title === centipedes.title) {
    return <CentipedesEvent event={event} />;
  }

  return <div>UNKNOWN EVENT {event.title}</div>;
};

export const events = [
  colourDrain,
  centipedes,
  {
    percentileMin: 11,
    percentileMax: 14,
    title: 'Music',
    createVariables: cr => ({
      duration: makeConstantVariable(cr * 10, 'CR mins'),
      chantType: makeVariable(4), // 1d4; 1=Ulfen battle chants, 2=Chelish opera arias, 3=Desnan Prayers, 4=Vudrani monastic chants
    }),
  },
  {
    percentileMin: 15,
    percentileMax: 18,
    title: 'Zone of Unluck',
    createVariables: cr => ({
      radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
      duration: makeConstantVariable(cr * 10 * 60, 'CR hours'),
    }),
  },
  {
    percentileMin: 19,
    percentileMax: 22,
    title: 'Mirror Image',
    createVariables: () => ({}),
  },
  {
    percentileMin: 23,
    percentileMax: 26,
    title: 'Pit',
    createVariables: cr => ({
      depth: makeConstantVariable(cr * 10, 'CR x 10ft.'),
    }),
  },
  {
    percentileMin: 27,
    percentileMax: 32,
    title: 'Tiny Object Rain',
    createVariables: cr => ({
      radius: makeConstantVariable(cr * 5, 'CR x 5ft.'),
      duration: makeConstantVariable(cr, 'CR rounds'),
    }),
  },
  {
    percentileMin: 33,
    percentileMax: 38,
    title: 'Heal',
    createVariables: cr => ({
      casterLevel: makeConstantVariable(cr, 'CL = CR'),
    }),
  },
  {
    percentileMin: 39,
    percentileMax: 44,
    title: 'Harm',
    createVariables: cr => ({
      casterLevel: makeConstantVariable(cr, 'CL = CR'),
    }),
  },
  {
    percentileMin: 45,
    percentileMax: 48,
    title: 'Darkness',
    createVariables: cr => ({
      depth: makeConstantVariable(cr * 10, 'CR x 10ft.'),
    }),
  },
  {
    percentileMin: 49,
    percentileMax: 54,
    title: 'Elemental Uprising',
    createVariables: () => ({
      elementalCount: makeVariable(6), // new - elemental count, need to figure out how this works to make the CR total work
    }),
  },
  {
    percentileMin: 55,
    percentileMax: 62,
    title: 'Aurora Borealis',
    createVariables: cr => ({
      elementalCount: makeVariable(6), // new - elemental count, need to figure out how this works to make the CR total work
      save: makeConstantVariable(cr + 10, 'DC = CR + 10'),
      duration: makeConstantVariable(cr), // CR rounds
    }),
  },
  {
    percentileMin: 63,
    percentileMax: 68,
    title: 'Mass Delusion',
    createVariables: cr => ({
      creatureCount: makeVariable(cr), // 1d(cr) creatures confused
      save: makeConstantVariable(cr + 10, 'DC = CR + 10'),
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
      save: makeConstantVariable(cr + 10, 'DC = CR + 10'),
    }),
  },
  {
    percentileMin: 75,
    percentileMax: 78,
    title: 'Telekinesis',
    createVariables: cr => ({
      radius: makeConstantVariable(cr * 10, 'CR x 10ft.'),
      cmb: makeConstantVariable(cr + 10, 'CMB = CR + 10'),
    }),
  },
  {
    percentileMin: 79,
    percentileMax: 88,
    title: 'Wonderous Magic',
    createVariables: () => ({
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
      save: makeConstantVariable(cr + 10, 'DC = CR + 10'),
      stunDuration: makeVariable(4), // 1d4 rounds stun duration
      bodyStopDuration: makeConstantVariable(cr, 'CR rounds'),
    }),
  },
  {
    percentileMin: 99,
    percentileMax: 100,
    title: 'Two Simultaneous Events',
    createVariables: () => ({
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
