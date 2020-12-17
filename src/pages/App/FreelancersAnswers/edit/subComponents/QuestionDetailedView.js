import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from 'styles/questionRoasterStyles';
import QuestionFieldsChips from 'pages/App/QuestionRoaster/subComponents/QuestionFieldsChips';
import CustomTypography from 'components/typography/Typography';
import ShowMore from 'components/typography/ShowMore';
import createMarkup from 'services/markup';
import AssignmentType from 'pages/App/QuestionRoaster/subComponents/AssignmentType';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import directions from 'constants/direction';
import DEFAULT_LOCALES from 'constants/locale';

const LANGUAGES_LOCALES_MAPPER = {
  english: 'en',
  arabic: 'ar',
};

export const getFirstParagraph = (htmlContent) => {
  let matches = htmlContent.match(/(?<=<p.*>)(.*?)(?=<\/p>)/gm);
  return matches ? matches[0] : 'No Content';
};

const QuestionDetailedView = ({ questionDetails }) => {
  const classes = useStyles();
  const questionLocale = LANGUAGES_LOCALES_MAPPER[questionDetails.language];

  return (
    <Grid
      item
      md={12}
      xs={12}
      className={classes.mainContainer}
      id={'questionCardContainer'}
      dir={directions[questionLocale]}>
      <Grid container>
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
        <Grid item container md={12} xs={12} alignItems={'center'}>
          <Typography
            id={`question-${questionDetails.referenceNumber}-title`}
            className={classes.questionTitle}>
            {questionDetails.title}
          </Typography>
        </Grid>
      </Grid>

      {/* ======= img ========= */}
      {!!questionDetails.thumbnailUrl && (
        <Grid className={classes.imgContainer} item md={12} xs={12}>
          <img
            id={`question-${questionDetails.referenceNumber}-thumbnail`}
            className={classes.image}
            src={questionDetails.thumbnailUrl}
            height={400}
          />
        </Grid>
      )}
      <Grid container className={classes.questionContainer}>
        <Grid item md={!!questionDetails.thumbnailUrl ? 12 : 12} xs={12}>
          <Grid container>
            {/* =======Major and Minor======= */}
            <Grid item md={12} xs={12} className={classes.flexContainer}>
              <QuestionFieldsChips questionDetails={questionDetails} />
            </Grid>
            {/* =======Content======= */}
            <Grid item md={12} xs={12}>
              <Grid
                id={`question-${questionDetails.referenceNumber}-content`}
                className={classes.questionContentField}>
                <CustomTypography variant='body1'>
                  <ShowMore>
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        getFirstParagraph(questionDetails.content),
                      )}
                    />
                  </ShowMore>
                </CustomTypography>
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
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  );
};

export default QuestionDetailedView;