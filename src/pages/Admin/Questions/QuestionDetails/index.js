import React, { useCallback, useEffect, useState } from 'react';
// @material-ui/core components
// core components
import GridItem from 'components/grid/GridItem.js';
import GridContainer from 'components/grid/GridContainer.js';
import Button from 'components/buttons/RegularButton.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import CardFooter from 'components/card/CardFooter.js';
import { useHistory, useLocation } from 'react-router';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { approveQuestion } from '../../../../apis/questionsAPI';
import QuestionForm from './subComponents/QuestionForm';
import { useStyles } from '../../../../styles/Admin/questionFormStyles';
import AnswerView from './subComponents/AnswerView';
import authManager from '../../../../services/authManager';
import { QuestionProvider, useQuestionContext } from './context';
import { Box, Typography } from '@material-ui/core';
import { updateQuestionDetails } from './context/questionAction';
import { useSnackBar } from 'context/SnackBarContext';
import { QUESTION_STATUS } from 'constants/questionStatus';

const QuestionDetailsPage = () => {
  const classes = useStyles();
  const [{ questionDetails }, dispatch] = useQuestionContext();
  const [isLoadingForUpdating, setIsLoadingForUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  const location = useLocation();
  const questionId = location?.state?.questionId;
  const isNewQuestion = !questionId;
  const [shortlisted, setShortlisted] = useState([]);
  const { showErrorMessage } = useSnackBar();
  useEffect(() => {
    setIsLoading(true);
    fetchQuestionDetails(questionId)
      .then((response) => {
        updateQuestionDetails(dispatch, response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const setRating = useCallback(
    (answerIndex, rating) => {
      const newQuestionDetails = { ...questionDetails };
      newQuestionDetails.answers[answerIndex].rating = rating;
      updateQuestionDetails(dispatch, newQuestionDetails);
    },
    [questionDetails, dispatch],
  );
  const allowCheck = (answer) => {
    return (
      shortlisted.length < 3 ||
      shortlisted.some((item) => item.id === answer.id)
    );
  };
  const addRemoveAnswerToShortlistedArray = (answer) => {
    if (shortlisted.indexOf(answer) === -1) {
      setShortlisted([...shortlisted, answer]);
    } else {
      setShortlisted(shortlisted.filter((item) => item.id !== answer.id));
    }
  };
  const changeCheck = (answer) => {
    if (allowCheck(answer)) {
      addRemoveAnswerToShortlistedArray(answer);
    } else {
      showErrorMessage(
        'You already have 3 shortlisted please remove one first',
      );
    }
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  const onDeployQuestionClicked = () => {
    setIsLoadingForUpdating(true);
    approveQuestion(questionDetails.id)
      .then(() => {
        history.push('/admin/questions');
      })
      .finally(() => setIsLoadingForUpdating(false));
  };

  return (
    <GridContainer justify={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Typography component={'h4'} id={'post-question-page-header'}>
              {isNewQuestion ? 'Add Question' : 'Edit Question'}
            </Typography>
          </CardHeader>
          <QuestionForm isNewQuestion={isNewQuestion} />
          <CardFooter className={classes.footerButtons}>
            {!isNewQuestion &&
              authManager.isAdmin() &&
              questionDetails.state === 'pending_deployment_to_roaster' && (
                <Button
                  id={'approveQuestion'}
                  disabled={isLoadingForUpdating}
                  onClick={onDeployQuestionClicked}
                  color='primary'>
                  Deploy to question roaster
                </Button>
              )}
          </CardFooter>
        </Card>
      </GridItem>
      {!!shortlisted.length && (
        <GridItem xs={12}>
          <Card>
            <CardHeader color='primary'>
              <Typography component={'h4'} id={'shortlistedAnswer-header'}>
                Shortlisted
              </Typography>
            </CardHeader>
            {shortlisted?.map((answer, index) => (
              <Box
                mx={4}
                id={'shortlisted' + answer.referenceNumber}
                key={`shortlistedAnswer-${index}`}>
                <AnswerView
                  answer={answer}
                  index={index}
                  setRating={setRating}
                  changeCheck={changeCheck}
                  isShortListed={true}
                  showShortListOption={
                    questionDetails.state === QUESTION_STATUS.shortlisting
                  }
                />
              </Box>
            ))}
          </Card>
        </GridItem>
      )}
      {!isNewQuestion && questionDetails.answers && (
        <GridItem xs={12}>
          {questionDetails.answers?.map((answer, index) => (
            <div id={answer.referenceNumber} key={`answer-${index}`}>
              <AnswerView
                answer={answer}
                index={index}
                setRating={setRating}
                changeCheck={changeCheck}
                showShortListOption={
                  questionDetails.state === QUESTION_STATUS.shortlisting
                }
                isShortListed={shortlisted.some(
                  (item) => item.id === answer.id,
                )}
              />
            </div>
          ))}
        </GridItem>
      )}
    </GridContainer>
  );
};

const QuestionDetails = (props) => {
  return (
    <QuestionProvider>
      <QuestionDetailsPage {...props} />
    </QuestionProvider>
  );
};
export default QuestionDetails;
