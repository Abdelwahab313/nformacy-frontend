import React from 'react';
import { Grid } from '@material-ui/core';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import AnswerView from 'pages/Admin/Questions/QuestionDetails/subComponents/AnswerView';
import GridItem from 'components/grid/GridItem';
import MeetingDetailsSection from './subComponents/MeetingDetailsSection';
import QuestionDetailedView from 'pages/App/FreelancersAnswers/edit/subComponents/QuestionDetailedView';

const FreelancerServiceDetails = ({ serviceDetails }) => {
  const { t } = useTranslation();

  const answer = serviceDetails?.answers[0];
  const meeting = serviceDetails?.meetings[0];

  return (
    <Grid container justify={'center'} alignContent={'center'}>
      <Grid item xs={12} sm={10}>
        <BreadcrumbsCustomSeparator pageName={t('answersDetails')} />
        <QuestionDetailedView questionDetails={serviceDetails?.question} />
      </Grid>
      <Grid item={12} sm={10}>
        <GridItem xs={6}>
          {/* meeting details */}
          {!!meeting?.id && <MeetingDetailsSection meeting={meeting} />}
        </GridItem>
      </Grid>
      <Grid item xs={12} sm={10}>
        <AnswerView answer={answer} />
      </Grid>
    </Grid>
  );
};

export default FreelancerServiceDetails;
