import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
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
import MajorFieldSelect from 'components/inputs/MajorFieldSelect';
import SpecificFieldSelect from 'components/inputs/SpecificFieldSelect';
import { industries, questionTypesOfAssignment } from 'constants/dropDownOptions';
import AutoCompleteSelectField from 'components/CustomInput/AutoCompleteSelectField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const styles = (theme) => ({
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    marginBottom: '3px',
    textDecoration: 'none',
  },
  footerButtons: {
    justifyContent: 'flex-end',
    display: 'flex',
  },
  inputsRow: {
    marginTop: theme.spacing(4),
  },
});

const useStyles = makeStyles(styles);

const QuestionDetails = () => {
  const classes = useStyles();
  const [questionDetails, setQuestionDetails] = useState({});

  const location = useLocation();
  const questionId = location.state.questionId;

  const {
    isLoading,
    fetchedData: fetchedQuestion,
  } = useFetchData(() => fetchQuestionDetails(questionId));

  useEffect(() => {
    console.log(isLoading)
    setQuestionDetails(fetchedQuestion);
  }, [fetchedQuestion]);

  console.log('00000', questionDetails)

  const onChangeQuestionField = (name, date) => {
    console.log('-----', name, date)
    setQuestionDetails(prevState => (
      {
        ...prevState,
        [name]: date,
      }
    ));
  };

  if (isLoading) {
    return (
      <LoadingCircle/>
    );
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Edit Question</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={2}>
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
              <GridItem xs={12} sm={12} md={7}>
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

            <GridContainer className={classes.inputsRow}>
              <GridItem xs={12} sm={12} md={4}>
                <MajorFieldSelect
                  defaultValue={questionDetails.field}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <SpecificFieldSelect
                  defaultValue={questionDetails.subfield}
                  selectedMajorFields={questionDetails.field}
                  handleSubFieldsChange={() => {
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Autocomplete
                  id='industry'
                  name='industry'
                  options={industries}
                  value={questionDetails.industry}
                  getOptionLabel={(option) => option.label}
                  getOptionSelected={(option, value) => {
                    return option.value === value.value;
                  }}
                  onChange={(e,option) => onChangeQuestionField('industry', option)}
                  blurOnSelect
                  renderInput={(params) => <TextField {...params}  variant='outlined' label="Industry" />}
                />
              </GridItem>
            </GridContainer>

            <GridContainer className={classes.inputsRow}>
              <GridItem xs={12} sm={12} md={4}>
                <Autocomplete
                  id='assignmentType'
                  name='assignmentType'
                  options={questionTypesOfAssignment}
                  value={questionTypesOfAssignment.filter((option) => questionDetails.assignmentType === option.value)[0]}
                  getOptionLabel={(option) => option.label}
                  getOptionSelected={(option, value) => {
                    return option.value === value.value;
                  }}
                  onChange={(e, option) => onChangeQuestionField('assignmentType', option.value)}
                  blurOnSelect
                  renderInput={(params) => <TextField {...params}  variant='outlined' label="Type of Assignment" />}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>

              </GridItem>
            </GridContainer>

            <GridContainer className={classes.inputsRow}>
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
          <CardFooter className={classes.footerButtons}>
            <Button color="primary">Update Question</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default QuestionDetails;
