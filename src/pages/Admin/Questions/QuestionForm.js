import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import CardBody from '../../../components/Card/CardBody';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import MajorFieldSelect from '../../../components/inputs/MajorFieldSelect';
import SpecificFieldSelect from '../../../components/inputs/SpecificFieldSelect';
import RichTextEditor from '../../../components/inputs/RichTextEditor';
import { industries, questionTypesOfAssignment } from '../../../constants/dropDownOptions';
import QuestionCountDown from '../../../components/counters/QuestionCountDown';
import Button from '@material-ui/core/Button';
import humanizedTimeSpan from '../../../services/humanizedTimeSpan';
import { uploadImage } from '../../../apis/questionsAPI';
import { useStyles } from '../../../styles/questionFormStyles';

const QuestionForm = ({ questionDetails, setQuestionDetails, isLoadingForUpdating }) => {

  const classes = useStyles();

  const onChangeQuestionField = (name, date) => {
    setQuestionDetails((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  console.log('---------------------', questionDetails);

  return (
    <CardBody>
      <GridContainer>
        <GridItem xs={12} sm={12} md={2}>
          <CustomInput
            labelText='Reference ID'
            id='reference-id'
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
            labelText='Title'
            id='title'
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
            labelText='Post Date'
            id='post-date'
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
            handleOptionsChange={(newOptions) =>
              onChangeQuestionField('subfield', newOptions)
            }
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
            onChange={(e, option) =>
              onChangeQuestionField('industry', option)
            }
            blurOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                label='Industry'
              />
            )}
          />
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.inputsRow}>
        <GridItem xs={12} sm={12} md={12}>
          <InputLabel className={classes.contentTitle}>
            Question Content
          </InputLabel>

          <RichTextEditor
            initialContent={questionDetails.content}
            onContentChange={(content) =>
              onChangeQuestionField('content', content)
            }
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
            value={
              questionTypesOfAssignment.filter(
                (option) =>
                  questionDetails.assignmentType === option.value,
              )[0]
            }
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => {
              return option.value === value.value;
            }}
            onChange={(e, option) =>
              onChangeQuestionField('assignmentType', option.value)
            }
            blurOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                label='Type of Assignment'
              />
            )}
          />
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={4}
          className={classes.countDownContainer}>
          <QuestionCountDown
            date={questionDetails.closeDate}
            id={'questionCountDown'}
          />
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={4}
          className={classes.countDownContainer}>
          <Button disabled={isLoadingForUpdating} color='primary'>
            Assign freelancer
          </Button>
        </GridItem>
      </GridContainer>
    </CardBody>
  );
};

export default QuestionForm;