import React from 'react';
import { useLocation } from 'react-router';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import { Grid } from '@material-ui/core';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Direction from 'components/grid/Direction';
import ShortlistCandidate from 'pages/App/ServiceRequests/details/subComponents/ShortlistCandidate';
import { fetchServiceDetails } from 'apis/servicesAPI';
import { SERVICE_STATUS } from 'constants/questionStatus';
import AnswersSection from './subComponents/AnswersSection';
import MeetingDetailsSection from './subComponents/MeetingDetailsSection';
import ServiceView from './subComponents/ServiceView';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';

const ServiceDetails = () => {
  const location = useLocation();
  const serviceId = location?.state?.serviceId;
  const { t } = useTranslation();
  const { fetchedData: serviceDetails, isLoading } = useFetchData(() =>
    fetchServiceDetails(serviceId),
  );
  if (isLoading) {
    return <LoadingCircle />;
  }

  const meetingsUsersIds = serviceDetails?.meetings?.map(
    (meeting) => meeting.freelancerId,
  );
  return (
    <Direction>
      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={10} sm={10}>
          <BreadcrumbsCustomSeparator pageName={t('serviceDetails')} />
          <ServiceView serviceDetails={serviceDetails} />
          <GridContainer>
            {serviceDetails?.meetings?.map((meeting) => (
              <GridItem xs={6}>
                <MeetingDetailsSection
                  serviceState={serviceDetails?.state}
                  meeting={meeting}
                />
              </GridItem>
            ))}
          </GridContainer>
          {serviceDetails.state === SERVICE_STATUS.clientSelection &&
            serviceDetails.candidates?.length > 0 && (
              <ShortlistCandidate
                candidates={serviceDetails?.candidates}
                serviceId={serviceDetails.id}
              />
            )}

          {serviceDetails.assignmentType === 'question' &&
            !!serviceDetails?.question.answers && (
              <AnswersSection
                answers={serviceDetails?.question.answers}
                meetingsUsersIds={meetingsUsersIds}
              />
            )}
        </Grid>
      </Grid>
    </Direction>
  );
};

export default ServiceDetails;
