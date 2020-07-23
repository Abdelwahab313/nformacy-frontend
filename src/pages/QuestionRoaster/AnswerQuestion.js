import React from 'react';
import { useLocation } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown';
import AssignmentType from './AssignmentType';
import { useStyles } from '../../styles/questionRoasterStyles';
import { formattedDateTime } from '../../services/dateTimeParser';
import TextField from '@material-ui/core/TextField';
import SubmitButton from '../../components/buttons/SubmitButton';
import t from '../../locales/en/questionRoaster';

const AnswerQuestion = () => {

  const classes = useStyles();
  const location = useLocation();
  const questionDetails = location.state.selectedQuestion[0];

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
    <Grid container justify={'center'} alignContent={'center'} style={{ marginTop: '10px' }}>
      <Grid item xs={12} sm={10}>
        <Paper elevation={3} className={classes.paper}>
          <Grid
            container
            className={classes.questionContainer}>
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
                    <Typography id={`question-${questionDetails.referenceNumber}-industry`}>
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
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper elevation={3} className={classes.paper}>
          <Grid
            container
            className={classes.questionContainer}>
            <Grid item xs={6}>
              <Typography
                id={`question-${questionDetails.referenceNumber}-title`}
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
            <Grid item xs={6}>
              <Typography className={classes.questionFieldsStyles}>M Taison</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ height: '35px', marginBottom: '20px' }}
                variant='outlined'
                margin='normal'
                fullWidth
                id='answer'
                name='answer'
                placeholder='Answer'
              />
            </Grid>
            <Grid item xs={6}/>
            <Grid
              item
              xs={6}
              style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button
                variant="contained"
                size='medium' style={{ marginRight: '10px' }}>
                {t['saveAndCompleteLater']}
              </Button>
              <SubmitButton
                buttonText={t['submit']}
                disabled={false}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnswerQuestion;