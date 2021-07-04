import React from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import AddConsultantsTable from './AddConsultantsTable';
import { fetchConsultantsList } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import SubmitButton from 'components/buttons/SubmitButton';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import { useHistory } from 'react-router';
import { RoutesPaths } from 'constants/routesPath';

const AddProjectConsultants = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchConsultantsList();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }
  const navigateToConsultantsList = () => {
    history.push(RoutesPaths.Admin.ProjectConsultants);
  };
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12}>
          <AddConsultantsTable consultants={consultants} />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={6}></GridItem>
        <GridItem xs={4}>
          <SubmitButton
            id='postProjectButton'
            className={classes.addNewConsultantBtn}
            buttonText={t('createNewConsultant')}
            onClick={() => history.push(RoutesPaths.Admin.AddConsultant)}
          />
        </GridItem>
        <GridItem xs={2}>
          <SubmitButton
            id='postProjectButton'
            className={classes.addNewConsultantBtn}
            buttonText={t('addConsultants')}
            onClick={navigateToConsultantsList}
          />
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};
export default AddProjectConsultants;
