import React from 'react';
import DelusionResult, { delusion } from './delusionResult.component';
import DetectThoughtsResult, {
  detectThoughts,
} from './detectThoughtsResult.component';
import FaerieFireResult, { faerieFire } from './faerieFireResult.component';
import GustOfWindResult, { gustOfWind } from './gustOfWindResult.component';
import SlowResult, { slow } from './slowResult.component';
import StinkingCloudResult, { stinkingCloud } from './stinkingCloud.component';

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

  return <div>UNKNOWN ROD OF WONDER RESULT {rodResult.title}</div>;
};

export const rodOfWonderResults = [
  slow,
  faerieFire,
  delusion,
  gustOfWind,
  detectThoughts,
  stinkingCloud,
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
