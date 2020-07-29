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
import { fetchQuestionDetails, updateQuestion, uploadImage } from 'apis/questionsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import humanizedTimeSpan from 'services/humanizedTimeSpan';
import MajorFieldSelect from 'components/inputs/MajorFieldSelect';
import SpecificFieldSelect from 'components/inputs/SpecificFieldSelect';
import { industries, questionTypesOfAssignment } from 'constants/dropDownOptions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import InputLabel from '@material-ui/core/InputLabel';
import RichTextEditor from 'components/inputs/RichTextEditor';
import SuccessSnackBar from 'components/Snackbar/SuccessSnackBar';


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
  contentTitle: {
    color: '#AAAAAA',
    marginBottom: theme.spacing(2),
  },
  countDownContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    borderBottom: '1px solid #d2d2d2',
  },
});

const useStyles = makeStyles(styles);

const QuestionDetails = () => {
  const classes = useStyles();
  const [questionDetails, setQuestionDetails] = useState({});
  const [isLoadingForUpdating, setIsLoadingForUpdating] = useState(false);
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);

  const location = useLocation();
  const questionId = location.state.questionId;

  const {
    isLoading,
    fetchedData: fetchedQuestion,
  } = useFetchData(() => fetchQuestionDetails(questionId));

  useEffect(() => {
    console.log(isLoading);
    setQuestionDetails(fetchedQuestion);
  }, [fetchedQuestion]);

  console.log('00000', questionDetails);

  const onChangeQuestionField = (name, date) => {
    console.log('-----', name, date);
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

  const onUpdateQuestionClicked = () => {
    setIsLoadingForUpdating(true);
    updateQuestion(questionDetails.id, questionDetails)
      .then((response) => {
        console.log('updated ....', response.data);
        setIsSnackbarShown(true);
      })
      .catch((error) => {
        console.log('failed -------', error);
      }).finally(() => setIsLoadingForUpdating(false));
  };

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
                    onChange: (e) => {
                      onChangeQuestionField('title', e.target.value);
                    },
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
                  value={questionDetails.field}
                  handleOptionsChange={(newOptions) => {
                    onChangeQuestionField('field', newOptions);
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <SpecificFieldSelect
                  value={questionDetails.subfield}
                  selectedMajorFields={questionDetails.field}
                  handleOptionsChange={(newOptions) => onChangeQuestionField('subfield', newOptions)}
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
                  onChange={(e, option) => onChangeQuestionField('industry', option)}
                  blurOnSelect
                  renderInput={(params) => <TextField {...params} variant='outlined' label="Industry"/>}
                />
              </GridItem>
            </GridContainer>

            <GridContainer className={classes.inputsRow}>
              <GridItem xs={12} sm={12} md={12}>
                <InputLabel className={classes.contentTitle}>Question Content</InputLabel>

                <RichTextEditor
                  initialContent={questionDetails.content}
                  onContentChange={(content) => onChangeQuestionField('content', content)}
                  onImageUpload={(imageFormData, callback) => {
                    uploadImage(questionDetails.id, imageFormData).then(
                      ({ data }) => {
                        callback(data['imageUrl']);
                      },
                    );
                  }}
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
                  renderInput={(params) => <TextField {...params} variant='outlined' label="Type of Assignment"/>}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} className={classes.countDownContainer}>
                <QuestionCountDown
                  date={questionDetails.closeDate}
                  id={'questionCountDown'}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter className={classes.footerButtons}>
            <Button
              style={{ marginRight: 16 }}
              disabled={isLoadingForUpdating}
              onClick={onUpdateQuestionClicked}
              color="primary">
              Update Question
            </Button>
            <Button
              disabled={isLoadingForUpdating}
              onClick={onUpdateQuestionClicked}
              color="primary">
              Deploy to question roaster
            </Button>
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
