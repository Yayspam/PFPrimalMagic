import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { manualTriggerHeader } from '../common/colours';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useDispatch } from 'react-redux';
import { toggleTriggerDialogPrimalEventExpanded } from '../state/triggerDialog/triggerDialogState';
import ColourDrainEvent from './eventComponents/colourDrainEvent.component';

const useStyles = makeStyles({
  card: {
    marginTop: 10,
  },
  cardHeader: {
    backgroundColor: ({ titleColour }) => titleColour ?? manualTriggerHeader, // Figure this out
    color: 'white',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 3,
  },
  expandAction: {
    color: 'white',
  },
  cardContent: {
    paddingTop: 5,
    '&:last-child': {
      paddingBottom: 5,
    },
  },
});

const EventCard = ({ event, titleColour }) => {
  const { title, expanded } = event;
  const classes = useStyles({ titleColour });
  const dispatch = useDispatch();

  const onExpandToggleClicked = () => {
    dispatch(toggleTriggerDialogPrimalEventExpanded());
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ color: 'white' }}
        action={
          <IconButton
            className={classes.expandAction}
            onClick={onExpandToggleClicked}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      {expanded && (
        <CardContent className={classes.cardContent}>
          <ColourDrainEvent event={event} />
        </CardContent>
      )}
    </Card>
  );
};

EventCard.defaultProps = {
  titleColour: undefined,
};

export default EventCard;
