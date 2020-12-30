import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import Rating from './Rating';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/RatingStyles';
import { CallEvaluationProvider, useCallEvaluationContext } from './context';
import authManager from 'services/authManager';
import { updateEvaluationComment } from './context/callEvaluationAction';
import { useLocation, useHistory } from 'react-router';
import { RoutesPaths } from 'constants/routesPath';
import { submitEvaluation } from 'apis/callEvaluationAPI';
import { useSnackBar } from 'context/SnackBarContext';

const CallEvaluation = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [{ ratingEvaluations, comment }, dispatch] = useCallEvaluationContext();
  const history = useHistory();
  const location = useLocation();
  const meetingId = location?.state?.meetingId;
  const { showSuccessMessage } = useSnackBar();

  const setComment = (comment) => {
    updateEvaluationComment(dispatch, comment);
  };

  const onSubmitEvaluation = () => {
    submitEvaluation(meetingId, ratingEvaluations, comment).then(() => {
      showSuccessMessage('Your evaluation submitted successfully');
      history.push(RoutesPaths.App.Dashboard);
    });
  };

  return (
    <Grid container className={classes.callEvaluationContainer}>
      <Grid item xs={12} alignItems={'center'} justifyContent={'center'}>
        <Grid container>
          <Grid item xs={4}></Grid>

          <Grid item xs={8} className={classes.ratingDescriptionContainer}>
            <Grid container justify='space-evenly'>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant="body1" fontWeight='bold'>{t('oneStar')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant="body1" fontWeight='bold'>{t('twoStars')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant="body1" fontWeight='bold'>{t('threeStars')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant="body1" fontWeight='bold'>{t('fourStars')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant="body1" fontWeight='bold'>{t('fiveStars')}</CustomTypography>
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

      <Grid item xs={12} className={classes.evaluationComment}>
        <CustomTypography fontWeight='bold' variant='body1'>
          Comments:
        </CustomTypography>
        <div className={classes.form}>
          <TextField
            multiline
            rowsMax={6}
            rows={4}
            variant='outlined'
            className={classes.commentField}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
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
