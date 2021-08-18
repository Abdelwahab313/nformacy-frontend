import React from 'react';

import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import GridContainer from 'components/grid/GridContainer';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchProjectBeneficiaries } from 'apis/projectsAPI';
import SubmitButton from 'components/buttons/SubmitButton';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import ProjectBeneficiariesTable from './ProjectBeneficiariesTable';
import useLocationState from 'hooks/useLocationState';
import { getAddBeneficiariesToProjectPath } from 'services/navigation';

const ProjectBeneficiariesList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const projectId = useLocationState((state) => state?.projectId);
  const { fetchedData: beneficiaries, isLoading } = useFetchData(() => {
    return fetchProjectBeneficiaries(projectId);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <SubmitButton
          id='postBeneficiaryButton'
          className={classes.postProjectButton}
          buttonText={t('addBeneficiaries')}
          startIcon={<AddIcon />}
          onClick={() => {
            history.push(getAddBeneficiariesToProjectPath(projectId));
          }}
        />
        <Card plain>
          <CardBody id='beneficiariesList'>
            <ProjectBeneficiariesTable beneficiaries={beneficiaries} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ProjectBeneficiariesList;
