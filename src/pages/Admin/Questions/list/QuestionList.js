import React from 'react';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';

import useFetchData from 'hooks/useFetchData';
import { fetchAllQuestions } from 'apis/questionsAPI';
import QuestionsTable from 'pages/Admin/Questions/list/QuestionsTable';

export default function TableList() {
  const {
    fetchedData: questions,
  } = useFetchData(() => fetchAllQuestions());

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody>
            <QuestionsTable questions={questions}/>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
