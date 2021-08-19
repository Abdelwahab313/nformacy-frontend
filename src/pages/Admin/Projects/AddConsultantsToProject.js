import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import AddConsultantsTable from './AddConsultantsTable';
import { addConsultants } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Fragment } from 'react';
import { RoutesPaths } from 'constants/routesPath';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import useLocationState from 'hooks/useLocationState';
import { fetchConsultants } from 'apis/consultantsAPI';

const AddConsultantsToProject = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  // TODO: handle already checked consultants as will be updated
  const [consultantIds, setConsultantIds] = useState([]);
  const projectId = useLocationState((state) => state?.projectId);

  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchConsultants();
  });

  const onAddConsultant = () => {
    addConsultants(projectId, consultantIds).then(() => {
      history.push(RoutesPaths.Admin.Projects);
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
