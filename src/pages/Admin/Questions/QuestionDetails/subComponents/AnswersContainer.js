import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
// @material-ui/core components
// core components
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { useHistory } from 'react-router';
import { submitShortlisted } from 'apis/questionsAPI';
import { useStyles } from 'styles/Admin/questionFormStyles';
import AnswerView from './AnswerView';
import { useQuestionContext } from '../context';
import { Box, Typography } from '@material-ui/core';
import { updateQuestionDetails } from '../context/questionAction';
import { useSnackBar } from 'context/SnackBarContext';
import { ANSWER_STATUS, QUESTION_STATUS } from 'constants/questionStatus';
import SubmitButton from 'components/buttons/SubmitButton';
import { shortlistAnswer } from 'apis/answersAPI';
import { RoutesPaths } from 'constants/routesPath';

const shortlistedStates = [
  ANSWER_STATUS.shortlisted,
  ANSWER_STATUS.clientSelected,
];

const AnswersContainer = () => {
  const classes = useStyles();

  let history = useHistory();
  const [shortlistedIds, setShortlistedIds] = useState([]);
  const [{ questionDetails }, dispatch] = useQuestionContext();
  const { showErrorMessage, showSuccessMessage } = useSnackBar();

  const answersCount = useMemo(() => {
    return questionDetails.answers?.length;
  }, [questionDetails.answers]);

  useEffect(() => {
    if (questionDetails?.answers?.length > 0) {
      const fetchedShortlistedIds = questionDetails?.answers
        ?.filter((answer) => {
          return shortlistedStates.includes(answer?.state);
        })
        .map((answer) => answer?.id);
      setShortlistedIds(fetchedShortlistedIds);
    }
  }, [answersCount]);

  const shortlistedAnswers = useMemo(() => {
    return questionDetails.answers?.filter((item) =>
      shortlistedIds.includes(item.id),
    );
  }, [shortlistedIds, questionDetails.answers]);

  const normalAnswers = useMemo(() => {
    return questionDetails.answers?.filter(
      (item) => !shortlistedIds.includes(item.id),
    );
  }, [shortlistedIds, questionDetails.answers]);

  const isShortlistingQuestion =
    questionDetails.state === QUESTION_STATUS.shortlisting;
  const isReviewQuestion =
    questionDetails.state === QUESTION_STATUS.answersRating ||
    questionDetails.state === QUESTION_STATUS.freelancerAnswers;

  const setRating = useCallback(
    (answerIndex, rating) => {
      const newQuestionDetails = { ...questionDetails };
      newQuestionDetails.answers[answerIndex].rating = rating;
      updateQuestionDetails(dispatch, newQuestionDetails);
    },
    [questionDetails, dispatch],
  );

  const canCheckAnswer = (answerId) => {
    return shortlistedIds.length < 3 || shortlistedIds.includes(answerId);
  };

  const addOrRemoveAnswer = (answerId) => {
    if (shortlistedIds.includes(answerId)) {
      setShortlistedIds(shortlistedIds.filter((id) => id !== answerId));
    } else {
      setShortlistedIds([...shortlistedIds, answerId]);
    }
  };
  const onCheckAnswer = (answerId) => {
    if (canCheckAnswer(answerId)) {
      addOrRemoveAnswer(answerId);
    } else {
      showErrorMessage(
        'You already have 3 shortlisted please remove one first',
      );
    }
  };
  const onSubmitShortlisted = () => {
    shortlistAnswer(shortlistedIds)
      .then(() => {
        submitShortlisted(questionDetails.id).then(() => {
          showSuccessMessage('Candidates will be sent to the client!');
          history.push(RoutesPaths.Admin.Services);
        });
      })
      .catch(() => {
        showErrorMessage('Something went wrong!');
      });
  };
  return (
    <Fragment>
      {shortlistedAnswers?.length > 0 && (
        <GridItem xs={12}>
          <Card>
            <CardHeader color='primary'>
              <Typography component={'h4'} id={'shortlistedAnswer-header'}>
                Shortlisted
              </Typography>
            </CardHeader>
            {shortlistedAnswers.map((answer, index) => (
              <Box
                mx={4}
                id={'shortlisted' + answer.referenceNumber}
                key={`shortlistedAnswer-${index}`}>
                <AnswerView
                  answer={answer}
                  index={index}
                  setRating={setRating}
                  onCheckAnswer={onCheckAnswer}
                  isShortListed={true}
                  showShortListOption={isShortlistingQuestion}
                  showAcceptAction={isReviewQuestion}
                />
              </Box>
            ))}
            {isShortlistingQuestion && (
              <Box m={2} display='flex' justifyContent='flex-end'>
                <SubmitButton
                  id={'notify'}
                  className={classes.rollbackButton}
                  onClick={() => onSubmitShortlisted()}
                  buttonText={'send to client'}
                />
              </Box>
            )}
          </Card>
        </GridItem>
      )}
      {normalAnswers?.length > 0 && (
        <GridItem xs={12}>
          {normalAnswers.map((answer, index) => (
            <div id={answer.referenceNumber} key={`answer-${index}`}>
              <AnswerView
                answer={answer}
                index={index}
                setRating={setRating}
                onCheckAnswer={onCheckAnswer}
                isShortListed={shortlistedIds.includes(answer.id)}
                showShortListOption={isShortlistingQuestion}
                showAcceptAction={isReviewQuestion}
              />
            </div>
          ))}
        </GridItem>
      )}
    </Fragment>
  );
};

export default AnswersContainer;
