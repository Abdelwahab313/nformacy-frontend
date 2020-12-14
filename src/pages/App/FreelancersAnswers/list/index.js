

import React from 'react';
import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Box } from '@material-ui/core';
import Direction from 'components/grid/Direction';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import AnswersTable from 'templates/answers/AnswersTable';
import { fetchFreelancerAnswers } from 'apis/answersAPI';


const FreelancersAnswersPage = () => {
  const { t } = useTranslation();
  const { fetchedData: answers, isLoading } = useFetchData(
    fetchFreelancerAnswers,
  );

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
              <AnswersTable answers={answers} />
            </Direction>
          </CardBody>
        </Card>
      </GridItem>
    </Box>
  );
};

export default FreelancersAnswersPage;

