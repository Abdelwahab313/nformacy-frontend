import React, { Fragment } from 'react';
import GridContainer from 'components/grid/GridContainer';
import ViewEvaluations from 'pages/App/MeetingEvaluation/ViewEvaluations';
import { useLocation } from 'react-router';
import { fetchMeetingDetails } from 'apis/meetingsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import CommentBox from 'pages/App/MeetingEvaluation/CommentBox';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import useStyles from '../../App/MeetingEvaluation/styles/RatingStyles';

const Evaluations = () => {
  const location = useLocation();
  const meetingId = location?.state?.meetingId;
  const classes = useStyles();
  const { t } = useTranslation();
  const { fetchedData: meeting, isLoading } = useFetchData(() => {
    return fetchMeetingDetails(meetingId);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardHeader color='primary'>
          <Grid container>
            <Grid item md={6} xs={6}>
              <Typography component={'h4'} id={'post-service-page-header'}>
                {`${meeting.client.firstName + ' ' + meeting.client.lastName}'s Evaluation` + ' ' + `(${t('client')})`}
              </Typography>
            </Grid>
          </Grid>
        </CardHeader>
        {!!meeting?.clientEvaluation ? (
          <Fragment>
            <ViewEvaluations
              ratingEvaluations={meeting?.clientEvaluation?.ratingsQuestions}
            />
            <CommentBox comment={meeting?.clientEvaluation?.comment} disabled />
          </Fragment>
        ) : (<CustomTypography variant="body1" className={classes.notSumbmittedEvaluation}>{t('clientNotSumbitEvaluation')}</CustomTypography>)}
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <CardHeader color='primary'>
          <Grid container>
            <Grid item md={6} xs={6}>
              <Typography component={'h4'} id={'post-service-page-header'}>
                {`${meeting.freelancer.firstName + ' ' + meeting.freelancer.lastName}'s Evaluation` + ' ' + `(${t('freelancer')})`}
              </Typography>
            </Grid>
          </Grid>
        </CardHeader>

        {!!meeting?.freelancerEvaluation ? (
          <Fragment>
            <ViewEvaluations
              ratingEvaluations={meeting?.freelancerEvaluation?.ratingsQuestions}
            />
            <CommentBox comment={meeting?.freelancerEvaluation?.comment} disabled />
          </Fragment>
        ) : (<CustomTypography variant="body1" className={classes.notSumbmittedEvaluation}>{t('freelancerNotSumbitEvaluation')}</CustomTypography>)}
      </GridItem>
    </GridContainer>
  );
};

export default Evaluations;
