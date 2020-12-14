import React from 'react';
import { useLocation } from 'react-router';
import { Grid } from '@material-ui/core';
import QuestionView from '../../QuestionRoaster/subComponents/QuestionView';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import useFetchData from 'hooks/useFetchData';
import AnswerForm from './subComponents/AnswerForm';
import LoadingCircle from 'components/progress/LoadingCircle';

const AnswerQuestion = () => {
  const location = useLocation();
  const questionId = location.state.questionDetails?.id;

  const { fetchedData: questionDetails, isLoading } = useFetchData(() =>
    fetchQuestionDetails(questionId),
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Grid
      container
      justify={'center'}
      alignContent={'center'}
      id={'answer-question-page'}>
      <Grid item xs={12} sm={10}>
        <QuestionView
          questionDetails={questionDetails}
          isSubmitVisible={false}
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <AnswerForm
          questionId={questionDetails?.id}
          savedAnswer={
            !!questionDetails?.answers[0] && questionDetails?.answers[0]
          }
        />
      </Grid>
    </Grid>
  );
};

export default AnswerQuestion;
