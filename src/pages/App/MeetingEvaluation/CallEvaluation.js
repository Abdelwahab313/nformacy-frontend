import React from 'react';
import { Grid, Button } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/RatingStyles';
import { CallEvaluationProvider, useCallEvaluationContext } from './context';
import authManager from 'services/authManager';
import {
  updateEvaluationComment,
  updateEvaluationForm,
} from './context/callEvaluationAction';
import { useLocation, useHistory } from 'react-router';
import { RoutesPaths } from 'constants/routesPath';
import { submitEvaluation } from 'apis/callEvaluationAPI';
import { useSnackBar } from 'context/SnackBarContext';
import useFetchData from 'hooks/useFetchData';
import { fetchServiceDetails } from 'apis/servicesAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { getUserName } from 'core/user';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import ViewEvaluations from './ViewEvaluations';
import CommentBox from './CommentBox';

const CallEvaluation = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [{ ratingEvaluations, comment }, dispatch] = useCallEvaluationContext();
  const history = useHistory();
  const location = useLocation();
  const meetingId = location?.state?.meetingId;
  const serviceId = location?.state?.serviceId;
  const { showSuccessMessage } = useSnackBar();

  const setComment = (comment) => {
    updateEvaluationComment(dispatch, comment);
  };
  const setRatingEvaluations = (updatedRatings) => {
    updateEvaluationForm(dispatch, { ...ratingEvaluations, ...updatedRatings });
  };
  const { fetchedData: service, isLoading } = useFetchData(() =>
    fetchServiceDetails(serviceId),
  );

  if (isLoading) {
    return <LoadingCircle />;
  }
  const meetingDate = formattedDateTimeNoSeconds(
    new Date(service.meetings[0].callTime),
  );

  const userName = authManager.isClient()
    ? getUserName(service.meetings[0].freelancer)
    : getUserName(service.meetings[0].client);

  const onSubmitEvaluation = () => {
    submitEvaluation(meetingId, ratingEvaluations, comment).then(() => {
      showSuccessMessage('Your evaluation submitted successfully');
      history.push(RoutesPaths.App.Dashboard);
    });
  };

  return (
    <Grid container className={classes.callEvaluationContainer}>
      <BreadcrumbsCustomSeparator pageName={t('callEvaluation')} />

      <Grid item={12}>
        <CustomTypography
          className={classes.callEvaluationHeader}
          fontWeight='bold'
          variant='h5'>
          How did your call on {meetingDate} with {userName} go?
        </CustomTypography>
      </Grid>

      <ViewEvaluations
        ratingEvaluations={ratingEvaluations}
        setRatingEvaluations={setRatingEvaluations}
      />

      <Grid item xs={12} className={classes.evaluationComment}>
        <CustomTypography fontWeight='bold' variant='body1'>
          Comments:
        </CustomTypography>
        <div className={classes.form}>
          <CommentBox comment={comment} setComment={setComment} />

          <div className={classes.submitEvaluationBtnContainer}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={() => onSubmitEvaluation()}
              className={classes.submitEvaluationBtn}>
              {t('submit')}
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
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

const CallEvaluationPage = () => {
  const defaultEvaluation = authManager.isClient()
    ? defaultClientCallEvaluation
    : defaultFreelancerCallEvaluation;
  return (
    <CallEvaluationProvider
      initialValue={{ ratingEvaluations: defaultEvaluation }}>
      <CallEvaluation />
    </CallEvaluationProvider>
  );
};

export default CallEvaluationPage;
