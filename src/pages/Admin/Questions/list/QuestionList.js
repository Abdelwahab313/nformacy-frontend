import React from 'react';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import QuestionsTable from 'pages/Admin/Questions/list/QuestionsTable';
import AdviserQuestionTable from 'pages/Admin/Questions/list/AdviserQuestionTable';
import { useAuth } from '../../../../pages/auth/context/auth';

const isAdviser = (user) => {
  return user.roles.some((role) => role.name === 'adviser');
};

export default function TableList() {
  const [{ currentUser }] = useAuth();

  console.log('======current user=======', currentUser);
  console.log('============is adviser======', isAdviser(currentUser));
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id="questionsList">
            {isAdviser(currentUser) ? (
              <AdviserQuestionTable currentUser={currentUser} />
            ) : (
              <QuestionsTable />
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
