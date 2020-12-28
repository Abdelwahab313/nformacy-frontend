import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import Rating from './Rating';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/RatingStyles';
import { CallEvaluationProvider, useCallEvaluationContext } from './context';
import authManager from 'services/authManager';


const CallEvaluation = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [{ ratingEvaluations }] = useCallEvaluationContext();

  return (
    <Grid container className={classes.callEvaluationContainer}>
      <Grid item xs={12} alignItems={'center'} justifyContent={'center'}>
        <Grid container>

          <Grid item xs={4}></Grid>

          <Grid item xs={8}>
            <Grid container justify="space-evenly">
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('oneStar')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('twoStars')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('threeStars')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('fourStars')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('fiveStars')}</CustomTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {Object.keys(ratingEvaluations).map((evaluationKey) => {
          return (
            <Rating evaluationKey={evaluationKey} />
          );
        })}
      </Grid>

      <Grid item xs={12} className={classes.evaluationComment}>
        <CustomTypography fontWeight="bold" variant="body1">Comments:</CustomTypography>
        <form className={classes.form} >
          <TextField
            className={classes.commentField}
            variant='outlined'
            fullWidth
            InputProps={{
              classes: {
                input: classes.inputFieldColor
              }
            }}
            onChange={() => {
            }}
            autoFocus
          />
          <div className={classes.submitEvaluationBtnContainer}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitEvaluationBtn}>
              {t('submit')}
            </Button>
          </div>
        </form>
      </Grid>

    </Grid>
  );
};

const defaultClientCallEvaluation = {
  'recievedAnswer': 0,
  'expertKnowledge': 0,
  'expertCommunication': 0,
  'callArrangements': 0,
  'serviceRecomendation': 0
};
const defaultFreelancerCallEvaluation = {
  'freelanceClientQuestion': 0,
  'freelanceClientProfessional': 0,
  'freelanceCallArrangment': 0,
  'freelanceSatisfaction': 0
};

const CallEvaluationPage = () => {
  const defaultEvaluation = authManager.isClient() ? defaultClientCallEvaluation : defaultFreelancerCallEvaluation
  return (
    <CallEvaluationProvider initialValue={{ ratingEvaluations: defaultEvaluation }} >
      <CallEvaluation />
    </CallEvaluationProvider >
  );
};

export default CallEvaluationPage;