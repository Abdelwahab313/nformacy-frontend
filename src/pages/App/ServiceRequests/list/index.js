import React from 'react';
import GridItem from 'components/grid/GridItem';

import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import ServicesTable from '../../../../templates/services/ServicesTable';
import useFetchData from 'hooks/useFetchData';
import { fetchClientServices } from 'apis/servicesAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Box, Grid } from '@material-ui/core';
import Direction from 'components/grid/Direction';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';

const ServicesPage = () => {
  const { t } = useTranslation();
  const { fetchedData: services, isLoading } = useFetchData(
    fetchClientServices,
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box mx='auto'>
      <GridItem xs={12} sm={12} md={12}>
        <Direction>
          <Grid item xs={10}>
            <BreadcrumbsCustomSeparator pageName={t('serviceRequestList')} />
          </Grid>
        </Direction>
        <Card plain>
          <CardBody id='ServicesList'>
            <Direction>
              <ServicesTable services={services} />
            </Direction>
          </CardBody>
        </Card>
      </GridItem>
    </Box>
  );
};

export default ServicesPage;
