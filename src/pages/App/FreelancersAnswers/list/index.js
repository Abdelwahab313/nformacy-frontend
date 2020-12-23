import React from 'react';
import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Box } from '@material-ui/core';
import Direction from 'components/grid/Direction';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import AnswersTable from 'templates/answers/AnswersTable';
import useFetchFreelancerActivities from 'hooks/useFetchFreelancerActivities';

const FreelancersActivitiesPage = () => {
  const { t } = useTranslation();
  const { activities, isLoading } = useFetchFreelancerActivities();

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box mx='auto'>
      <GridItem xs={12} sm={12} md={12}>
        <BreadcrumbsCustomSeparator pageName={t('answersList')} />
        <Card plain>
          <CardBody id='AnswersList'>
            <Direction>
              <AnswersTable activities={activities} />
            </Direction>
          </CardBody>
        </Card>
      </GridItem>
    </Box>
  );
};

export default FreelancersActivitiesPage;
