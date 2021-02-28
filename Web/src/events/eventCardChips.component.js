import { Box } from '@material-ui/core';
import React from 'react';
import CustomChip from '../common/customChip.component';
import DurationEndChip from '../common/durationChip.component';
import { manualTriggerType } from '../state/triggerDialog/triggerDialogState';

const getFinalRoundOrUndefined = (finalRound, duration) =>
  duration && !(duration?.modifier === 0 && duration.result === 0)
    ? finalRound
    : undefined;

const EventCardChips = ({ event }) => {
  const {
    cr,
    variables,
    percentileRoll,
    startRound,
    finalRound,
    triggerType,
  } = event;
  const { result: crVal } = cr;
  const { duration, save } = variables;
  const finalRoundDisplay = getFinalRoundOrUndefined(finalRound, duration);
  return (
    <Box>
      <CustomChip label="d%" value={percentileRoll} />
      <CustomChip label="CR" value={crVal} />
      <CustomChip label="Start" value={startRound} />
      <DurationEndChip value={finalRoundDisplay} />
      {save && <CustomChip label={save?.type ?? 'Save'} value={save.result} />}
      {triggerType &&
        (triggerType === manualTriggerType ? (
          <CustomChip label="Manual Event" />
        ) : (
          <CustomChip label="Storm Event" />
        ))}
    </Box>
  );
};

export default EventCardChips;
