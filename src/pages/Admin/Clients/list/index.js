import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import ClientsTable from 'templates/clients/ClientsTable';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchClients } from 'apis/clientsAPI';
import useFetchData from 'hooks/useFetchData';
import SubmitButton from 'components/buttons/SubmitButton';
import { history } from 'services/navigation';
import { RoutesPaths } from 'constants/routesPath';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';

const ClientsList = () => {
  const { t } = useTranslation();
  const { fetchedData: clients, isLoading } = useFetchData(() => {
    return fetchClients();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <SubmitButton
          id={'addClientBtn'}
          onClick={() => history.push(RoutesPaths.Admin.AddBeneficiary)}
          buttonText={
            <CustomTypography variant='body1'>
              {t('createNewBeneficiary')}
            </CustomTypography>
          }
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ClientsTable clients={clients} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ClientsList;
