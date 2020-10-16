import React from 'react';
import AssignmentType from './AssignmentType';
import Chip from '@material-ui/core/Chip';
import { Grid, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from 'styles/questionRoasterStyles';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import { useHistory } from 'react-router';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import SubmitButton from 'components/buttons/SubmitButton';
import t from '../../locales/en/questionRoaster';
import createMarkup from '../../services/markup';
import dummyImage from 'assets/img/sidebar-2.jpg';
import Countdown from 'react-countdown';
import CountdownBoxShape from 'components/counters/CountdownBoxShape';
import * as colors from '../../styles/colors';
import styled from 'styled-components';

const isInSecondSequence = (number) => {
  for (let i = 1; i <= number; i += 3) {
    if (i === number) return true;
  }
  return false;
};
const getColorForField = (index) => {
  if (index === 0 || index % 3 === 0) {
    return colors.turquoise;
  } else if (isInSecondSequence(index)) {
    return colors.darkOrange;
  }
  return colors.lightOrange;
};

export const getFirstParaghraph = (htmlContent) => {
  let matches = htmlContent.match(/<p>(.*?)<\/p>/gm);
  if (matches == null) {
    return 'No Content';
  } else {
    let output = matches[0].replace('<p>', '').replace('</p>', '');
    return output;
  }
};

const StyledFilterChip = styled(Chip)`
  background-color: ${(props) => getColorForField(props.index)};
`;
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
    <Grid className={classes.mainContainer}>
      <Grid container className={classes.questionContainer}>
        <Grid className={classes.imgContainer} item md={3} xs={12}>
          <img
            id={`question-${questionDetails.referenceNumber}-thumbnail`}
            className={classes.image}
            src={dummyImage}
            alt='Question Image'
          />
        </Grid>

        <Grid item md={9} xs={12}>
          <Grid container className={classes.questionTextWrapper}>
            {/* =======Ref no. and Date======= */}
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
            {/* ======Title and ActionTime======== */}
            <Grid item container md={9} xs={6} alignItems={'center'}>
              <Typography
                id={`question-${questionDetails.referenceNumber}-title`}
                className={classes.questionTitle}>
                {questionDetails.title}
              </Typography>
            </Grid>

            <Grid
              item
              md={3}
              xs={6}
              id={`question-${questionDetails.referenceNumber}-currentActionTime`}>
              <Grid
                container
                direction={'column'}
                spacing={2}
                className={classes.timeContainer}>
                <Grid item md={12} xs={12}>
                  <Typography
                    className={classes.closedQuestion}
                    id={`question-${questionDetails.referenceNumber}-closeIn`}>
                    {'Close in'}
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Countdown
                    date={questionDetails.currentActionTime}
                    renderer={(props) => <CountdownBoxShape {...props} />}
                    className={classes.questionCountDown}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* =======Major and Minor======= */}
            <Grid item md={12} xs={12} className={classes.flexContainer}>
              <Grid className={classes.fieldContainer}>
                {questionDetails.field?.map((major, key) => (
                  <Grid>
                    <Tooltip
                      title={
                        <Typography>
                          {fieldsOfExperience
                            .find(
                              (experience) => experience.value === major.value,
                            )
                            .subfields.filter((specificField) =>
                              isMajorContainsSpecificField(specificField),
                            )
                            ?.map((field, key) => (
                              <Grid
                                key={key}
                                id={`questionSubFields-${questionDetails.referenceNumber}-${key}`}
                                item>
                                {field.label}
                              </Grid>
                            ))}
                        </Typography>
                      }>
                      <StyledFilterChip
                        key={key}
                        index={key}
                        className={classes.fieldChip}
                        label={
                          <Typography
                            id={`questionMajorFields-${questionDetails.referenceNumber}-${key}`}
                            className={classes.fieldChipText}>
                            {major.label}
                          </Typography>
                        }
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
                dangerouslySetInnerHTML={createMarkup(
                  getFirstParaghraph(questionDetails.content),
                )}
              />
            </Grid>
            {/* ======Icon and Button======== */}
            <Grid
              item
              md={10}
              xs={10}
              id={`question-${questionDetails.referenceNumber}-assignment`}
              className={classes.questionAssignmentTypeContainer}>
              <AssignmentType
                index={questionDetails.referenceNumber}
                type={questionDetails.assignmentType}
              />
            </Grid>
            {isSubmitVisible && (
              <Grid
                item
                md={2}
                xs={2}
                className={classes.answerButtonContainer}>
                <SubmitButton
                  className={classes.submitButton}
                  id={`question-${questionDetails.referenceNumber}-submit`}
                  onClick={() =>
                    handleEditClick(questionDetails.referenceNumber)
                  }
                  buttonText={t['answer']}
                  disabled={false}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionView;
