import React from 'react';

import { Grid } from '@material-ui/core';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Direction from 'components/grid/Direction';
import ShortlistCandidate from 'pages/App/ServiceRequests/details/subComponents/ShortlistCandidate';
import { SERVICE_STATUS } from 'constants/questionStatus';
import AnswersSection from './subComponents/AnswersSection';
import MeetingDetailsSection from './subComponents/MeetingDetailsSection';
import ServiceView from './subComponents/ServiceView';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';

const ClientServiceDetails = ({ serviceDetails }) => {
  const { t } = useTranslation();

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
              <GridItem md={6} xs={12}>
                <MeetingDetailsSection meeting={meeting} />
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
            !!serviceDetails?.answers && (
              <AnswersSection
                answers={serviceDetails?.answers}
                meetingsUsersIds={meetingsUsersIds}
              />
            )}
        </Grid>
      </Grid>
    </Direction>
  );
};

export default ClientServiceDetails;
