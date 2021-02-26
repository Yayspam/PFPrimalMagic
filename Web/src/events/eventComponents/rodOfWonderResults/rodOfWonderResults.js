import React from 'react';
import BlindingColoursEvent, {
  blindingColours,
} from './blindingColoursResult.component';
import ButterflyStreamResult, {
  butterflyStream,
} from './butterflyStreamResult.component';
import ColourChangeResult, {
  colourChange,
} from './colourChangeResult.component';
import DarknessResult, { darkness } from './darknessResult.component';
import DelusionResult, { delusion } from './delusionResult.component';
import DetectThoughtsResult, {
  detectThoughts,
} from './detectThoughtsResult.component';
import EnlargePersonResult, {
  enlargePerson,
} from './enlargePersonResult.component';
import EtherealObjectResult, {
  etherealObject,
} from './etherealObjectResult.component';
import FaerieFireResult, { faerieFire } from './faerieFireResult.component';
import FireballResult, { fireball } from './fireballResult.component';
import FleshToStoneResult, {
  fleshToStone,
} from './fleshToStoneResult.component';
import GemsResult, { gems } from './gemsResult.component';
import GrassResult, { grass } from './grassResult.component';
import GustOfWindResult, { gustOfWind } from './gustOfWindResult.component';
import HeavyRainResult, { heavyRain } from './heavyRainResult.component';
import InvisibilityResult, {
  invisibility,
} from './invisibilityResult.component';
import LeavesResult, { leaves } from './leavesResult.component';
import LightningBoltEvent, {
  lightningBolt,
} from './lightningBoltResult.component';
import ReduceWielderResult, {
  reduceWielder,
} from './reduceWielderResult.component';
import SlowResult, { slow } from './slowResult.component';
import StinkingCloudResult, { stinkingCloud } from './stinkingCloud.component';
import SummonAnimalResult, {
  summonAnimal,
} from './summonAnimalResult.component';

export const getRodOfWonderComponent = (rodResult, variables) => {
  if (rodResult.title === slow.title) {
    return <SlowResult variables={variables} />;
  }

  if (rodResult.title === faerieFire.title) {
    return <FaerieFireResult variables={variables} />;
  }

  if (rodResult.title === delusion.title) {
    return <DelusionResult variables={variables} />;
  }

  if (rodResult.title === gustOfWind.title) {
    return <GustOfWindResult variables={variables} />;
  }

  if (rodResult.title === detectThoughts.title) {
    return <DetectThoughtsResult variables={variables} />;
  }

  if (rodResult.title === stinkingCloud.title) {
    return <StinkingCloudResult variables={variables} />;
  }

  if (rodResult.title === heavyRain.title) {
    return <HeavyRainResult variables={variables} />;
  }

  if (rodResult.title === summonAnimal.title) {
    return <SummonAnimalResult variables={variables} />;
  }

  if (rodResult.title === lightningBolt.title) {
    return <LightningBoltEvent variables={variables} />;
  }

  if (rodResult.title === butterflyStream.title) {
    return <ButterflyStreamResult variables={variables} />;
  }

  if (rodResult.title === enlargePerson.title) {
    return <EnlargePersonResult variables={variables} />;
  }

  if (rodResult.title === darkness.title) {
    return <DarknessResult variables={variables} />;
  }

  if (rodResult.title === grass.title) {
    return <GrassResult variables={variables} />;
  }

  if (rodResult.title === etherealObject.title) {
    return <EtherealObjectResult variables={variables} />;
  }

  if (rodResult.title === reduceWielder.title) {
    return <ReduceWielderResult variables={variables} />;
  }

  if (rodResult.title === fireball.title) {
    return <FireballResult variables={variables} />;
  }

  if (rodResult.title === invisibility.title) {
    return <InvisibilityResult variables={variables} />;
  }

  if (rodResult.title === leaves.title) {
    return <LeavesResult variables={variables} />;
  }

  if (rodResult.title === gems.title) {
    return <GemsResult variables={variables} />;
  }

  if (rodResult.title === blindingColours.title) {
    return <BlindingColoursEvent variables={variables} />;
  }

  if (rodResult.title === colourChange.title) {
    return <ColourChangeResult variables={variables} />;
  }

  if (rodResult.title === fleshToStone.title) {
    return <FleshToStoneResult variables={variables} />;
  }

  return <div>UNKNOWN ROD OF WONDER RESULT {rodResult.title}</div>;
};

export const rodOfWonderResults = [
  slow,
  faerieFire,
  delusion,
  gustOfWind,
  detectThoughts,
  stinkingCloud,
  heavyRain,
  summonAnimal,
  lightningBolt,
  butterflyStream,
  enlargePerson,
  darkness,
  grass,
  etherealObject,
  reduceWielder,
  fireball,
  invisibility,
  leaves,
  gems,
  blindingColours,
  colourChange,
  fleshToStone,
];

export const getRodResult = percentileRoll => {
  const results = rodOfWonderResults.filter(
    e => percentileRoll >= e.percentileMin && percentileRoll <= e.percentileMax
  );

  if (results.length === 0) {
    return rodOfWonderResults[0];
  }

  return results[0];
};

export const getRodResultByTitle = title => {
  const results = rodOfWonderResults.filter(e => e.title === title);

  if (results.length === 0) {
    return rodOfWonderResults[0];
  }

  return results[0];
};
