import React from 'react';
import { useSelector } from 'react-redux';
import { currentRoundSelector } from '../state/rounds/roundsState';
import CustomChip from './customChip.component';

const DurationEndChip = ({ value }) => {
  const currentRound = useSelector(currentRoundSelector);

  if (value === undefined) {
    return <CustomChip label="Instantaneous" />;
  }

  const duration = value - currentRound;

  if (value < 10 || duration < 10) {
    return <CustomChip label="End" value={value} />;
  }

  if (duration < 600) {
    const durationInMins = Math.ceil(duration / 10);
    const plural = durationInMins > 1;
    return (
      <CustomChip
        label={`Min${plural ? 's' : ''} Remain${plural ? '' : 's'}`}
        value={durationInMins}
      />
    );
  }

  return (
    <CustomChip label="Hrs Remain" value={`${Math.round(duration / 600)}h`} />
  );
};

export default DurationEndChip;
