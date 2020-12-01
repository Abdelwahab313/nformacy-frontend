import React from 'react';
import { useLocation } from 'react-router';

import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import useFetchData from 'hooks/useFetchData';
import { Grid } from '@material-ui/core';
import QuestionView from 'pages/App/QuestionRoaster/subComponents/QuestionView';
import GridItem from 'components/grid/GridItem';
import AnswerView from 'pages/Admin/Questions/QuestionDetails/subComponents/AnswerView';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Direction from 'components/grid/Direction';

const QuestionDetails = () => {
  const location = useLocation();
  const questionId = location?.state?.questionId;
  const { t } = useTranslation();
  const { fetchedData: questionDetails, isLoading } = useFetchData(() =>
    fetchQuestionDetails(questionId),
  );
  if (isLoading) {
    return <LoadingCircle />;
  }
  // const shortlisted = questionDetails.answers.filter(
  //   (item) => item.state === 'shortlisted',
  // );

  return (
    <Direction>
      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={10} sm={10}>
          <BreadcrumbsCustomSeparator pageName={t('questionDetails')} />
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
      </Grid>
    </Direction>
  );
};

export default QuestionDetails;
