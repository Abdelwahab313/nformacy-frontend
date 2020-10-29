import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CardBody from '../../../../../components/Card/CardBody';
import GridContainer from '../../../../../components/Grid/GridContainer';
import GridItem from '../../../../../components/Grid/GridItem';
import CustomInput from '../../../../../components/CustomInput/CustomInput';
import {
  industries,
  questionTypesOfAssignment,
  questionLanguages,
} from '../../../../../constants/dropDownOptions';
import humanizedTimeSpan from '../../../../../services/humanizedTimeSpan';
import { useStyles } from '../../../../../styles/Admin/questionFormStyles';
import RichTextEditorForm from '../../../../../components/forms/RichTextEditorForm';
import { useHistory } from 'react-router';

import { Grid } from '@material-ui/core';
import { useStyles as useRoasterStyle } from '../../../../../styles/questionRoasterStyles';
import AttachmentUploader from '../../../../../components/forms/AttachmentUploader';
import DropdownSelectField from 'components/CustomInput/DropdownSelectField';
import AssignedAdvisersSelect from './AssignedAdvisersSelect';
import { useAuth } from '../../../../auth/context/auth';
import QuestionCountDown from '../../../../../components/counters/QuestionCountDown';
import Typography from '@material-ui/core/Typography';
import AcceptAndRejectActionButtons from './AcceptAndRejectActionButtons';
import ActionButtonsContainer from './ActionButtonsContainer';
import {
  sendToAdmin,
  acceptAssignment,
  rejectAssignment,
  saveDraftQuestion,
  submitQuestion,
  updateQuestion,
  uploadQuestionThumbnail,
} from 'apis/questionsAPI';
import authManager from '../../../../../services/authManager';
import { useQuestionContext } from '../context';
import {
  setEmptyMessage,
  setErrorMessage,
  setSuccessMessage,
  updateQuestionDetails,
} from '../context/questionAction';
import SuccessSnackBar from 'components/Snackbar/SuccessSnackBar';
import ImageUploadWithPreview from 'components/inputs/FileUpload/ImageUploadWithPreview';
import FieldsSelect from '../../../../../components/inputs/FieldsSelect/FieldsSelect';

const noActionStates = [
  'pending_assignment',
  'pending_deployment_to_roaster',
  'freelancer_answers',
  'answers_rating',
  'closed',
];

