import React, { useEffect, useRef, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CardBody from '../../../components/Card/CardBody';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import MajorFieldSelect from '../../../components/inputs/MajorFieldSelect';
import SpecificFieldSelect from '../../../components/inputs/SpecificFieldSelect';
import {
  industries,
  questionTypesOfAssignment,
} from '../../../constants/dropDownOptions';
import humanizedTimeSpan from '../../../services/humanizedTimeSpan';
import { useStyles } from '../../../styles/Admin/questionFormStyles';
import RichTextEditorForm from '../../../components/forms/RichTextEditorForm';
import {
  submitQuestion,
  uploadQuestionDocument,
} from '../../../apis/questionsAPI';
import { useHistory } from 'react-router';

import { Grid } from '@material-ui/core';
import { useStyles as useRoasterStyle } from '../../../styles/questionRoasterStyles';
import t from '../../../locales/en/questionRoaster.json';
import SubmitButton from '../../../components/buttons/SubmitButton';
import AttachmentUploader from '../../../components/forms/AttachmentUploader';
import DropdownSelectField from 'components/CustomInput/DropdownSelectField';
import { fetchAdvisersList } from '../../../apis/userAPI';
import Button from '@material-ui/core/Button';

const QuestionForm = ({
  isLoadingForUpdating,
  isOnEditQuestion,
  questionDetails,
  setQuestionDetails,
  setIsSnackbarShown,
}) => {
  const classes = useStyles();
  const questionRoasterClasses = useRoasterStyle();
  const [attachmentFiles, setAttachmentFiles] = useState([]);
  const [content, setContent] = useState(
    questionDetails ? questionDetails.content : '',
  );

  let history = useHistory();
  const mediaId = useRef(questionDetails?.mediaId);

  const saveAndCompleteLater = (mediaId) => {
    const questionToBeSaved = JSON.stringify({
      ...questionDetails,
      content,
      mediaId,
    });
    localStorage.setItem('newQuestion', questionToBeSaved);
  };

  const [fetchedAdvisersList, setFetchedAdvisersList] = useState([]);

  useEffect(() => {
    fetchAdvisersList().then((response) => {
      setFetchedAdvisersList(response.data);
    });
  }, []);

  const adviserListOptions = fetchedAdvisersList.map((adviser) => {
    return {
      value: adviser.id,
      label: adviser.firstName + ' ' + adviser.lastName,
    };
  });

  const onUploadAttachment = (attachmentFile) => {
    setAttachmentFiles(attachmentFile);
  };

  const onDeleteAttachment = (attachmentIndex) => {
    const newAttachments = [...attachmentFiles];
    newAttachments.splice(attachmentIndex, 1);
    setAttachmentFiles(newAttachments);
  };

  const uploadAttachmentPromise = (questionId) => {
    return new Promise((resolve) => {
      if (attachmentFiles?.length > 0) {
        const formData = new FormData();
        for (const file of attachmentFiles) {
          formData.append('document[]', file, file.name);
        }
        uploadQuestionDocument(questionId, formData).then((response) => {
          resolve(response);
        });
      } else {
        resolve();
      }
    });
  };

  const onChangeQuestionField = (name, data) => {
    setQuestionDetails((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  };

  const onSubmitQuestion = () => {
    submitQuestion({ ...questionDetails, content, media_id: mediaId.current })
      .then(({ data }) => {
        if (data.id) {
          uploadAttachmentPromise(data.id);
        }
      })
      .then((response) => {
        history.push('/admin/dashboard');
      });
    setIsSnackbarShown(true);
  };

  return (
    <CardBody>
      <GridContainer>
        {isOnEditQuestion && (
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
        )}
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
        {isOnEditQuestion && (
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
                disabled: false,
              }}
            />
          </GridItem>
        )}
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
          <DropdownSelectField
            fieldId='industry'
            fieldName='industry'
            fieldOptions={industries}
            fieldValue={questionDetails.industry}
            onFieldChange={(e, option) =>
              onChangeQuestionField('industry', option)
            }
            fieldLabel='Industry'
          />
        </GridItem>
      </GridContainer>
      <GridContainer className={classes.inputsRow}>
        <GridItem xs={12} sm={12} md={4}>
          <DropdownSelectField
            fieldId='assignmentType'
            fieldName='AssignmentType'
            fieldOptions={questionTypesOfAssignment}
            fieldValue={
              questionTypesOfAssignment.filter(
                (option) => questionDetails.assignmentType === option.value,
              )[0]
            }
            onFieldChange={(e, option) =>
              onChangeQuestionField('assignmentType', option.value)
            }
            fieldLabel='Type of Assignment'
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={2} className={classes.countDownContainer}>
          <CustomInput
            labelText='Closing Answers for Freelancers (In Hours)'
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
        <GridItem xs={12} sm={12} md={2} className={classes.countDownContainer}>
          <CustomInput
            labelText='Rating Time for Adviser (In Hours)'
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
        <GridItem xs={12} sm={12} md={4}>
          <DropdownSelectField
            fieldId='assignAdviser'
            fieldName='AssignAdviser'
            fieldOptions={adviserListOptions}
            fieldValue={
              adviserListOptions.length > 0
                ? adviserListOptions.filter(
                    (option) =>
                      option.value === questionDetails.assignedAdviserId,
                  )[0]
                : {}
            }
            onFieldChange={(e, option) => {
              onChangeQuestionField('assignedAdviserId', option.value);
            }}
            fieldLabel='Assign Adviser'
          />
        </GridItem>
      </GridContainer>
      <GridContainer className={classes.inputsRow}>
        <GridItem xs={12} sm={12} md={12}>
          <InputLabel className={classes.contentTitle}>
            Question Content
          </InputLabel>
          <Grid container className={questionRoasterClasses.questionContainer}>
            <Grid item xs={12}>
              <RichTextEditorForm
                initialContent={content}
                onContentUpdate={setContent}
                mediaId={mediaId}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ justifyContent: 'flex-start' }}
              className={questionRoasterClasses.answerButtonsContainer}>
              <AttachmentUploader
                containerClassName={
                  questionRoasterClasses.attachmentUploaderContainer
                }
                attachmentFiles={attachmentFiles}
                onUploadAttachment={onUploadAttachment}
                onDeleteAttachment={onDeleteAttachment}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ justifyContent: 'flex-end' }}
              className={questionRoasterClasses.answerButtonsContainer}>
              <Button
                variant='contained'
                size='medium'
                onClick={() => saveAndCompleteLater(mediaId.current)}
                style={{
                  marginRight: '10px',
                  height: '36px',
                  alignSelf: 'center',
                }}>
                {t['saveAndCompleteLater']}
              </Button>
              <SubmitButton
                onClick={onSubmitQuestion}
                buttonText={'Send to advisor'}
                disabled={false}
              />
            </Grid>
          </Grid>
        </GridItem>
      </GridContainer>
    </CardBody>
  );
};

export default QuestionForm;
