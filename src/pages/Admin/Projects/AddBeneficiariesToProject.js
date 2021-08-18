import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import { addBeneficiaries } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Fragment } from 'react';
import { RoutesPaths } from 'constants/routesPath';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import AddBeneficiariesTable from './AddBenficiariesTable';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import useLocationState from 'hooks/useLocationState';
import { fetchClients } from 'apis/clientsAPI';

const AddBeneficiariesToProject = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

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
      <GridContainer>
        <GridItem xs={12} className={classes.addConsultantsTable}>
          <AddBeneficiariesTable
            setBeneficiaryIds={setBeneficiaryIds}
            beneficiaries={beneficiaries}
          />
        </GridItem>
      </GridContainer>

      <ActionButtonsContainer
        primaryButton={{
          id: 'addConsultants',
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
export default AddBeneficiariesToProject;
