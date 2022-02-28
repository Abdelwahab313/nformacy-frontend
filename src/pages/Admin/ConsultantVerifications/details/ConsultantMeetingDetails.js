import React from 'react';
import { useLocation } from 'react-router';
import classNames from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from 'components/card/Card.js';
import MeetingDetailsSection from 'pages/App/ServiceRequests/details/subComponents/MeetingDetailsSection';
import useFetchData from 'hooks/useFetchData';
import { fetchMeetingDetails } from 'apis/meetingsAPI';
import { getConsultantEvaluationFormPage, history } from 'services/navigation';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Grid } from '@material-ui/core';
import SubmitButton from 'components/buttons/SubmitButton';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';


const ConsultantMeetingDetails = () => {
const classes = useStyles();
  const location = useLocation();
  const meetingId = location?.state?.meetingId;
  const { fetchedData: meetingDetails, isLoading } = useFetchData(() => fetchMeetingDetails(meetingId))
  const { t } = useTranslation()
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const onClickShowEvaluation = () => {
    return history.push(getConsultantEvaluationFormPage(meetingDetails?.freelancer?.id))
  }

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <MeetingDetailsSection meeting={meetingDetails} />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <div
          className={classNames(classes.viewEvaluationsContainer, {
            [classes.viewEvaluationsContainerAr]: isArlang,
          })}>
          <SubmitButton
            id={'showNavigation'}
            onClick={onClickShowEvaluation}
            buttonText={
              <CustomTypography variant='body1'>
                {t('viewEvaluations')}
              </CustomTypography>
            }
          />
        </div>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles(() => ({
  viewEvaluationsContainer: {
    display: 'flex',
  },
  viewEvaluationsContainerAr: {
    direction: 'ltr',
  },
}));

export default ConsultantMeetingDetails;
