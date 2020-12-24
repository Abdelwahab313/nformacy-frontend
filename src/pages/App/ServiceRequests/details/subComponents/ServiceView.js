import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from 'styles/questionRoasterStyles';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import createMarkup from 'services/markup';
import Countdown from 'react-countdown';
import CountdownBoxShape from 'components/counters/CountdownBoxShape';
import ShowMore from 'components/typography/ShowMore';
import directions from 'constants/direction';
import DEFAULT_LOCALES from 'constants/locale';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';
import useLocale from 'hooks/localization/useLocale';
import AssignmentType from 'pages/App/QuestionRoaster/subComponents/AssignmentType';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';

const ServiceView = ({ serviceDetails }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <Grid
      item
      md={12}
      xs={12}
      className={classes.mainContainer}
      id={`service-${serviceDetails.referenceNumber}`}
      dir={directions[locale]}>
      <Grid container className={classes.questionContainer}>
        <Grid item xs={12}>
          <Grid container className={classes.questionTextWrapper}>
            {/* =======Ref no. and Date======= */}
            <Grid item md={2} xs={6}>
              <Typography
                id={`question-${serviceDetails.referenceNumber}-referenceNumber`}
                className={classes.referenceNumberStyle}>
                {`# ${serviceDetails.referenceNumber}`}
              </Typography>
            </Grid>
            <Grid item md={7} xs={6}>
              <Typography
                id={`question-${serviceDetails.referenceNumber}-postDate`}
                className={classes.postDateStyle}>
                {formattedDateMonthAndDay(
                  new Date(serviceDetails.createdAt),
                  DEFAULT_LOCALES[locale],
                )}
              </Typography>
            </Grid>
            {/* ======Title and ActionTime======== */}
            <Grid item container md={9} xs={6} alignItems={'center'}>
              <Typography
                id={`question-${serviceDetails.referenceNumber}-title`}
                className={classes.questionTitle}>
                {serviceDetails.title}
              </Typography>
            </Grid>

            <Grid
              item
              md={3}
              xs={6}
              id={`question-${serviceDetails.referenceNumber}-currentActionTime`}>
              {!!serviceDetails.currentActionTime && (
                <Grid
                  container
                  direction={'column'}
                  spacing={2}
                  className={classes.timeContainer}>
                  <Grid item md={12} xs={12}>
                    <Typography
                      className={classes.closedQuestion}
                      id={`question-${serviceDetails.referenceNumber}-closeIn`}>
                      {t('questionRoaster:closeIn')}
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Box mx='auto'>
                      <Countdown
                        date={serviceDetails.currentActionTime}
                        renderer={(props) => (
                          <CountdownBoxShape translation={t} {...props} />
                        )}
                        className={classes.questionCountDown}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
            {/* =======Major and Minor======= */}
            <Grid item md={12} xs={12} className={classes.flexContainer}>
              <ColoredFieldsChips fields={serviceDetails.fields} />
            </Grid>
            {/* =======Content======= */}
            <Grid item md={12} xs={12}>
              <Grid
                id={`question-${serviceDetails.referenceNumber}-content`}
                className={classes.questionContentField}>
                <CustomTypography variant='body1'>
                  <ShowMore>
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        serviceDetails.content,
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
              id={`question-${serviceDetails.referenceNumber}-assignment`}
              className={classes.questionAssignmentTypeContainer}>
              <AssignmentType
                index={serviceDetails.referenceNumber}
                type={serviceDetails.assignmentType}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServiceView;
