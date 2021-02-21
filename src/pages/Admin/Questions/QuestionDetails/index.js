import React, { useEffect, useState } from 'react';
import GridItem from 'components/grid/GridItem.js';
import GridContainer from 'components/grid/GridContainer.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import CardFooter from 'components/card/CardFooter.js';
import { useHistory, useLocation } from 'react-router';
import { fetchQuestionDetails, updateQuestion } from 'apis/questionsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { approveQuestion } from 'apis/questionsAPI';
import QuestionForm from './subComponents/QuestionForm';
import { useStyles } from 'styles/Admin/questionFormStyles';
import authManager from 'services/authManager';
import { QuestionProvider, useQuestionContext } from './context';
import { Typography, Grid } from '@material-ui/core';
import { updateQuestionDetails } from './context/questionAction';
import AnswersContainer from './subComponents/AnswersContainer';
import {
  getAdminQuestionsDashboardLink,
  getServiceDetailsLink,
} from 'services/navigation';
import LinkText from 'components/typography/LinkText';
import QuestionGuardian from 'core/guardians/QuestionGuardian';
import SubmitButton from 'components/buttons/SubmitButton';
import { useTranslation } from 'react-i18next';

const QuestionDetailsPage = () => {
  const classes = useStyles();
  const [{ questionDetails }, dispatch] = useQuestionContext();
  const [isLoadingForUpdating, setIsLoadingForUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const location = useLocation();
  const questionId = location?.state?.questionId;
  const isNewQuestion = !questionId;

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

  if (isLoading) {
    return <LoadingCircle />;
  }

  const onDeployQuestionClicked = () => {
    setIsLoadingForUpdating(true);
    updateQuestion(questionDetails.id, {
      ...questionDetails,
    })
      .then(() => {
        approveQuestion(questionDetails.id).then(() => {
          history.push(getAdminQuestionsDashboardLink());
        });
      })
      .finally(() => setIsLoadingForUpdating(false));
  };

  return (
    <GridContainer justify={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={6}>
                <Typography component={'h4'} id={'post-question-page-header'}>
                  {isNewQuestion ? 'Add Question' : 'Edit Question'}
                </Typography>
              </Grid>
              <Grid item md={6}>
                {!!questionDetails.serviceId && (
                  <Typography component={'h4'} id={'post-question-page-header'}>
                    <LinkText
                      to={getServiceDetailsLink(questionDetails.serviceId)}
                      className={classes.relatedService}>
                      {authManager.isAdmin() && 'Related Service'}
                    </LinkText>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardHeader>
          <QuestionForm isNewQuestion={isNewQuestion} />
          <CardFooter className={classes.footerButtons}>
            {QuestionGuardian.canDeployQuestion(questionDetails) && (
              <SubmitButton
                id={'approveQuestion'}
                disabled={isLoadingForUpdating}
                onClick={onDeployQuestionClicked}
                buttonText={t('deployToQuestionRoaster')}
                className={classes.answerButtons}
                color='primary' />
            )}
          </CardFooter>
        </Card>
      </GridItem>
      <AnswersContainer />
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
