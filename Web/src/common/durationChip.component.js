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

  if (duration < 59 * 10) {
    const durationInMins = Math.ceil(duration / 10);
    const plural = durationInMins > 1;
    return (
      <CustomChip
        label={`Min${plural ? 's' : ''} Remain${plural ? '' : 's'}`}
        value={durationInMins}
      />
    );
  }

  if (duration < 23 * 60 * 10) {
    const durationInHours = Math.ceil(duration / 600);
    const plural = durationInHours > 1;
    return (
      <CustomChip
        label={`Hr${plural ? 's' : ''} Remain${plural ? '' : 's'}`}
        value={`${durationInHours}`}
      />
    );
  }

  const durationInDays = Math.ceil(duration / (24 * 60 * 10));
  const plural = durationInDays > 1;
  return (
    <CustomChip
      label={`Day${plural ? 's' : ''} Remain${plural ? '' : 's'}`}
      value={`${durationInDays}`}
    />
  );
};

export default DurationEndChip;
