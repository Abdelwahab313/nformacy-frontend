import React, { Fragment } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardBody from 'components/card/CardBody';
import { Grid, Typography } from '@material-ui/core';
import CardHeader from 'components/card/CardHeader';
import { useTranslation } from 'react-i18next';
import AddConsultantsTable from './AddConsultantsTable';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import { history } from 'services/navigation';
import { RoutesPaths } from 'constants/routesPath';
import { fetchConsultants } from 'apis/consultantsAPI';

const ListOfProjectConsultants = () => {
  const { t } = useTranslation();

  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchConsultants();
  });

  const handleSubmit = () => {
    history.push(RoutesPaths.Admin.ListOfProjectBeneficiaries);
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Typography component={'h4'}>{t('consultantsList')}</Typography>
              </Grid>
            </Grid>
          </CardHeader>
        </GridItem>
      </GridContainer>
      <CardBody>
        <AddConsultantsTable consultants={consultants} />
      </CardBody>

      <ActionButtonsContainer
        primaryButton={{
          id: 'addConsultant',
          onClick: () => {
            handleSubmit();
          },
          buttonText: 'Next',
        }}
      />
    </Fragment>
  );
};

export default ListOfProjectConsultants;
