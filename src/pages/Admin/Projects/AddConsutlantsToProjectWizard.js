import React, { Fragment, useEffect, useState } from 'react';

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
import { getBeneficiariesProjectWizard, history } from 'services/navigation';
import { RoutesPaths } from 'constants/routesPath';
import { fetchConsultants } from 'apis/consultantsAPI';
import { addConsultants, fetchProjectConsultants } from 'apis/projectsAPI';
import useLocationState from 'hooks/useLocationState';

const AddConsutlantsToProjectWizard = () => {
  const { t } = useTranslation();

  const [consultantIds, setConsultantIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const projectId = useLocationState((state) => state?.projectId);

  const { fetchedData: consultants } = useFetchData(() => {
    return fetchConsultants();
  });

  useEffect(() => {
    if (!!projectId) {
      setIsLoading(true);
      fetchProjectConsultants(projectId)
        .then((response) => {
          const consultantsList = response.data;
          if (consultantsList.length > 0) {
            setConsultantIds(
              consultantsList.map((consultant) => consultant.id),
            );
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const onAddConsultant = () => {
    addConsultants(projectId, consultantIds).then(() => {
      history.push(getBeneficiariesProjectWizard(projectId));
    });
  };

  const onCreateConsultants = () => {
    history.push(RoutesPaths.Admin.AddConsultant);
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
        <AddConsultantsTable
          setConsultantIds={setConsultantIds}
          consultantIds={consultantIds}
          consultants={consultants}
        />
      </CardBody>

      <ActionButtonsContainer
        primaryButton={{
          id: 'addConsultants',
          onClick: () => {
            onAddConsultant();
          },
          buttonText: t('addConsultants'),
        }}
        secondaryButton={{
          id: 'createConsultants',
          onClick: () => {
            onCreateConsultants();
          },
          buttonText: t('createConsultants'),
        }}
      />
    </Fragment>
  );
};

export default AddConsutlantsToProjectWizard;
