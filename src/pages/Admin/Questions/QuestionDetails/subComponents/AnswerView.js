import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import React, { Fragment } from 'react';
import GridContainer from '../../../../../components/grid/GridContainer';
import GridItem from '../../../../../components/grid/GridItem';
import { useStyles } from '../../../../../styles/Admin/questionFormStyles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import {
  acceptAnswer,
  rejectAnswer,
  rollbackAnswer,
  rateAnswer,
} from '../../../../../apis/answersAPI';
import authManager from '../../../../../services/authManager';
import createMarkup from '../../../../../services/markup';
import AcceptAndRejectActionButtons from './AcceptAndRejectActionButtons';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import { useState } from 'react';
import SubmitButton from 'components/buttons/SubmitButton';
import t from '../../../../../locales/en/answersView.json';
import ShowMore from '../../../../../components/typography/ShowMore';

const AnswerView = ({ answer, index, setRating }) => {
  const classes = useStyles();

  const [answerState, setAnswerState] = useState(answer.state);
  const onChangeRating = (index, newValue) => {
    setRating(index, newValue);
    rateAnswer(answer.id, newValue);
  };

  const onAcceptAnswer = () => {
    acceptAnswer(answer.id).then((response) => {
      setAnswerState(response.data.state);
    });
  };

  const onRejectAnswer = () => {
    rejectAnswer(answer.id).then((response) => {
      setAnswerState(response.data.state);
    });
  };

  const onRollback = () => {
    rollbackAnswer(answer.id).then((response) => {
      setAnswerState(response.data.state);
    });
  };

  return (
    <Fragment>
      <div className={answerState === 'rejected' ? classes.rejectedAnswer : ''}>
        <GridContainer>
          <GridItem xs={12} className={classes.answerRowStyles}>
            {!authManager.isAdviser() && (
              <Rating
                name={`rateAnswer-${index}`}
                readOnly={true}
                value={answer.rating}
                onChange={(event, newValue) => {
                  onChangeRating(index, newValue);
                }}
              />
            )}
          </GridItem>
          <GridItem xs={2} className={classes.answerRowStyles}>
            {authManager.isAdmin() && (
              <Grid
                id={answer.referenceNumber}
                container
                alignContent='row'
                className={classes.answerFieldStyle}>
                <Typography className={classes.answerFieldLabel}>
                  # Answer:
                </Typography>
                <Typography> {answer.referenceNumber} </Typography>
              </Grid>
            )}
          </GridItem>
          <GridItem xs={10} className={classes.answerRowStyles}>
            <Grid
              container
              alignContent='row'
              className={classes.answerFieldStyle}>
              <Typography>
                {new Date(answer.createdAt).toLocaleString()}
              </Typography>
            </Grid>
          </GridItem>
          <GridItem xs={12} className={classes.answerRowStyles}>
            <Grid
              container
              alignContent='row'
              className={classes.answerFieldStyle}>
              <Typography className={classes.answerFieldLabel}>
                Consultant:
              </Typography>
              <Tooltip
                title={<Typography># {answer.userReferenceNumber}</Typography>}>
                <Typography>{answer.userName}</Typography>
              </Tooltip>
            </Grid>
          </GridItem>
          <GridItem xs={12} className={classes.answerRowStyles}>
            <Grid item className={classes.answerContent}>
              <ShowMore>
                <div
                  dangerouslySetInnerHTML={createMarkup(answer.content)}></div>
              </ShowMore>
            </Grid>
          </GridItem>
          <GridItem xs={12} className={classes.answerRowStyles}>
            {answer.attachments?.map((attachment) => (
              <Chip
                className={classes.answerAttachment}
                size='small'
                label={attachment.filename}
                onClick={() => {
                  window.open(attachment.url, '_blank');
                }}
              />
            ))}
          </GridItem>
          <GridItem xs={2} className={classes.answerRowStyles}>
            {authManager.isAdviser() && (
              <Rating
                name={`rateAnswer-${index}`}
                readOnly={false}
                value={answer.rating}
                onChange={(event, newValue) => {
                  onChangeRating(index, newValue);
                }}
              />
            )}
          </GridItem>
          <GridItem xs={10}>
            {authManager.isAdmin() && answerState == 'pending' && (
              <AcceptAndRejectActionButtons
                acceptButtonProps={{
                  id: `accept-${answer.referenceNumber}`,
                  onClick: onAcceptAnswer,
                }}
                rejectButtonProps={{
                  id: `reject-${answer.referenceNumber}`,
                  onClick: onRejectAnswer,
                }}
              />
            )}
          </GridItem>
          <Grid container direction='row-reverse' alignItems='flex-end'>
            {authManager.isAdmin() && answerState != 'pending' && (
              <SubmitButton
                id={`rollback-${answer.referenceNumber}`}
                className={classes.rollbackButton}
                onClick={() => onRollback()}
                buttonText={t['rollback']}
              />
            )}
            {authManager.isClient() && (
              <SubmitButton
                id={`call-${answer.referenceNumber}`}
                className={classes.rollbackButton}
                onClick={() => {}}
                buttonText={t['callTheExpert']}
              />
            )}
          </Grid>
        </GridContainer>
        <Divider variant='middle' className={classes.divider} />
      </div>
    </Fragment>
  );
};

export default AnswerView;
