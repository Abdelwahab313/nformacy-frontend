import React from 'react';
import { useLocation } from 'react-router';
import { Grid } from '@material-ui/core';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import useFetchData from 'hooks/useFetchData';
import AnswerForm from './subComponents/AnswerForm';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useTranslation } from 'react-i18next';
import AnswerView from 'pages/Admin/Questions/QuestionDetails/subComponents/AnswerView';
import { ANSWER_STATUS } from 'constants/questionStatus';
import QuestionDetailedView from './subComponents/QuestionDetailedView';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';

const AnswerQuestion = () => {
  const location = useLocation();
  const questionId = location.state.questionDetails?.id;
  const { t } = useTranslation();
  const { fetchedData: questionDetails, isLoading } = useFetchData(() =>
    fetchQuestionDetails(questionId),
  );

  if (isLoading) {
    return <LoadingCircle />;
  }
  const answer = questionDetails?.answers[0];
  const answerStatus = answer?.state;
  const isEditableanswer = !answerStatus || answerStatus === ANSWER_STATUS.draft;
  return (
    <Grid
      container
      justify={'center'}
      alignContent={'center'}
      id={'answer-question-page'}>
      <Grid item xs={12} sm={10}>
        <BreadcrumbsCustomSeparator pageName={t('answersCount')} />
        <QuestionDetailedView
          questionDetails={questionDetails}
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        {
          isEditableanswer ?
            (
              <AnswerForm
                questionId={questionDetails?.id}
                savedAnswer={
                  !!answer && answer
                }
              />
            )
            : <AnswerView answer={answer} />
        }
      </Grid>
    </Grid>
  );
};

export default AnswerQuestion;
