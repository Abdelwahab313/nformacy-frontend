import React from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import AddConsultantsTable from './AddConsultantsTable';
import { fetchConsultantsList } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Fragment } from 'react';
import { RoutesPaths } from 'constants/routesPath';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useHistory } from 'react-router';
import SubmitButton from 'components/buttons/SubmitButton';
import { useTranslation } from 'react-i18next';

const AddProjectConsultants = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchConsultantsList();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12}>
          <AddConsultantsTable consultants={consultants} />
        </GridItem>
      </GridContainer>
      <SubmitButton
        id='postProjectButton'
        className={classes.addNewConsultantBtn}
        buttonText={t('createNewConsultant')}
        onClick={() => history.push(RoutesPaths.Admin.AddConsultant)}
      />
      <SubmitButton
        id='postProjectButton'
        className={classes.addNewConsultantBtn}
        buttonText={t('addConsultants')}
        onClick={() => {
          history.push(RoutesPaths.Admin.ProjectConsultants);
        }}
      />
    </Fragment>
  );
};
export default AddProjectConsultants;
