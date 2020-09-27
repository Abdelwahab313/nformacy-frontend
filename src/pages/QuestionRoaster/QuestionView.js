import React from 'react';
import AssignmentType from './AssignmentType';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { useStyles } from 'styles/questionRoasterStyles';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { useHistory } from 'react-router';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import SubmitButton from 'components/buttons/SubmitButton';
import t from '../../locales/en/questionRoaster';
import createMarkup from '../../services/markup';

const QuestionView = ({ questionDetails, isSubmitVisible }) => {
  const classes = useStyles();
  const history = useHistory();

  function handleEditClick(questionReference) {
    history.push(`/question/answer/${questionReference}`, { questionDetails });
  }

  const isMajorContainsSpecificField = (subField) => {
    return (
      questionDetails.subfield.filter(
        (specificField) => specificField.value === subField.value,
      ).length > 0
    );
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
        <Grid item xs={9}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-title`}
            className={classes.questionFieldsStyles}>
            {questionDetails.title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid
            className={[classes.flexContainer, classes.questionFieldsStyles]}>
            <Typography className={classes.questionFieldLabel}>
              {t['field']}
            </Typography>
            <Grid item xs={9} className={classes.fieldContainer}>
              {questionDetails.field?.map((major, key) => (
                <Grid container alignItems={'center'}>
                  <Grid item xs={6} id={`questionMajorFields-${key}`} key={key}>
                    {major.label + ':'}
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      {fieldsOfExperience
                        .find((experience) => experience.value === major.value)
                        .subfields.filter((specificField) =>
                          isMajorContainsSpecificField(specificField),
                        )
                        ?.map((field, key) => (
                          <Grid item key={key}>
                            <Chip
                              id={`questionSubFields-${key}`}
                              color={'secondary'}
                              className={classes.subFieldChip}
                              label={field.label}
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-postDate`}
            className={classes.questionFieldsStyles}>
            {t['postDate'] + ' '}
            {formattedDateTimeNoSeconds(new Date(questionDetails.createdAt))}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <QuestionCountDown
            date={questionDetails.currentActionTime}
            id={`question-${questionDetails.referenceNumber}-currentActionTime`}
            className={classes.questionFieldsStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <div
            id={`question-${questionDetails.referenceNumber}-content`}
            className={classes.questionContentField}
            dangerouslySetInnerHTML={createMarkup(questionDetails.content)}
          />
        </Grid>
        <Grid item xs={6}>
          <AssignmentType
            index={questionDetails.referenceNumber}
            type={questionDetails.assignmentType}
          />
        </Grid>
        {isSubmitVisible && (
          <Grid
            item
            xs={6}
            className={classes.answerButtonContainer}>
            <SubmitButton
              id={`question-${questionDetails.referenceNumber}-submit`}
              onClick={() => handleEditClick(questionDetails.referenceNumber)}
              buttonText={t['answer']}
              disabled={false}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default QuestionView;
