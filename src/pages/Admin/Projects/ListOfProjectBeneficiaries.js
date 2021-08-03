import React, { Fragment } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardBody from 'components/card/CardBody';
import { Grid, Typography } from '@material-ui/core';
import CardHeader from 'components/card/CardHeader';
import { useTranslation } from 'react-i18next';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import AddBeneficiariesTable from './AddBenficiariesTable';
import { useStyles } from 'styles/Admin/postProjectStyles';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import { history } from 'services/navigation';
import { RoutesPaths } from 'constants/routesPath';
import { fetchClients } from 'apis/clientsAPI';

const ListOfProjectBeneficiaries = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { fetchedData: beneficiaries, isLoading } = useFetchData(() => {
    return fetchClients();
  });

  const handleSubmit = () => {
    history.push(RoutesPaths.Admin.Projects);
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Fragment>
      <GridContainer className={classes.beneficiariesSection}>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Typography component={'h4'}>
                  {t('beneficiariesList')}
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
        </GridItem>
      </GridContainer>

      <CardBody>
        <AddBeneficiariesTable beneficiaries={beneficiaries} />
      </CardBody>

      <ActionButtonsContainer
        primaryButton={{
          id: 'addBenefeciaries',
          onClick: () => {
            handleSubmit();
          },
          buttonText: 'Submit',
        }}
      />
    </Fragment>
  );
};

export default ListOfProjectBeneficiaries;
