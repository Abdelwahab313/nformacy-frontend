import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchBeneficiariesList } from 'apis/projectsAPI';
import SubmitButton from 'components/buttons/SubmitButton';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useTranslation } from 'react-i18next';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';
import AddBeneficiariesTable from '../AddBenficiariesTable';

const ProjectBeneficiariesList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const { fetchedData: beneficiaries, isLoading } = useFetchData(() => {
    return fetchBeneficiariesList();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }
  const navigateToPostConsultant = () => {
    history.push(RoutesPaths.Admin.AddProjectConsultants);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <SubmitButton
          id='postConsultantButton'
          className={classes.postProjectButton}
          buttonText={t('addBeneficiaries')}
          startIcon={<AddIcon />}
          onClick={navigateToPostConsultant}
        />
        <Card plain>
          <CardBody id='beneficiariesList'>
            <AddBeneficiariesTable beneficiaries={beneficiaries} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ProjectBeneficiariesList;
