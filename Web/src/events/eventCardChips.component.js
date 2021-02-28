import { Box } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomChip from '../common/customChip.component';
import DurationEndChip from '../common/durationChip.component';
import { manualTriggerType } from '../state/triggerDialog/triggerDialogState';
import VariableChip from '../common/variableChip.component';

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
  const { duration, save, initiative } = variables;
  const finalRoundDisplay = getFinalRoundOrUndefined(finalRound, duration);
  return (
    <Box>
      <CustomChip label="Table" value={tableRoll} />
      <CustomChip label="d%" value={percentileRoll} />
      <VariableChip label="CR" variable={cr} />
      <CustomChip label="Start" value={startRound} />
      <DurationEndChip value={finalRoundDisplay} />
      {save && <CustomChip label={save?.type ?? 'Save'} value={save.result} />}
      {triggerType &&
        (triggerType === manualTriggerType ? (
          <CustomChip label="Manual Event" />
        ) : (
          <Fragment>
            <CustomChip label="Storm Event" />
            <VariableChip label="Init" variable={initiative} />
          </Fragment>
        ))}
    </Box>
  );
};

export default EventCardChips;
