import React, { useRef, useState } from 'react';
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
  questionLanguages,
} from '../../../constants/dropDownOptions';
import humanizedTimeSpan from '../../../services/humanizedTimeSpan';
import { useStyles } from '../../../styles/Admin/questionFormStyles';
import RichTextEditorForm from '../../../components/forms/RichTextEditorForm';
import {
  acceptAssignment,
  rejectAssignment,
  saveDraftQuestion,
  submitQuestion,
  updateQuestion,
} from '../../../apis/questionsAPI';
import { useHistory } from 'react-router';

import { Grid } from '@material-ui/core';
import { useStyles as useRoasterStyle } from '../../../styles/questionRoasterStyles';
import AttachmentUploader from '../../../components/forms/AttachmentUploader';
import DropdownSelectField from 'components/CustomInput/DropdownSelectField';
import AssignedAdvisersSelect from './AssignedAdvisersSelect';
import { useAuth } from '../../auth/context/auth';
import QuestionCountDown from '../../../components/counters/QuestionCountDown';
import Typography from '@material-ui/core/Typography';
import AcceptAndRejectActionButtons from './details/subComponents/AcceptAndRejectActionButtons';
import ActionButtonsContainer from './details/subComponents/ActionButtonsContainer';
import { sendToAdmin } from 'apis/questionsAPI';
import authManager from '../../../services/authManager';
import ImageUploader from 'react-images-upload';

const noActionStates = [
  'pending_assignment',
  'pending_deployment_to_roaster',
  'freelancer_answers',
  'answers_rating',
  'closed',
];

const QuestionForm = ({
  questionDetails,
  setQuestionDetails,
  setIsSnackbarShown,
  setSnackbarMessage,
  setIsError,
  isNewQuestion,
}) => {
  const classes = useStyles();
  const questionRoasterClasses = useRoasterStyle();
  const [content, setContent] = useState(
    questionDetails ? questionDetails.content : '',
  );
  const [attachmentsGroupsId, setAttachmentsGroupsId] = useState(
    questionDetails.attachmentsGroupsId,
  );
  const [{ currentUser }] = useAuth();
  let history = useHistory();
  const richTextMediaId = useRef(questionDetails?.richTextMediaId);

  const onAcceptAssignment = () => {
    acceptAssignment(questionDetails.id).then((response) => {
      setQuestionDetails({
        ...response.data,
        content,
        createdAt: humanizedTimeSpan(questionDetails.createdAt),
        title: questionDetails.title,
        field: questionDetails.field,
        subfield: questionDetails.subfield,
        industry: questionDetails.industry,
      });
      setIsError(false);
      setSnackbarMessage('Question has been accepted successfully');
      setIsSnackbarShown(true);
    });
  };

  const onRejectAssignment = () => {
    rejectAssignment(questionDetails.id).then((response) => {
      setQuestionDetails(response.data);
      history.push('/admin/questions');
    });
  };

  const saveAndCompleteLater = () => {
    saveDraftQuestion({
      ...questionDetails,
      content,
      attachmentsGroupsId,
      richTextMediaId: richTextMediaId.current,
    }).then(() => {
      history.push('/admin/questions');
    });
    setIsSnackbarShown(true);
    setSnackbarMessage('Your question is saved successfully');
  };

  const onChangeQuestionField = (name, data) => {
    setQuestionDetails((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  };

  const onSendToAdminClicked = () => {
    sendToAdmin(questionDetails.id).then(() => {
      history.push('/admin/questions');
    });
  };

  const onSubmitQuestion = () => {
    if (
      !questionDetails.assignedAdviserId ||
      questionDetails.assignedAdviserId === ''
    ) {
      setSnackbarMessage('You have to assign an adviser to send to.');
      setIsError(true);
      setIsSnackbarShown(true);
    } else if (
      authManager.isAdmin() &&
      questionDetails.assignedAdviserId &&
      !questionDetails.hoursToReviewAndEdit
    ) {
      setSnackbarMessage(
        'You have to set how many hours the adviser has to review and edit.',
      );
      setIsError(true);
      setIsSnackbarShown(true);
    } else if (
      authManager.isAdmin() &&
      questionDetails.assignedAdviserId &&
      !questionDetails.hoursToCloseAnswers
    ) {
      setSnackbarMessage(
        'You have to set how many hours to close answers window for freelancers.',
      );
      setIsError(true);
      setIsSnackbarShown(true);
    } else {
      setIsError(false);
      if (isNewQuestion) {
        submitQuestion({
          ...questionDetails,
          content,
          attachmentsGroupsId,
          richTextMediaId: richTextMediaId.current,
        }).then(() => {
          history.push('/admin/dashboard');
        });
      } else {
        updateQuestion(questionDetails.id, {
          ...questionDetails,
          content,
          attachmentsGroupsId,
          richTextMediaId: richTextMediaId.current,
        }).then(() => {
          history.push('/admin/dashboard');
        });
      }
      setIsSnackbarShown(true);
      setSnackbarMessage('Question Sent to Adviser');
    }
  };

  const uploadThumbnail = (picture) => {
    console.log('----pic----', picture);
    const imageBlob = new Blob(picture);
    const formData = new FormData();
    if (picture.length === 0) return;
    formData.append('thumbnail', imageBlob, picture[0].name);
    console.log('----name-----', picture[0].name);
    console.log('-----blob----', imageBlob);
    console.log('----form-----', formData);
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

      <GridContainer className={classes.inputsRow}>
        <GridItem xs={12} sm={12} md={3}>
          <MajorFieldSelect
            value={questionDetails.field}
            handleOptionsChange={(newOptions) => {
              onChangeQuestionField('field', newOptions);
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <SpecificFieldSelect
            value={questionDetails.subfield}
            selectedMajorFields={questionDetails.field}
            handleOptionsChange={(newOptions) =>
              onChangeQuestionField('subfield', newOptions)
            }
          />
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
          <GridItem xs={12} sm={12} md={12}>
            <ImageUploader
              id={'thumbnail-uploader'}
              withPreview={true}
              singleImage={true}
              label={'Max file size: 1mb, accepted: jpg, gif, png'}
              withIcon={true}
              buttonText='Upload Question Thumbnail'
              imgExtension={['.jpg', '.gif', '.png', 'jpeg']}
              maxFileSize={1048576}
              onChange={uploadThumbnail}
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
                initialContent={content}
                onContentUpdate={setContent}
                richTextMediaId={richTextMediaId}
              />
            </Grid>
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
                    attachmentsGroupsId={attachmentsGroupsId}
                    setAttachmentsGroupsId={setAttachmentsGroupsId}
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
    </CardBody>
  );
};

export default QuestionForm;
