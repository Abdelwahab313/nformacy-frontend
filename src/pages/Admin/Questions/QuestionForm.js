import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import CardBody from '../../../components/Card/CardBody';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import MajorFieldSelect from '../../../components/inputs/MajorFieldSelect';
import SpecificFieldSelect from '../../../components/inputs/SpecificFieldSelect';
import { industries, questionTypesOfAssignment } from '../../../constants/dropDownOptions';
import Button from '@material-ui/core/Button';
import humanizedTimeSpan from '../../../services/humanizedTimeSpan';
import { useStyles } from '../../../styles/Admin/questionFormStyles';
import RichTextEditorForm from '../../../components/forms/RichTextEditorForm';
import { submitQuestion, uploadDocument } from '../../../apis/questionsAPI';
import { useHistory } from 'react-router';

const QuestionForm = ({ questionDetails, setQuestionDetails, isLoadingForUpdating, isOnEditQuestion, setIsSnackbarShown }) => {

  const classes = useStyles();
  const [attachmentFiles, setAttachmentFiles] = useState();
  const savedQuestion = localStorage.getItem(`question${questionDetails?.id}`) || questionDetails.content;
  const [content, setContent] = useState(savedQuestion);
  let history = useHistory();
  console.log('000000000000000', questionDetails);

  const onUploadAttachment = (attachmentFile) => {
    setAttachmentFiles(attachmentFile);
  };

  const uploadAttachmentPromise = () => {
    return new Promise((resolve) => {
      if (attachmentFiles?.length > 0) {
        const file = attachmentFiles[0];
        const formData = new FormData();
        formData.append('document', file, attachmentFiles[0].name);
        uploadDocument(questionDetails.id, formData).then((response) => {
          resolve(response);
        });
      } else {
        resolve();
      }
    });

  };

  const onChangeQuestionField = (name, date) => {
    setQuestionDetails((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const onSubmitQuestion = () => {
    console.log('-----------------------------====', questionDetails);
    Promise.all([
      submitQuestion({ ...questionDetails, content }),
      uploadAttachmentPromise(),
    ]).then((responses) => {
      history.push(`/admin/dashboard`);
      console.log('------ responses', responses);
    });
    setIsSnackbarShown(true);
  };

  console.log('---------------------', questionDetails);

  return (
    <CardBody>
      <GridContainer>
        {isOnEditQuestion && <GridItem xs={12} sm={12} md={2}>
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
        </GridItem>}
        <GridItem xs={12} sm={12} md={isOnEditQuestion ? 7 : 12}>
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
        {isOnEditQuestion && <GridItem xs={12} sm={12} md={3}>
          <CustomInput
            labelText='Post Date'
            id='post-date'
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: humanizedTimeSpan(questionDetails.createdAt),
              name: 'createdAt',
              disabled: false,
            }}
          />
        </GridItem>}
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
          md={2}
          className={classes.countDownContainer}>
          <CustomInput
            labelText='Closing Answers (In Hours)'
            id='closeIn'
            formControlProps={{
              style: {
                margin: 0,
              },
              fullWidth: true,
            }}
            inputProps={{
              value: questionDetails.closeIn,
              name: 'closeIn',
              onChange: (e) => {
                onChangeQuestionField('closeIn', e.target.value);
              },
            }}
          />
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={2}
          className={classes.countDownContainer}>
          <CustomInput
            labelText='Review and Edit (In Hours)'
            id='reviewAndEditTime'
            formControlProps={{
              style: {
                margin: 0,
              },
              fullWidth: true,
            }}
            inputProps={{
              value: questionDetails.reviewAndEditTime,
              name: 'reviewAndEditTime',
              onChange: (e) => {
                onChangeQuestionField('reviewAndEditTime', e.target.value);
              },
            }}
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
      <GridContainer className={classes.inputsRow}>
        <GridItem xs={12} sm={12} md={12}>
          <InputLabel className={classes.contentTitle}>
            Question Content
          </InputLabel>
          <RichTextEditorForm questionDetails={questionDetails}
                              onSubmit={onSubmitQuestion}
                              submitButtonText={'Send to adviser'}
                              onUploadAttachment={onUploadAttachment}
                              attachmentFiles={attachmentFiles}
                              content={content}
                              setContent={setContent}
                              savedAnswer={savedQuestion}/>
        </GridItem>
      </GridContainer>
    </CardBody>
  );
};

export default QuestionForm;