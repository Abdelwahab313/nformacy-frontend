import React from 'react';
import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import { Box } from '@material-ui/core';
import Direction from 'components/grid/Direction';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import ClientActivitiesFullTable from './ClientActivitiesFullTable';

const ClientActivitiesFullView = () => {
  const { t } = useTranslation();

  return (
    <Box mx='auto'>
      <GridItem xs={12} sm={12} md={12}>
        <BreadcrumbsCustomSeparator pageName={t('activitiesList')} />
        <Card plain>
          <CardBody id='AnswersList'>
            <Direction>
              <ClientActivitiesFullTable />
            </Direction>
          </CardBody>
        </Card>
      </GridItem>
    </Box>
  );
};

export default ClientActivitiesFullView;
