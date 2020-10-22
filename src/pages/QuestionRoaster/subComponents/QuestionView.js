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
import createMarkup from '../../../services/markup';
import Countdown from 'react-countdown';
import CountdownBoxShape from 'components/counters/CountdownBoxShape';
import * as colors from '../../../styles/colors';
import styled from 'styled-components';
import ShowMore from '../../../components/Typography/ShowMore';
import { Translation } from 'react-i18next';
import directions from '../../../constants/direction';
import DEFAULT_LOCALES from '../../../constants/locale';
import { getLocalizedNumber } from '../../../services/numbersLocalization';

const LANGUAGES_LOCALES_MAPPER = {
  english: 'en',
  arabic: 'ar',
};

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

export const getFirstParagraph = (htmlContent) => {
  let matches = htmlContent.match(/(?<=<p.*>)(.*?)(?=<\/p>)/gm);
  return matches ? matches[0] : 'No Content';
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
    <Translation>
      {(t, { i18n }) => {
        const questionLocale =
          LANGUAGES_LOCALES_MAPPER[questionDetails.language];
        const fixedTranslation = i18n.getFixedT(questionLocale);
        return (
          <Grid
            item
            md={12}
            xs={12}
            className={classes.mainContainer}
            id={'questionRoasterMainContainer'}
            dir={directions[questionLocale]}>
            <Grid container className={classes.questionContainer}>
              <Grid className={classes.imgContainer} item md={3} xs={12}>
                <img
                  id={`question-${questionDetails.referenceNumber}-thumbnail`}
                  className={classes.image}
                  src={dummyImage}
                  alt={fixedTranslation('questionRoaster:questionAltImg')}
                />
              </Grid>

              <Grid item md={9} xs={12}>
                <Grid container className={classes.questionTextWrapper}>
                  {/* =======Ref no. and Date======= */}
                  <Grid item md={2} xs={3}>
                    <Typography
                      id={`question-${questionDetails.referenceNumber}-referenceNumber`}
                      className={classes.referenceNumberStyle}>
                      {`# ${getLocalizedNumber(
                        questionDetails.referenceNumber,
                        DEFAULT_LOCALES[questionLocale],
                      )}`}
                    </Typography>
                  </Grid>
                  <Grid item md={7} xs={6}>
                    <Typography
                      id={`question-${questionDetails.referenceNumber}-postDate`}
                      className={classes.postDateStyle}>
                      {formattedDateMonthAndDay(
                        new Date(questionDetails.createdAt),
                        DEFAULT_LOCALES[questionLocale],
                      )}
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
                          {fixedTranslation('questionRoaster:closeIn')}
                        </Typography>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Countdown
                          date={questionDetails.currentActionTime}
                          renderer={(props) => (
                            <CountdownBoxShape
                              translation={fixedTranslation}
                              {...props}
                            />
                          )}
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
                                    (experience) =>
                                      experience.value === major.value,
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
                    <Grid
                      id={`question-${questionDetails.referenceNumber}-content`}
                      className={classes.questionContentField}>
                      <ShowMore>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            getFirstParagraph(questionDetails.content),
                          )}
                        />
                      </ShowMore>
                    </Grid>
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
                        buttonText={fixedTranslation('questionRoaster:answer')}
                        disabled={false}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      }}
    </Translation>
  );
};

export default QuestionView;
