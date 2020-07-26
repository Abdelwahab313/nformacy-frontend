import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/questionRoaster';
import { formattedDateTime } from '../../services/dateTimeParser';
import Countdown from 'react-countdown';
import AssignmentType from './AssignmentType';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useStyles } from '../../styles/questionRoasterStyles';
import SubmitButton from '../../components/buttons/SubmitButton';
import { useHistory } from 'react-router';


const QuestionView = ({ questionDetails, isSubmitVisible }) => {

  const classes = useStyles();
  const history = useHistory();

  function handleEditClick(questionReference) {
    history.push(`/question/answer/${questionReference}`, { questionDetails });
  }

  function counterRender(key) {
    return ({
              total,
              days,
              hours,
              minutes,
              seconds,
              milliseconds,
              completed,
            }) => {
      return (
        <Typography
          id={`question-${key}-closeDate`}
          className={classes.questionFieldsStyles}>
          {completed
            ? 'Closed'
            : 'Available for: ' +
            days +
            ':' +
            hours +
            ':' +
            minutes +
            ':' +
            seconds}
        </Typography>
      );
    };
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container className={classes.questionContainer}>
        <Grid item xs={6}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-title`}
            className={classes.questionFieldsStyles}>
            {questionDetails.title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                id={`question-${questionDetails.referenceNumber}-referenceNumber`}
                className={classes.questionFieldsStyles}>
                {t['referenceNumber'] + questionDetails.referenceNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                id={`question-${questionDetails.referenceNumber}-postDate`}
                className={classes.questionFieldsStyles}>
                {t['postDate'] + ' '}
                {formattedDateTime(new Date(questionDetails.createdAt))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            className={[
              classes.flexContainer,
              classes.questionFieldsStyles,
            ]}>
            <Grid item xs={3} className={classes.fieldContainer}>
              {questionDetails.field?.map((field, fieldKey) => (
                <Typography
                  id={`question-${questionDetails.referenceNumber}-field-${fieldKey}`}>
                  {field.label}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={3} className={classes.fieldContainer}>
              {questionDetails.subfield?.map((subfield, subFieldKey) => (
                <Typography
                  id={`question-${questionDetails.referenceNumber}-subfield-${subFieldKey}`}>
                  {subfield.label}
                </Typography>
              ))}
            </Grid>
            {questionDetails.industry && (
              <Grid item xs={3} className={classes.fieldContainer}>
                <Typography
                  id={`question-${questionDetails.referenceNumber}-industry`}>
                  {questionDetails.industry.label}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Countdown
            className={classes.questionFieldsStyles}
            renderer={counterRender(questionDetails.referenceNumber)}
            date={questionDetails.closeDate}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-content`}
            className={classes.questionFieldsStyles}>
            {questionDetails.content}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <AssignmentType
            index={questionDetails.referenceNumber}
            type={questionDetails.assignmentType}
          />
        </Grid>
        {isSubmitVisible && <Grid
          item
          xs={6}
          style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SubmitButton
            id={`question-${questionDetails.referenceNumber}-submit`}
            onClick={() => handleEditClick(questionDetails.referenceNumber)}
            buttonText={t['answer']}
            disabled={false}
          />
        </Grid>}
      </Grid>
    </Paper>
  );
};

export default QuestionView;