const QuestionForm = ({ isNewQuestion }) => {
  const classes = useStyles();
  const questionRoasterClasses = useRoasterStyle();

  const [
    { questionDetails, message, isError },
    dispatch,
  ] = useQuestionContext();
  const [{ currentUser }] = useAuth();
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);

  let history = useHistory();
  const navigatToDashboard = () => {
    history.push('/admin/questions');
  };

  const onAcceptAssignment = () => {
    acceptAssignment(questionDetails.id).then((response) => {
      updateQuestionDetails(dispatch, {
        ...response.data,
        createdAt: humanizedTimeSpan(questionDetails.createdAt),
        title: questionDetails.title,
        field: questionDetails.field,
        subfield: questionDetails.subfield,
        industry: questionDetails.industry,
      });
      setSuccessMessage(dispatch, 'Question has been accepted successfully');
    });
  };

  const onRejectAssignment = () => {
    rejectAssignment(questionDetails.id).then((response) => {
      updateQuestionDetails(dispatch, response.data);
      navigatToDashboard();
    });
  };

  const saveAndCompleteLater = () => {
    saveDraftQuestion({
      ...questionDetails,
    }).then(() => {
      navigatToDashboard();
    });
    setSuccessMessage(dispatch, 'Your question is saved successfully');
  };

  const onChangeQuestionField = (name, data) => {
    updateQuestionDetails(dispatch, {
      [name]: data,
    });
  };

  const onSendToAdminClicked = () => {
    sendToAdmin(questionDetails.id).then(() => {
      navigatToDashboard();
    });
  };

  const validateQuestionForm = () => {
    let errorMessage = '';
    if (!questionDetails.title) {
      errorMessage = 'You have to add title for Question.';
    } else if (!questionDetails.assignedAdviserId) {
      errorMessage = 'You have to assign an adviser to send to.';
    } else if (
      !questionDetails.hoursToReviewAndEdit ||
      Number(questionDetails.hoursToReviewAndEdit) <= 0
    ) {
      errorMessage =
        'You have to set how many hours the adviser has to review and edit.';
    } else if (
      !questionDetails.hoursToCloseAnswers ||
      Number(questionDetails.hoursToCloseAnswers) <= 0
    ) {
      errorMessage =
        'You have to set how many hours to close answers window for freelancers.';
    }

    if (!!errorMessage) {
      setErrorMessage(dispatch, errorMessage);
      return false;
    } else {
      return true;
    }
  };

  const onSubmitQuestion = () => {
    if (validateQuestionForm()) {
      if (isNewQuestion) {
        submitQuestion({
          ...questionDetails,
        }).then(({ data }) => {
          uploadThumbnail(data.id);
          navigatToDashboard();
        });
      } else {
        updateQuestion(questionDetails.id, {
          ...questionDetails,
        }).then(() => {
          uploadThumbnail();
          navigatToDashboard();
        });
      }
      setSuccessMessage(dispatch, 'Question Sent to Adviser');
    }
  };

  const uploadThumbnail = (questionId = questionDetails.id) => {
    if (thumbnailImage.length === 0 || !isThumbnailChanged) return;
    const imageBlob = new Blob(thumbnailImage);
    const formData = new FormData();
    formData.append('thumbnail', imageBlob, thumbnailImage[0].name);
    uploadQuestionThumbnail(questionId, formData);
  };

  return (
    <CardBody>
      <GridContainer>
        {!isNewQuestion && (
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
        <GridItem xs={12} sm={12} md={!isNewQuestion ? 7 : 12}>
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
        {!isNewQuestion && (
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
        )}
      </GridContainer>

      <FieldsSelect
        initialFields={questionDetails.fields}
        updateFields={(newOptions) => {
          onChangeQuestionField('fields', newOptions);
        }}>
        {({ MajorField, Field }) => (

          <GridContainer className={classes.inputsRow}>
            <GridItem xs={12} sm={12} md={3}>
              <MajorField/>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <Field/>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <DropdownSelectField
                fieldId='industry'
                fieldName='industry'
                fieldOptions={industries}
                fieldValue={questionDetails.industry}
                onFieldChange={(option) =>
                  onChangeQuestionField('industry', option)
                }
                fieldLabel='Industry'
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <DropdownSelectField
                fieldId='questionLanguage'
                fieldName='QuestionLanguage'
                fieldOptions={questionLanguages}
                fieldValue={
                  questionLanguages.filter(
                    (option) => questionDetails.language === option.value,
                  )[0]
                }
                onFieldChange={(option) =>
                  onChangeQuestionField('language', option.value)
                }
                fieldLabel='Question Language'
              />
            </GridItem>
          </GridContainer>
        )}
      </FieldsSelect>
      {authManager.isAdmin() && (
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={3}>
            <DropdownSelectField
              fieldId='assignmentType'
              fieldName='AssignmentType'
              fieldOptions={questionTypesOfAssignment}
              fieldValue={
                questionTypesOfAssignment.filter(
                  (option) => questionDetails.assignmentType === option.value,
                )[0]
              }
              onFieldChange={(option) =>
                onChangeQuestionField('assignmentType', option.value)
              }
              fieldLabel='Type of Assignment'
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={3}
            className={classes.countDownContainer}>
            <CustomInput
              labelText='Time for Freelancers to Answer (In Hours)'
              id='hoursToCloseAnswers'
              formControlProps={{
                style: {
                  margin: 0,
                },
                fullWidth: true,
              }}
              inputProps={{
                value: questionDetails.hoursToCloseAnswers,
                name: 'hoursToCloseAnswers',
                type: 'number',
                onChange: (e) => {
                  onChangeQuestionField('hoursToCloseAnswers', e.target.value);
                },
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={3}
            className={classes.countDownContainer}>
            <CustomInput
              labelText='Time for Adviser to Review (In Hours)'
              id='hoursToReviewAndEdit'
              formControlProps={{
                style: {
                  margin: 0,
                },
                fullWidth: true,
              }}
              inputProps={{
                value: questionDetails.hoursToReviewAndEdit,
                name: 'hoursToReviewAndEdit',
                type: 'number',
                onChange: (e) => {
                  onChangeQuestionField('hoursToReviewAndEdit', e.target.value);
                },
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <AssignedAdvisersSelect
              questionDetails={questionDetails}
              onChangeQuestionField={onChangeQuestionField}
            />
          </GridItem>
        </GridContainer>
      )}
      {authManager.isAdviser() && questionDetails.state === 'review_and_edit' && (
        <GridContainer className={classes.inputsRow} alignItems={'center'}>
          <InputLabel
            className={classes.countDown}
            color={'primary'}
            htmlFor={'reviewAndEditTime'}>
            Remaining time to review and Edit:
          </InputLabel>
          <GridItem xs={12} sm={12} md={3}>
            <Typography
              noWrap
              className={classes.currentActionTime}></Typography>
            <QuestionCountDown
              id={'reviewAndEditTime'}
              className={classes.countDownText}
              date={questionDetails?.currentActionTime}
            />
          </GridItem>
        </GridContainer>
      )}
      <GridContainer className={classes.inputsRow}>
        <GridItem xs={12} sm={12} md={12}>
          <InputLabel className={classes.contentTitle}>
            Question Content
          </InputLabel>
          <Grid container className={questionRoasterClasses.questionContainer}>
            <Grid item xs={12}>
              <RichTextEditorForm
                initialContent={questionDetails.content}
                onContentUpdate={(value) =>
                  onChangeQuestionField('content', value)
                }
                richTextMediaId={questionDetails.richTextMediaId}
                updateRichTextMedia={(newRichTextMediaId) =>
                  onChangeQuestionField('richTextMediaId', newRichTextMediaId)
                }
              />
            </Grid>
            {authManager.isAdmin() && (
              <GridItem xs={12} sm={12} md={12}>
                <ImageUploadWithPreview
                  buttonClassName={'thumbnail-uploader'}
                  withPreview={true}
                  singleImage={true}
                  label={'Max file size: 1mb, accepted: jpg, gif, png'}
                  withIcon={true}
                  buttonText='Upload Question Thumbnail'
                  imgExtension={['.jpg', '.gif', '.png', 'jpeg']}
                  maxFileSize={1048576}
                  onChange={(picture) => {
                    setThumbnailImage(picture);
                    setIsThumbnailChanged(true);
                  }}
                  defaultImage={questionDetails.thumbnailUrl}
                />
              </GridItem>
            )}
            {!(
              questionDetails?.state === 'pending_adviser_acceptance' &&
              currentUser?.id === questionDetails?.assignedAdviserId
            ) &&
            !(
              authManager.isAdviser() &&
              noActionStates.includes(questionDetails.state)
            ) && (
              <Grid
                item
                xs={6}
                className={`${questionRoasterClasses.answerButtonsContainer} ${classes.attachmentContainer}`}>
                <AttachmentUploader
                  containerClassName={
                    questionRoasterClasses.attachmentUploaderContainer
                  }
                  attachments={questionDetails.attachments}
                  attachmentsGroupsId={questionDetails.attachmentsGroupsId}
                  setAttachmentsGroupsId={(attachmentsGroupsId) => {
                    onChangeQuestionField(
                      'attachmentsGroupsId',
                      attachmentsGroupsId,
                    );
                  }}
                />
              </Grid>
            )}
            {!(
              authManager.isAdviser() &&
              noActionStates.includes(questionDetails.state)
            ) && (
              <ActionButtonsContainer
                questionDetails={questionDetails}
                isNewQuestion={isNewQuestion}
                currentUser={currentUser}
                saveAndCompleteLater={saveAndCompleteLater}
                onSubmitQuestion={onSubmitQuestion}
                onSendToAdminClicked={onSendToAdminClicked}
              />
            )}
            {questionDetails?.state === 'pending_adviser_acceptance' &&
            currentUser?.id === questionDetails?.assignedAdviserId && (
              <AcceptAndRejectActionButtons
                acceptButtonProps={{
                  id: 'acceptButton',
                  onClick: onAcceptAssignment,
                }}
                rejectButtonProps={{
                  id: 'rejectButton',
                  onClick: onRejectAssignment,
                }}
              />
            )}
          </Grid>
        </GridItem>
      </GridContainer>
      <SuccessSnackBar
        isError={isError}
        isSnackbarShown={!!message}
        closeSnackBar={() => setEmptyMessage(dispatch)}
        content={message}
      />
    </CardBody>
  );
};

export default QuestionForm;
