import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { useLocation } from 'react-router';
import useFetchData from 'hooks/useFetchData';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useForm } from 'react-hook-form';
import humanizedTimeSpan from 'services/humanizedTimeSpan';


const styles = {
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

const QuestionDetails = () => {
  const classes = useStyles();
  const { control, register, errors } = useForm({
    defaultValues: {},
  });
  const [question, setQuestion] = useState({});
  const location = useLocation();
  const questionId = location.state.questionId;

  const {
    isLoading,
    fetchedData: questionDetails,
  } = useFetchData(() => fetchQuestionDetails(questionId));

  //
  // useEffect(() => {
  //   if (!isLoading) {
  //     setQuestion(questionDetails);
  //   }
  // }, [questionDetails]);


  if (isLoading) {
    return (
      <LoadingCircle/>
    );
  }

  console.log(questionDetails);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Edit Question</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Reference ID"
                  id="reference-id"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: questionDetails.referenceNumber,
                    name: 'referenceNumber',
                    disabled: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Title"
                  id="title"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: questionDetails.title,
                    name: 'title',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Post Date"
                  id="post-date"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: humanizedTimeSpan(questionDetails.createdAt),
                    name: 'createdAt',
                    disabled: true,
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Question Content"
                  id="about-me"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    value: questionDetails.content,
                    name: 'content',
                    rows: 5,
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="primary">Update Question</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default QuestionDetails;
