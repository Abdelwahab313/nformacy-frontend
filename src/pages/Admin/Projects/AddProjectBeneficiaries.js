import React from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import { fetchBeneficiariesList } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Fragment } from 'react';
import { RoutesPaths } from 'constants/routesPath';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useHistory } from 'react-router';
import SubmitButton from 'components/buttons/SubmitButton';
import { useTranslation } from 'react-i18next';
import AddBeneficiariesTable from './AddBenficiariesTable';

const AddProjectBeneficiaries = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const { fetchedData: beneficiaries, isLoading } = useFetchData(() => {
    return fetchBeneficiariesList();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12}>
          <AddBeneficiariesTable beneficiaries={beneficiaries} />
        </GridItem>
      </GridContainer>
      <SubmitButton
        id='postProjectButton'
        className={classes.addNewConsultantBtn}
        buttonText={t('createNewBeneficiary')}
        onClick={() => history.push(RoutesPaths.Admin.AddBeneficiary)}
      />
      <SubmitButton
        id='postProjectButton'
        className={classes.addNewConsultantBtn}
        buttonText={t('addBeneficiaries')}
        onClick={() => {
          history.push(RoutesPaths.Admin.ProjectBeneficiaries);
        }}
      />
    </Fragment>
  );
};
export default AddProjectBeneficiaries;
