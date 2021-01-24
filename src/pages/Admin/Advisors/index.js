import React from 'react';
import GridItem from 'components/grid/GridItem';

import CardBody from 'components/card/CardBody';
import GridContainer from 'components/grid/GridContainer';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';
import { useStyles } from 'styles/Admin/questionFormStyles';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import Card from 'components/card/Card';
import AdvisorsTable from 'templates/advisors/AdvisorsTable';
import { fetchAdvisors } from 'apis/advisorAPI';

const AdvisorsList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { fetchedData: advisors, isLoading } = useFetchData(() => {
    return fetchAdvisors();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.addAdminBtn}>
        <SubmitButton
          id={'addAdvisorBtn'}
          onClick={() => history.push(RoutesPaths.Admin.AddAdvisor)}
          buttonText={
            <CustomTypography variant='body1'>
              {t('addAdvisorBtn')}
            </CustomTypography>
          }
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <AdvisorsTable advisors={advisors} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default AdvisorsList;
