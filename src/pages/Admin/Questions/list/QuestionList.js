import React from 'react';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import QuestionsTable from 'pages/Admin/Questions/list/QuestionsTable';
import { useAuth } from '../../../../pages/auth/context/auth';
import useFetchData from 'hooks/useFetchData';
import { fetchAllQuestions, fetchQuestionsOfAdviser } from 'apis/questionsAPI';
import { getRemainingHoursFromDate } from 'services/dateTimeParser';

const isAdviser = (user) => {
  return user.roles.some((role) => role.name === 'adviser');
};

export default function TableList() {
  const [{ currentUser }] = useAuth();

  const { fetchedData: fetchedQuestions } = useFetchData(() => {
    if(isAdviser(currentUser)) {
      return fetchQuestionsOfAdviser();
    } else {
      return fetchAllQuestions();
    }
  });

  const questions = isAdviser(currentUser) ? fetchedQuestions.filter(
    (question) => getRemainingHoursFromDate(question.currentActionTime) > 0,
  ) : fetchedQuestions;

  console.log('======current user=======', currentUser);
  console.log('============is adviser======', isAdviser(currentUser));
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id="questionsList">
              <QuestionsTable questions={questions} isAdviser={isAdviser} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
