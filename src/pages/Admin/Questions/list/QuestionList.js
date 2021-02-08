import React, { useCallback } from 'react';
import GridItem from 'components/grid/GridItem.js';
import GridContainer from 'components/grid/GridContainer.js';
import Card from 'components/card/Card.js';
import CardBody from 'components/card/CardBody.js';
import QuestionsTable from 'pages/Admin/Questions/list/QuestionsTable';
import useFetchData from 'hooks/useFetchData';
import { fetchAllQuestions, fetchQuestionsOfAdviser } from 'apis/questionsAPI';
import { getRemainingHoursFromDate } from 'services/dateTimeParser';
import authManager from '../../../../services/authManager';
import SubmitButton from '../../../../components/buttons/SubmitButton';
import AddIcon from '@material-ui/icons/Add';
import { RoutesPaths } from '../../../../constants/routesPath';
import { useHistory } from 'react-router';
import { useStyles } from '../../../../styles/Admin/postQuestionStyles';
import QuestionGuardian from 'core/guardians/QuestionGuardian';

export default function TableList() {
  const { fetchedData: fetchedQuestions } = useFetchData(() => {
    if (authManager.isAdviser()) {
      return fetchQuestionsOfAdviser();
    } else {
      return fetchAllQuestions();
    }
  });
  const history = useHistory();
  const classes = useStyles();

  const questions = authManager.isAdviser()
    ? fetchedQuestions.filter(
        (question) =>
          getRemainingHoursFromDate(question.currentActionTime) > 0 ||
          !question.currentActionTime,
      )
    : fetchedQuestions;

  const navigateToPostQuestion = useCallback(() => {
    history.push(RoutesPaths.Admin.PostQuestion);
  }, [history]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {QuestionGuardian.canCreateNewQuestion() && (
          <SubmitButton
            id='postQuestionButton'
            className={classes.postQuestionButton}
            buttonText='Post Question'
            startIcon={<AddIcon />}
            onClick={navigateToPostQuestion}
          />
        )}
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
