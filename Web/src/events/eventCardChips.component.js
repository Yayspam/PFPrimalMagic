import { Box } from '@material-ui/core';
import React from 'react';
import CrChip from '../common/crChip.component';
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
    tableRoll,
    startRound,
    finalRound,
    triggerType,
  } = event;
  const { duration, save } = variables;
  const finalRoundDisplay = getFinalRoundOrUndefined(finalRound, duration);
  return (
    <Box>
      <CustomChip label="Table" value={tableRoll} />
      <CustomChip label="d%" value={percentileRoll} />
      <CrChip crVariable={cr} />
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
