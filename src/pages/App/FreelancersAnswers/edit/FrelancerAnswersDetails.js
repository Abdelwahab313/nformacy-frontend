import React from 'react';
import { Grid } from '@material-ui/core';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import QuestionDetailedView from './subComponents/QuestionDetailedView';
import { useTranslation } from 'react-i18next';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import { ANSWER_STATUS } from 'constants/questionStatus';
import AnswerForm from './subComponents/AnswerForm';
import AnswerView from 'pages/Admin/Questions/QuestionDetails/subComponents/AnswerView';
import GridItem from 'components/grid/GridItem';

const FrelancerAnswersDetails = () => {
  const { t } = useTranslation();
  const questionId = 1;
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
      alignContent={'center'}>
      <Grid item xs={12} sm={10}>
        <BreadcrumbsCustomSeparator pageName={t('answersDetails')} />
        <QuestionDetailedView
          questionDetails={questionDetails}
        />
      </Grid>
      <Grid item={12} sm={10}>
        {/* {serviceDetails?.meetings?.map((meeting) => ( */}
        <GridItem xs={6}>
          meeting details
          {/* <MeetingDetailsSection
            meeting={meeting}
          /> */}
        </GridItem>
        {/* ))} */}
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

export default FrelancerAnswersDetails;
