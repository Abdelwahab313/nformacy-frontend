import React from 'react';
import AssignmentType from './AssignmentType';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from 'styles/questionRoasterStyles';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import { useHistory } from 'react-router';
import SubmitButton from 'components/buttons/SubmitButton';
import createMarkup from '../../../../services/markup';
import Countdown from 'react-countdown';
import CountdownBoxShape from 'components/counters/CountdownBoxShape';
import ShowMore from '../../../../components/typography/ShowMore';
import directions from '../../../../constants/direction';
import DEFAULT_LOCALES from '../../../../constants/locale';
import { useTranslation } from 'react-i18next';
import QuestionFieldsChips from './QuestionFieldsChips';

const LANGUAGES_LOCALES_MAPPER = {
  english: 'en',
  arabic: 'ar',
};

export const getFirstParagraph = (htmlContent) => {
  let matches = htmlContent.match(/(?<=<p.*>)(.*?)(?=<\/p>)/gm);
  return matches ? matches[0] : 'No Content';
};

const QuestionView = ({ questionDetails, isSubmitVisible }) => {
  const classes = useStyles();
  const history = useHistory();
  const { i18n } = useTranslation();

  const questionLocale = LANGUAGES_LOCALES_MAPPER[questionDetails.language];
  const fixedTranslation = i18n.getFixedT(questionLocale);

  function handleEditClick(questionReference) {
    history.push(`/question/answer/${questionReference}`, { questionDetails });
  }

  return (
    <Grid
      item
      md={12}
      xs={12}
      className={classes.mainContainer}
      id={'questionCardContainer'}
      dir={directions[questionLocale]}>
      <Grid container className={classes.questionContainer}>
        {!!questionDetails.thumbnailUrl && <Grid className={classes.imgContainer} item md={3} xs={12}>
          <img
            id={`question-${questionDetails.referenceNumber}-thumbnail`}
            className={classes.image}
            src={questionDetails.thumbnailUrl}
            alt={fixedTranslation('questionRoaster:questionAltImg')}
          />
        </Grid>}

        <Grid item md={!!questionDetails.thumbnailUrl ? 9 : 12} xs={12}>
          <Grid container className={classes.questionTextWrapper}>
            {/* =======Ref no. and Date======= */}
            <Grid item md={2} xs={6}>
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
                <Grid container md={12} xs={12}>
                  <Typography
                    className={classes.closedQuestion}
                    id={`question-${questionDetails.referenceNumber}-closeIn`}>
                    {fixedTranslation('questionRoaster:closeIn')}
                  </Typography>
                </Grid>
                <Grid container md={12} xs={12} >
                  <Box mx="auto">
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
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {/* =======Major and Minor======= */}
            <Grid item md={12} xs={12} className={classes.flexContainer}>
              <QuestionFieldsChips questionDetails={questionDetails}/>
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
};

export default QuestionView;
