import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import { addBeneficiaries, fetchProjectBeneficiaries } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Fragment } from 'react';
import { RoutesPaths } from 'constants/routesPath';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import AddBeneficiariesTable from './AddBenficiariesTable';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';

const AddProjectBeneficiaries = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const projectId = 1;

  const [beneficiaryIds, setBeneficiaryIds] = useState([]);

  const { fetchedData: beneficiaries, isLoading } = useFetchData(() => {
    return fetchProjectBeneficiaries(1);
  });

  const onAddBeneficiaries = () => {
    addBeneficiaries(projectId, beneficiaryIds).then(() => {
      history.push(RoutesPaths.Admin.AddBeneficiariesToProjectWizard);
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
export default AddProjectBeneficiaries;
