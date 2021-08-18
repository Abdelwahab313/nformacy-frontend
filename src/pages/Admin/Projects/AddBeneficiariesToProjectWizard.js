import React, { Fragment, useState } from 'react';
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
import { addBeneficiaries } from 'apis/projectsAPI';
import useLocationState from 'hooks/useLocationState';

const AddBeneficiariesToProjectWizard = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [beneficiaryIds, setBeneficiaryIds] = useState([]);
  const projectId = useLocationState((state) => state?.projectId);

  const { fetchedData: beneficiaries, isLoading } = useFetchData(() => {
    return fetchClients();
  });

  const onAddBeneficiaries = () => {
    addBeneficiaries(projectId, beneficiaryIds).then(() => {
      history.push(RoutesPaths.Admin.Projects);
    });
  };

  const onCreateBeneficiaries = () => {
    history.push(RoutesPaths.Admin.AddBeneficiary);
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
        <AddBeneficiariesTable
          setBeneficiaryIds={setBeneficiaryIds}
          beneficiaries={beneficiaries}
        />
      </CardBody>

      <ActionButtonsContainer
        primaryButton={{
          id: 'addBenefeciaries',
          onClick: () => {
            onAddBeneficiaries();
          },
          buttonText: t('addBeneficiaries'),
        }}
        secondaryButton={{
          id: 'createBeneficiaries',
          onClick: () => {
            onCreateBeneficiaries();
          },
          buttonText: t('createBeneficiaries'),
        }}
      />
    </Fragment>
  );
};

export default AddBeneficiariesToProjectWizard;
