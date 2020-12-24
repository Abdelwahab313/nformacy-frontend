import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import Rating from './Rating';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/RatingStyles';
import { CallEvaluationProvider, useCallEvaluationContext } from './context';


const CallEvaluation = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [{ ratingEvaluations }] = useCallEvaluationContext();

  return (
    <Grid container>
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

    </Grid>
  );
};

const defaultClientCallEvaluation = {
  'recievedAnswer': 0,
  'expertKnowledge': 0,
  'expertCommunication': 0,
  'callArrangements': 0,
  'serviceRecomendation': 0
}
const CallEvaluationPage = () => {
  return (
    <CallEvaluationProvider initialValue={{ ratingEvaluations: defaultClientCallEvaluation }} >
      <CallEvaluation />
    </CallEvaluationProvider >
  );
};

export default CallEvaluationPage;