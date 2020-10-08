import React, { useCallback, useEffect, useState } from 'react';
// @material-ui/core components
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/buttons/RegularButton.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import { useHistory, useLocation } from 'react-router';
import useFetchData from 'hooks/useFetchData';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import SuccessSnackBar from 'components/Snackbar/SuccessSnackBar';
import { approveQuestion } from '../../../../apis/questionsAPI';
import QuestionForm from '../QuestionForm';
import { useStyles } from '../../../../styles/Admin/questionFormStyles';
import AnswerView from '../AnswerView';
import authManager from '../../../../services/authManager';

const QuestionDetails = () => {
  const classes = useStyles();
  const [questionDetails, setQuestionDetails] = useState({});
  const [isLoadingForUpdating, setIsLoadingForUpdating] = useState(false);
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  let history = useHistory();

  const location = useLocation();
  const questionId = location.state.questionId;

  let { isLoading, fetchedData: fetchedQuestion, refresh } = useFetchData(() =>
    fetchQuestionDetails(questionId),
  );

  const setRating = useCallback(
    (answerIndex, rating) => {
      const newQuestionDetails = { ...questionDetails };
      newQuestionDetails.answers[answerIndex].rating = rating;
      setQuestionDetails(newQuestionDetails);
    },
    [questionDetails, setQuestionDetails],
  );

  useEffect(() => {
    if (!!fetchedQuestion && !!fetchedQuestion.id) {
      setQuestionDetails(fetchedQuestion);
    }
  }, [fetchedQuestion]);

  useEffect(() => {
    if (!!questionId) {
      refresh(() => fetchQuestionDetails(questionId));
    }
  }, [questionId]);
  if (isLoading) {
    return <LoadingCircle />;
  }

  const onDeployQuestionClicked = () => {
    setIsLoadingForUpdating(true);
    approveQuestion(questionDetails.id)
      .then(() => {
        history.push('/admin/questions');
      })
      .catch(() => {})
      .finally(() => setIsLoadingForUpdating(false));
  };

  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Edit Question</h4>
          </CardHeader>
          <QuestionForm
            questionDetails={questionDetails}
            setQuestionDetails={setQuestionDetails}
            isLoadingForUpdating={isLoadingForUpdating}
            setIsSnackbarShown={setIsSnackbarShown}
            setSnackbarMessage={setSnackbarMessage}
            setIsError={setIsError}
            isNewQuestion={false}
          />
          <CardFooter className={classes.footerButtons}>
            {authManager.isAdmin() &&
              questionDetails.state === 'pending_deployment_to_roaster' && (
                <Button
                  id={'approveQuestion'}
                  disabled={isLoadingForUpdating}
                  onClick={onDeployQuestionClicked}
                  color='primary'>
                  Deploy to question roaster
                </Button>
              )}
            <SuccessSnackBar
              isError={isError}
              isSnackbarShown={isSnackbarShown}
              closeSnackBar={() => setIsSnackbarShown(false)}
              content={snackbarMessage}
            />
          </CardFooter>
        </Card>
      </GridItem>
      {questionDetails.answers && (
        <GridItem xs={12}>
          {questionDetails.answers?.map((answer, index) => (
            <div id={answer.referenceNumber} key={`answer-${index}`}>
              <AnswerView answer={answer} index={index} setRating={setRating} />
            </div>
          ))}
        </GridItem>
      )}
    </GridContainer>
  );
};

export default QuestionDetails;
