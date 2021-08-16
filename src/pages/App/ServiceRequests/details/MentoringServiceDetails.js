import React from 'react';

import { Grid } from '@material-ui/core';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Direction from 'components/grid/Direction';
import MeetingDetailsSection from './subComponents/MeetingDetailsSection';
import ServiceView from './subComponents/ServiceView';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import MentoringDetailsSection from 'templates/mentoring/MentoringDetailsSection';

const MentoringServiceDetails = ({ serviceDetails }) => {
  const { t } = useTranslation();

  return (
    <Direction>
      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={10} sm={10}>
          <BreadcrumbsCustomSeparator pageName={t('mentoringServiceDetails')} />
          <ServiceView serviceDetails={serviceDetails} />
          <GridContainer>
            {serviceDetails?.meetings?.map((meeting) => (
              <GridItem xs={6}>
                <MeetingDetailsSection meeting={meeting} />
              </GridItem>
            ))}
          </GridContainer>
          <MentoringDetailsSection serviceDetails={serviceDetails} />
        </Grid>
      </Grid>
    </Direction>
  );
};

export default MentoringServiceDetails;
