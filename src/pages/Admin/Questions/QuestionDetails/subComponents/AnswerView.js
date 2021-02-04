import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import React, { Fragment } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import { useStyles } from 'styles/Admin/questionFormStyles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import {
  acceptAnswer,
  rejectAnswer,
  rollbackAnswer,
  rateAnswer,
} from 'apis/answersAPI';
import authManager from 'services/authManager';
import createMarkup from 'services/markup';
import AcceptAndRejectActionButtons from './AcceptAndRejectActionButtons';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import { useState } from 'react';
import SubmitButton from 'components/buttons/SubmitButton';
import ShowMore from 'components/typography/ShowMore';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import useLocale from 'hooks/localization/useLocale';
import { useTranslation } from 'react-i18next';
import { Checkbox, Collapse, FormControlLabel } from '@material-ui/core';
import { getUserName } from 'core/user';
import AnswerOwner from './AnswerOwner';
import { getConsultantDetails } from 'services/navigation';
import LinkText from 'components/typography/LinkText';

const AnswerView = ({
  answer,
  index,
  setRating,
  onCheckAnswer,
  isShortListed,
  showShortListOption,
  showAcceptAction,
  showScheduleMeeting,
}) => {
  const classes = useStyles();
  const { local } = useLocale();
  const { t } = useTranslation();
  const [answerState, setAnswerState] = useState(answer.state);
  const [showAnswerOwnerCard, setShowAnswerOwnerCard] = useState(false);

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
            {authManager.isAdmin() ||
              (authManager.isClient() && (
                <Grid
                  id={answer.referenceNumber}
                  container
                  className={classes.answerFieldStyle}>
                  <Typography className={classes.answerFieldLabel}>
                    # Answer:
                  </Typography>
                  <Typography> {answer.referenceNumber} </Typography>
                </Grid>
              ))}
          </GridItem>
          <GridItem xs={12} className={classes.answerRowStyles}>
            {!authManager.isNormalUser() && (
              <Grid container className={classes.answerFieldStyle}>
                <Typography className={classes.answerFieldLabel}>
                  {`${t('consultant')}:`}
                </Typography>
                <LinkText to={getConsultantDetails(answer.user.id)}>
                  <Tooltip
                    title={
                      <Typography># {answer.user.referenceNumber}</Typography>
                    }>
                    <Typography>{getUserName(answer.user)}</Typography>
                  </Tooltip>
                </LinkText>
                <Typography className={classes.countDown}>
                  {formattedDateMonthAndDay(new Date(answer.createdAt), local)}
                </Typography>
              </Grid>
            )}
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
          {answerState == 'accepted' && !!answer.rating && showShortListOption && (
            <GridItem xs={12} className={classes.answerRowStyles}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => onCheckAnswer(answer.id)}
                    name='shortlist'
                    color='primary'
                    checked={isShortListed}
                  />
                }
                label={
                  isShortListed ? 'Remove from Shortlist' : 'Add to Shortlist'
                }
              />
            </GridItem>
          )}
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
            {authManager.isAdmin() &&
              showAcceptAction &&
              answerState == 'pending' && (
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
            {authManager.isAdmin() &&
              showAcceptAction &&
              answerState != 'pending' &&
              !showShortListOption && (
                <SubmitButton
                  id={`rollback-${answer.referenceNumber}`}
                  className={classes.rollbackButton}
                  onClick={() => onRollback()}
                  buttonText={t('rollback')}
                />
              )}
            {authManager.isClient() && showScheduleMeeting && (
              <SubmitButton
                id={`call-${answer.referenceNumber}`}
                className={classes.rollbackButton}
                onClick={() => {
                  setShowAnswerOwnerCard(!showAnswerOwnerCard);
                }}
                buttonText={
                  showAnswerOwnerCard ? t('hideExpert') : t('showExpert')
                }
              />
            )}
          </Grid>
        </GridContainer>
        <Collapse in={!!showAnswerOwnerCard}>
          {!!showAnswerOwnerCard && <AnswerOwner user={answer.user} />}
        </Collapse>
        <Divider variant='middle' className={classes.divider} />
      </div>
    </Fragment>
  );
};

export default AnswerView;
