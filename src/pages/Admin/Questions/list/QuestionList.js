import React from 'react';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import QuestionsTable from 'pages/Admin/Questions/list/QuestionsTable';
import useFetchData from 'hooks/useFetchData';
import { fetchAllQuestions, fetchQuestionsOfAdviser } from 'apis/questionsAPI';
import { getRemainingHoursFromDate } from 'services/dateTimeParser';
import authManager from '../../../../services/authManager';

export default function TableList() {
  const { fetchedData: fetchedQuestions } = useFetchData(() => {
    if (authManager.isAdviser()) {
      return fetchQuestionsOfAdviser();
    } else {
      return fetchAllQuestions();
    }
  });

  const questions = authManager.isAdviser()
    ? fetchedQuestions.filter(
        (question) =>
          getRemainingHoursFromDate(question.currentActionTime) > 0 ||
          !question.currentActionTime
      )
    : fetchedQuestions;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <QuestionsTable
              questions={questions}
              isAdviser={authManager.isAdviser()}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
