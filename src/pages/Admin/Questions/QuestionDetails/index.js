import React, { useEffect, useState } from 'react';
import GridItem from 'components/grid/GridItem.js';
import GridContainer from 'components/grid/GridContainer.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { useLocation } from 'react-router';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import QuestionForm from './subComponents/QuestionForm';
import { useStyles } from 'styles/Admin/questionFormStyles';
import { QuestionProvider, useQuestionContext } from './context';
import { Typography, Grid } from '@material-ui/core';
import { updateQuestionDetails } from './context/questionAction';
import AnswersContainer from './subComponents/AnswersContainer';
import { getServiceDetailsLink } from 'services/navigation';
import LinkText from 'components/typography/LinkText';
import QuestionGuardian from 'core/guardians/QuestionGuardian';

const QuestionDetailsPage = () => {
  const classes = useStyles();
  const [{ questionDetails }, dispatch] = useQuestionContext();
  const [isLoading, setIsLoading] = useState(false);

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
                {!!questionDetails.serviceId &&
                  QuestionGuardian.canAccessRelatedService() && (
                    <LinkText
                      to={getServiceDetailsLink(questionDetails.serviceId)}
                      className={classes.relatedService}>
                      <Typography
                        component={'h4'}
                        id={'post-question-page-header'}>
                        {'Related Service'}
                      </Typography>
                    </LinkText>
                  )}
              </Grid>
            </Grid>
          </CardHeader>
          <QuestionForm isNewQuestion={isNewQuestion} />
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
