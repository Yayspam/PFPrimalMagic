import React from 'react';
import {
  makeConstantVariable,
  makeVariable,
} from '../state/activePrimalEvents/activePrimalEventsState';
import AuroraBorealisEvent, {
  auroraBorealis,
} from './eventComponents/auroraBorealisEvent.component';
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
import EnergyStormEvent, {
  energyStorm,
} from './eventComponents/energyStormEvent.component';
import ExtradimensionalPitEvent, {
  extradimensionalPit,
} from './eventComponents/extradimensionalPit.component';
import HarmEvent, { harm } from './eventComponents/harmEvent.component';
import HealEvent, { heal } from './eventComponents/healEvent.component';
import MassDelusionEvent, {
  massDelusion,
} from './eventComponents/massDelusionEvent.component';
import RainOfSmallObjectsEvent, {
  rainOfSmallObjects,
} from './eventComponents/rainOfSmallObjectsEvent.component';
import TrippingTelekinesisEvent, {
  trippingTelekinesis,
} from './eventComponents/trippingTelekinesisEvent.component';
import UtterDarknessEvent, {
  utterDarkness,
} from './eventComponents/utterDarknessEvent.component';
import WonderousMagicEvent, {
  wonderousMagic,
} from './eventComponents/wonderousMagicEvent.component';
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

  if (event.title === auroraBorealis.title) {
    return <AuroraBorealisEvent event={event} />;
  }

  if (event.title === massDelusion.title) {
    return <MassDelusionEvent event={event} />;
  }

  if (event.title === energyStorm.title) {
    return <EnergyStormEvent event={event} />;
  }

  if (event.title === trippingTelekinesis.title) {
    return <TrippingTelekinesisEvent event={event} />;
  }

  if (event.title === wonderousMagic.title) {
    return <WonderousMagicEvent event={event} />;
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
  auroraBorealis,
  massDelusion,
  energyStorm,
  trippingTelekinesis,
  wonderousMagic,
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
