import React, { useRef, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CardBody from '../../../components/Card/CardBody';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import MajorFieldSelect from '../../../components/inputs/MajorFieldSelect';
import SpecificFieldSelect from '../../../components/inputs/SpecificFieldSelect';
import { industries, questionTypesOfAssignment } from '../../../constants/dropDownOptions';
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
import t from '../../../locales/en/questionRoaster.json';
import SubmitButton from '../../../components/buttons/SubmitButton';
import AttachmentUploader from '../../../components/forms/AttachmentUploader';
import DropdownSelectField from 'components/CustomInput/DropdownSelectField';
import Button from '@material-ui/core/Button';
import AssignedAdvisersSelect from './AssignedAdvisersSelect';
import RegularButton from '../../../components/CustomButtons/Button';
import { useAuth } from '../../auth/context/auth';

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


  const isAdmin = (user) => {
    return user.roles.some((role) => role.name === 'admin');
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

  const onAcceptAssignment = () => {
    acceptAssignment(questionDetails.id).then((response) => {
      setQuestionDetails(response.data);
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

  const onSubmitQuestion = () => {
    if (
      !questionDetails.assignedAdviserId ||
      questionDetails.assignedAdviserId === ''
    ) {
      setSnackbarMessage('You have to assign an adviser to send to.');
      setIsError(true);
      setIsSnackbarShown(true);
    } else if (isAdmin(currentUser) && questionDetails.assignedAdviserId && !questionDetails.hoursToReviewAndEdit) {
      setSnackbarMessage('You have to set how many hours the adviser has to review and edit.');
      setIsError(true);
      setIsSnackbarShown(true);
    }  else if (isAdmin(currentUser) && questionDetails.assignedAdviserId && !questionDetails.hoursToCloseAnswers) {
      setSnackbarMessage('You have to set how many hours to close answers window for freelancers.');
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
        }).then((response) => {
          history.push('/admin/dashboard');
        });
      } else {
        updateQuestion(questionDetails.id, {
          ...questionDetails,
          content,
          attachmentsGroupsId,
          richTextMediaId: richTextMediaId.current,
        }).then((response) => {
          history.push('/admin/dashboard');
        });
      }
      setIsSnackbarShown(true);
      setSnackbarMessage('Question Sent to Adviser');
    }
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
            onFieldChange={(option) =>
              onChangeQuestionField('industry', option)
            }
            fieldLabel='Industry'
          />
        </GridItem>
      </GridContainer>
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
        <GridItem xs={12} sm={12} md={3} className={classes.countDownContainer}>
          <CustomInput
            labelText='Closing Answer for Freelancers (In Hours)'
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
        <GridItem xs={12} sm={12} md={3} className={classes.countDownContainer}>
          <CustomInput
            labelText='Rating Time for Adviser (In Hours)'
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
            {!(questionDetails?.state === 'pending_adviser_acceptance' && currentUser?.id === questionDetails?.assignedAdviserId) && (
              <Grid
                item
                xs={6}
                style={{ justifyContent: 'flex-start' }}
                className={questionRoasterClasses.answerButtonsContainer}>
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
            <Grid
              item
              xs={6}
              style={{ justifyContent: 'flex-end' }}
              className={questionRoasterClasses.answerButtonsContainer}>
              {isNewQuestion && (
                <Button
                  id='saveAndCompleteLaterButton'
                  variant='contained'
                  size='medium'
                  onClick={() => saveAndCompleteLater()}
                  style={{
                    marginRight: '10px',
                    height: '36px',
                    alignSelf: 'center',
                  }}>
                  {t['saveAndCompleteLater']}
                </Button>
              )}
              {!(questionDetails?.state === 'pending_adviser_acceptance' && currentUser?.id === questionDetails?.assignedAdviserId) && (
                <SubmitButton
                  id='applyChangesButton'
                  onClick={onSubmitQuestion}
                  buttonText={
                    isNewQuestion ? 'Send to advisor' : 'Apply Changes'
                  }
                  disabled={false}
                />
              )}
            </Grid>
            {questionDetails?.state === 'pending_adviser_acceptance' && currentUser?.id === questionDetails?.assignedAdviserId && (
              <Grid
                container
                direction='row-reverse'
                justify='space-between'
                alignItems='flex-end'>
                <RegularButton
                  id={'acceptButton'}
                  color='success'
                  onClick={onAcceptAssignment}>
                  Accept
                </RegularButton>
                <RegularButton id={'rejectButton'} color='danger' onClick={onRejectAssignment}>
                  Reject
                </RegularButton>
              </Grid>
            )}
          </Grid>
        </GridItem>
      </GridContainer>
    </CardBody>
  );
};

export default QuestionForm;
