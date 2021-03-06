import React from 'react';
import AuroraBorealisEvent, {
  auroraBorealis,
} from '../auroraBorealisEvent.component';
import BlackTentaclesEvent, {
  blackTentacles,
} from '../blackTentaclesEvent.component';
import BoomingCannonsEvent, {
  boomingCannons,
} from '../boomingCannonsEvent.component';
import CatchyMusicEvent, { catchyMusic } from '../catchyMusicEvent.component';
import CentipedesEvent, { centipedes } from '../centipedesEvent.component';
import ColourDrainEvent, { colourDrain } from '../colourDrainEvent.component';
import ElementalGrudgeEvent, {
  elementalGrudge,
} from '../elementalGrudgeEvent.component';
import ElementalUprisingEvent, {
  elementalUprising,
} from '../elementalUprisingEvent.component';
import EnantiomaticSelfEvent, {
  enantiomaticSelf,
} from '../enantiomaticSelfEvent.component';
import EnergeticTouchEvent, {
  energeticTouch,
} from '../energeticTouchEvent.component';
import EnergyStormEvent, { energyStorm } from '../energyStormEvent.component';
import ExtradimensionalPitEvent, {
  extradimensionalPit,
} from '../extradimensionalPit.component';
import ForgeOfCriticalsEvent, {
  forgeOfCriticals,
} from '../forgeOfCriticals.component';
import HarmEvent, { harm } from '../harmEvent.component';
import HealEvent, { heal } from '../healEvent.component';
import IcyDreadEvent, { icyDread } from '../icyDread.component';
import MagicJarEvent, { magicJar } from '../magicJarEvent.component';
import MagneticFieldEvent, {
  magneticField,
} from '../magneticFieldEvent.component';
import MassDelusionEvent, {
  massDelusion,
} from '../massDelusionEvent.component';
import OrbOfGreaseEvent, { orbOfGrease } from '../orbOfGreaseEvent.component';
import RainOfSmallObjectsEvent, {
  rainOfSmallObjects,
} from '../rainOfSmallObjectsEvent.component';
import TeleportationStormEvent, {
  teleportationStorm,
} from '../teleportationStormEvent.component';
import TrippingTelekinesisEvent, {
  trippingTelekinesis,
} from '../trippingTelekinesisEvent.component';
import UtterDarknessEvent, {
  utterDarkness,
} from '../utterDarknessEvent.component';
import WeightlessnessEvent, {
  weightlessness,
} from '../weightlessnessEvent.component';
import WonderousMagicEvent, {
  wonderousMagic,
} from '../wonderousMagicEvent.component';
import ZoneOfUnluckEvent, {
  zoneOfUnluck,
} from '../zoneOfUnluckEvent.component';

export const getLimitedEventCardContent = event => {
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

  if (event.title === teleportationStorm.title) {
    return <TeleportationStormEvent event={event} />;
  }

  if (event.title === magicJar.title) {
    return <MagicJarEvent event={event} />;
  }

  if (event.title === forgeOfCriticals.title) {
    return <ForgeOfCriticalsEvent event={event} />;
  }

  if (event.title === blackTentacles.title) {
    return <BlackTentaclesEvent event={event} />;
  }

  if (event.title === boomingCannons.title) {
    return <BoomingCannonsEvent event={event} />;
  }

  if (event.title === magneticField.title) {
    return <MagneticFieldEvent event={event} />;
  }

  if (event.title === energeticTouch.title) {
    return <EnergeticTouchEvent event={event} />;
  }

  if (event.title === weightlessness.title) {
    return <WeightlessnessEvent event={event} />;
  }

  if (event.title === icyDread.title) {
    return <IcyDreadEvent event={event} />;
  }

  if (event.title === elementalGrudge.title) {
    return <ElementalGrudgeEvent event={event} />;
  }

  if (event.title === orbOfGrease.title) {
    return <OrbOfGreaseEvent event={event} />;
  }

  return <div>UNKNOWN EVENT {event.title}</div>;
};

export const limitedEvents = [
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
  teleportationStorm,
  magicJar,
  forgeOfCriticals,
  blackTentacles,
  boomingCannons,
  magneticField,
  energeticTouch,
  weightlessness,
  icyDread,
  elementalGrudge,
  orbOfGrease,
];

export const getLimitedEvent = (percentileRoll, tableRoll) => {
  const eventsInRange = limitedEvents
    .filter(e => e.table === tableRoll)
    .filter(
      e =>
        percentileRoll >= e.percentileMin && percentileRoll <= e.percentileMax
    );

  if (eventsInRange.length === 0) {
    return limitedEvents[0];
  }

  return eventsInRange[0];
};
