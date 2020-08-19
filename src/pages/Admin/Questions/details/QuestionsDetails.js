import React, { useEffect, useState } from 'react';
// @material-ui/core components
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import { useLocation } from 'react-router';
import useFetchData from 'hooks/useFetchData';
import { fetchQuestionDetails, updateQuestion } from 'apis/questionsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import SuccessSnackBar from 'components/Snackbar/SuccessSnackBar';
import { approveQuestion } from '../../../../apis/questionsAPI';
import QuestionForm from '../QuestionForm';
import { useStyles } from '../../../../styles/questionFormStyles';


const QuestionDetails = () => {
  const classes = useStyles();
  const [questionDetails, setQuestionDetails] = useState({});
  const [isLoadingForUpdating, setIsLoadingForUpdating] = useState(false);
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);

  const location = useLocation();
  const questionId = location.state.questionId;

  const { isLoading, fetchedData: fetchedQuestion } = useFetchData(() =>
    fetchQuestionDetails(questionId),
  );

  useEffect(() => {
    console.log(isLoading);
    setQuestionDetails(fetchedQuestion);
  }, [fetchedQuestion]);


  if (isLoading) {
    return <LoadingCircle/>;
  }

  const onUpdateQuestionClicked = () => {
    setIsLoadingForUpdating(true);
    updateQuestion(questionDetails.id, questionDetails)
      .then((response) => {
        setIsSnackbarShown(true);
      })
      .catch((error) => {
      })
      .finally(() => setIsLoadingForUpdating(false));
  };

  const onDeployQuestionClicked = () => {
    approveQuestion(questionDetails.id)
      .then((response) => {
        setIsSnackbarShown(true);
      })
      .catch((error) => {
      })
      .finally(() => setIsLoadingForUpdating(false));
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Edit Question</h4>
          </CardHeader>
          <QuestionForm questionDetails={questionDetails} setQuestionDetails={setQuestionDetails} isLoadingForUpdating={isLoadingForUpdating} />
          <CardFooter className={classes.footerButtons}>
            <Button
              id={'updateQuestion'}
              style={{ marginRight: 16 }}
              disabled={isLoadingForUpdating}
              onClick={onUpdateQuestionClicked}
              color='primary'>
              Update Question
            </Button>
            {questionDetails?.isApproved === false && (
              <Button
                id={'approveQuestion'}
                disabled={isLoadingForUpdating}
                onClick={onDeployQuestionClicked}
                color='primary'>
                Deploy to question roaster
              </Button>
            )}
            <SuccessSnackBar
              isSnackbarShown={isSnackbarShown}
              closeSnackBar={() => setIsSnackbarShown(false)}
              content={'Question Updated Successfully'}
            />
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default QuestionDetails;
