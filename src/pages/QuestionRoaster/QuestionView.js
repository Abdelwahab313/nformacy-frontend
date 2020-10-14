import React from 'react';
import AssignmentType from './AssignmentType';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { Grid, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from 'styles/questionRoasterStyles';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import { useHistory } from 'react-router';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import SubmitButton from 'components/buttons/SubmitButton';
import t from '../../locales/en/questionRoaster';
import createMarkup from '../../services/markup';
import dummyImage from 'assets/img/sidebar-2.jpg';


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
        <Grid item md={3} xs={12}>
          <img className={classes.image} src={dummyImage} alt="Question Image" />
        </Grid>

        <Grid item md={9} xs={12}>
          <Grid container className={classes.questionTextWrapper}>
{/* =======Ref and Date======= */}
          <Grid item md={2} xs={3}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-referenceNumber`}
            className={classes.referenceNumberStyle}>
            {`# ${questionDetails.referenceNumber}`}
          </Typography>
        </Grid>
        <Grid item md={7} xs={6}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-postDate`}
            className={classes.postDateStyle}>
            {formattedDateMonthAndDay(new Date(questionDetails.createdAt))}
          </Typography>
        </Grid>
        <Grid item md={3} xs={3}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-closeIn`}>
            {'Close in'}
          </Typography>
        </Grid>
{/* ======Title and ActionTime======== */}
        <Grid item md={9} xs={7}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-title`}
            className={classes.questionTitle}>
            {questionDetails.title}
          </Typography>
        </Grid>
        <Grid item md={3} xs={5}>
          <QuestionCountDown
            date={questionDetails.currentActionTime}
            id={`question-${questionDetails.referenceNumber}-currentActionTime`}
            className={classes.questionFieldsStyles}
          />
        </Grid>
{/* =======Major and Minor======= */}
        <Grid item md={12} xs={12} className={[classes.flexContainer, classes.questionFieldsStyles]}>
          <Grid className={classes.fieldContainer}>
            {questionDetails.field?.map((major, key) => (
              <Grid container alignItems={'center'}>
                  <Tooltip 
                  title={
                  <Typography> 
                    {fieldsOfExperience
                      .find((experience) => experience.value === major.value)
                      .subfields.filter((specificField) =>
                        isMajorContainsSpecificField(specificField),
                      )
                      ?.map((field, key) => (
                        <Grid key={key} id={`questionSubFields-${questionDetails.referenceNumber}-${key}`} item>
                        {field.label}
                        </Grid>
                      ))}
                      
                  </Typography>}>
                  <Chip
                    color={'secondary'}
                    className={classes.fieldChip}
                      label={<Typography id={`questionMajorFields-${questionDetails.referenceNumber}-${key}`} key={key} >{major.label}</Typography>}
                  />
                  </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Grid>
{/* =======Content======= */}
        <Grid item md={12} xs={12}>
          <div
            id={`question-${questionDetails.referenceNumber}-content`}
            className={classes.questionContentField}
            dangerouslySetInnerHTML={createMarkup(questionDetails.content)}
          ></div>
        </Grid>
{/* ======Icon and Button======== */}
        <Grid item md={6} xs={6}>
          <AssignmentType
            index={questionDetails.referenceNumber}
            type={questionDetails.assignmentType}
          />
        </Grid>
        {isSubmitVisible && (
          <Grid
            item
            md={6}
            xs={6}
            className={classes.answerButtonContainer}>
            <SubmitButton
              className={classes.submitButton}
              id={`question-${questionDetails.referenceNumber}-submit`}
              onClick={() => handleEditClick(questionDetails.referenceNumber)}
              buttonText={t['answer']}
              disabled={false}
            />
          </Grid>
        )}
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default QuestionView;
