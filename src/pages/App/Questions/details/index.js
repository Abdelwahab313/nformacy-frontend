import React from 'react';
import { useLocation } from 'react-router';

import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import useFetchData from 'hooks/useFetchData';
import { Grid } from '@material-ui/core';
import QuestionView from 'pages/App/QuestionRoaster/subComponents/QuestionView';
import GridItem from 'components/grid/GridItem';
import AnswerView from 'pages/Admin/Questions/QuestionDetails/subComponents/AnswerView';

const QuestionDetails = () => {
  const location = useLocation();
  const questionId = location?.state?.questionId;

  const { fetchedData: questionDetails, isLoading } = useFetchData(() =>
    fetchQuestionDetails(questionId),
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div>
      <Grid item xs={12} sm={12}>
        <QuestionView
          questionDetails={questionDetails}
          isSubmitVisible={false}
        />
        {!!questionDetails.answers && (
          <GridItem xs={12}>
            {questionDetails.answers?.map((answer, index) => (
              <div id={answer.referenceNumber} key={`answer-${index}`}>
                <AnswerView
                  answer={answer}
                  index={index}
                  setRating={() => {}}
                />
              </div>
            ))}
          </GridItem>
        )}
      </Grid>
    </div>
  );
};

export default QuestionDetails;
