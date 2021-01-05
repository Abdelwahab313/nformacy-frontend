import React, { Fragment, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/RatingStyles';
import CustomTypography from 'components/typography/Typography';
import Rating from './Rating';
import { useCallEvaluationContext, CallEvaluationProvider } from './context';
import authManager from 'services/authManager';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchMeetingDetails } from 'apis/meetingsAPI';
import { updateCallEvaluationData } from './context/callEvaluationAction';
import { useLocation } from 'react-router';


const ViewEvaluations = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [{ ratingEvaluations }, dispatch] = useCallEvaluationContext();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const meetingId = location?.state?.meetingId;

  useEffect(() => {
    setIsLoading(true);
    fetchMeetingDetails(meetingId)
      .then((response) => {
        updateCallEvaluationData(dispatch, response.data.clientEvaluation.ratingsQuestions);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <Fragment>
      <Grid item xs={12} alignItems={'center'} justifyContent={'center'}>

        {/* <GridItem xs={12} sm={12} md={12}>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Typography component={'h4'} id={'post-service-page-header'}>
                  {'client evaluations'}
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
        </GridItem> */}

        <Grid container>
          <Grid item xs={4}></Grid>

          <Grid item xs={8} className={classes.ratingDescriptionContainer}>
            <Grid container justify='space-evenly'>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('oneStar')}
                </CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('twoStars')}
                </CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('threeStars')}
                </CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('fourStars')}
                </CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('fiveStars')}
                </CustomTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {Object.keys(ratingEvaluations).map((evaluationKey) => {
          return <Rating evaluationKey={evaluationKey} />;
        })}
      </Grid>
    </Fragment>
  );
};


const defaultClientCallEvaluation = {
  recievedAnswer: 0,
  expertKnowledge: 0,
  expertCommunication: 0,
  callArrangements: 0,
  serviceRecomendation: 0,
};
const defaultFreelancerCallEvaluation = {
  freelanceClientQuestion: 0,
  freelanceClientProfessional: 0,
  freelanceCallArrangment: 0,
  freelanceSatisfaction: 0,
};

const ViewEvaluationsPage = () => {
  const defaultEvaluation = authManager.isClient()
    ? defaultClientCallEvaluation
    : defaultFreelancerCallEvaluation;
  return (
    <CallEvaluationProvider
      initialValue={{ ratingEvaluations: defaultEvaluation }}>
      <ViewEvaluations />
    </CallEvaluationProvider>
  );
};

export default ViewEvaluationsPage;