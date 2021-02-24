import React from 'react';
import ButterflyStreamResult, {
  butterflyStream,
} from './butterflyStreamResult.component';
import DelusionResult, { delusion } from './delusionResult.component';
import DetectThoughtsResult, {
  detectThoughts,
} from './detectThoughtsResult.component';
import FaerieFireResult, { faerieFire } from './faerieFireResult.component';
import GustOfWindResult, { gustOfWind } from './gustOfWindResult.component';
import HeavyRainResult, { heavyRain } from './heavyRainResult.component';
import LightningBoltEvent, {
  lightningBolt,
} from './lightningBoltResult.component';
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
