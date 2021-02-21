import React from 'react';
import CustomChip from './customChip.component';

const DurationEndChip = ({ value, startRound }) => {
  if (value === undefined) {
    return <CustomChip label="Instantaneous" />;
  }

  if (value < 20) {
    return <CustomChip label="End" value={value} />;
  }

  const duration = value - startRound;

  if (duration < 600) {
    return (
      <CustomChip label="Lasts (mins)" value={`${Math.floor(duration / 10)}`} />
    );
  }

  return (
    <CustomChip label="Lasts (hrs)" value={`${Math.floor(duration / 600)}h`} />
  );
};

export default DurationEndChip;
