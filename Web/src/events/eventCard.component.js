import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { eventImminant, eventActive } from '../common/colours';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useSelector } from 'react-redux';
import { currentRoundSelector } from '../state/rounds/roundsState';
import EventCardChips from './eventCardChips.component';

const useStyles = makeStyles({
  card: {
    width: '100%',
  },
  cardHeader: {
    backgroundColor: ({ titleColour, expiresThisTurn }) =>
      titleColour ?? (expiresThisTurn ? eventImminant : eventActive),
    color: 'white',
    alignItems: 'flex-start',
    paddingTop: 3,
    paddingBottom: 3,
  },
  expandAction: {
    color: 'white',
    height: '100%',
    marginTop: 12,
  },
  cardContent: {
    paddingTop: 5,
    '&:last-child': {
      paddingBottom: 5,
    },
  },
});

const EventCard = ({
  event,
  titleColour,
  onExpandToggleClicked,
  getEventCardContent,
}) => {
  const { title, expanded, finalRound } = event;
  const currentRound = useSelector(currentRoundSelector);
  const expiresThisTurn = finalRound === currentRound;
  const classes = useStyles({ titleColour, expiresThisTurn });

  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={<EventCardChips event={event} />}
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <IconButton
            className={classes.expandAction}
            onClick={onExpandToggleClicked}
            disableRipple
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      {expanded && (
        <CardContent className={classes.cardContent}>
          {getEventCardContent(event)}
        </CardContent>
      )}
    </Card>
  );
};

EventCard.defaultProps = {
  titleColour: undefined,
};

export default EventCard;
