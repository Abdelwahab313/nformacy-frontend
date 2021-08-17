import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import AddConsultantsTable from './AddConsultantsTable';
import { fetchProjectConsultants, addConsultants } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Fragment } from 'react';
import { RoutesPaths } from 'constants/routesPath';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';

const AddConsultantsToProject = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [consultantIds, setConsultantIds] = useState([]);

  const projectId = 1;

  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchProjectConsultants(1);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  const onAddConsultant = () => {
    addConsultants(projectId, consultantIds).then(() => {
      history.push(RoutesPaths.Admin.AddBeneficiariesToProjectWizard);
    });
  };

  const onCreateConsultants = () => {
    history.push(RoutesPaths.Admin.AddConsultant);
  };

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} className={classes.addConsultantsTable}>
          <AddConsultantsTable
            setConsultantIds={setConsultantIds}
            consultants={consultants}
          />
        </GridItem>
      </GridContainer>

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
export default AddConsultantsToProject;
