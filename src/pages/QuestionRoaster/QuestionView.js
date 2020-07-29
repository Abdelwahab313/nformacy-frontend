import React from 'react';

import AssignmentType from './AssignmentType';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { useStyles } from 'styles/questionRoasterStyles';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { useHistory } from 'react-router';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import SubmitButton from 'components/buttons/SubmitButton';
import t from '../../locales/en/questionRoaster';


const QuestionView = ({ questionDetails, isSubmitVisible }) => {

  const classes = useStyles();
  const history = useHistory();

  function handleEditClick(questionReference) {
    history.push(`/question/answer/${questionReference}`, { questionDetails });
  }

  const isMajorContainsSpecificField = (subField) => {
    return questionDetails.subfield.filter(specificField => specificField.value === subField.value).length > 0;
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container className={classes.questionContainer}>
        <Grid item xs={3}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-referenceNumber`}
            className={classes.questionFieldsStyles}>
            {questionDetails.referenceNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-title`}
            className={classes.questionFieldsStyles}>
            {questionDetails.title}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-postDate`}
            className={classes.questionFieldsStyles}>
            {t['postDate'] + ' '}
            {formattedDateTimeNoSeconds(new Date(questionDetails.createdAt))}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid
            className={[
              classes.flexContainer,
              classes.questionFieldsStyles,
            ]}>
            <Grid item xs={9} className={classes.fieldContainer}>
              {questionDetails.field?.map((major, key) => (
                <Grid container alignItems={'center'}>
                  <Grid
                    item
                    xs={6}
                    id={`questionMajorFields-${key}`}
                    key={key}>
                    {major.label + ':'}
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      {fieldsOfExperience.find(experience => experience.value === major.value).subfields.filter(specificField => isMajorContainsSpecificField(specificField))?.map((field, key) => (
                        <Grid item key={key}>
                          <Chip id={`questionSubFields-${key}`} color={'secondary'} style={{ margin: '5px' }}
                                label={field.label}/>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            {questionDetails.industry && (
              <Grid item xs={3} className={classes.fieldContainer}>
                <Typography
                  variant={'inherit'}
                  id={`question-${questionDetails.referenceNumber}-industry`}>
                  {questionDetails.industry.label}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <QuestionCountDown
              date={questionDetails.closeDate}
              id={`question-${questionDetails.referenceNumber}-closeDate`}
              className={classes.questionFieldsStyles}
            />
          </Box>
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