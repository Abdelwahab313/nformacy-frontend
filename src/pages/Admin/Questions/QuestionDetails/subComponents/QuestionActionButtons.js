import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SubmitButton from 'components/buttons/SubmitButton';
import authManager from 'services/authManager';
import { useStyles as useRoasterStyle } from '../../../../../styles/questionRoasterStyles';
import { QUESTION_STATUS } from 'constants/questionStatus';
import {
  acceptAssignment,
  approveQuestion,
  rejectAssignment,
  saveDraftQuestion,
  sendToAdmin,
  submitQuestion,
  updateQuestion,
  uploadQuestionThumbnail,
} from 'apis/questionsAPI';
import { useQuestionContext } from '../context';
import {
  resetModifiedState,
  setErrorMessage,
  setSuccessMessage,
  updateQuestionDetails,
} from '../context/questionAction';
import humanizedTimeSpan from 'services/humanizedTimeSpan';
import AcceptAndRejectActionButtons from './AcceptAndRejectActionButtons';
import { navigatToDashboard } from 'services/navigation';
import QuestionGuardian from 'core/guardians/QuestionGuardian';

const QuestionActionButtons = ({
  isNewQuestion,
  isThumbnailChanged,
  thumbnailImage,
}) => {
  const questionRoasterClasses = useRoasterStyle();
  const [{ questionDetails, isModified }, dispatch] = useQuestionContext();
  const [isLoadingForUpdating, setIsLoadingForUpdating] = useState(false);
  const { t } = useTranslation();

  const onAcceptAssignment = () => {
    acceptAssignment(questionDetails.id).then((response) => {
      updateQuestionDetails(dispatch, {
        ...response.data,
        state: response.data?.state,
        createdAt: humanizedTimeSpan(questionDetails.createdAt),
      });
      setSuccessMessage(dispatch, 'Question has been accepted successfully');
    });
  };

  const onRejectAssignment = () => {
    rejectAssignment(questionDetails.id).then((response) => {
      updateQuestionDetails(dispatch, { ...response.data });
      navigatToDashboard();
    });
  };

  const saveAndCompleteLater = () => {
    saveDraftQuestion({
      ...questionDetails,
    }).then(() => {
      resetModifiedState(dispatch);
      navigatToDashboard();
    });
    setSuccessMessage(dispatch, 'Your question is saved successfully');
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
    } else if (!questionDetails.content) {
      errorMessage = 'You have to add question content';
    }

    if (!!errorMessage) {
      setErrorMessage(dispatch, errorMessage);
      return false;
    } else {
      return true;
    }
  };

  const onSendToAdminClicked = () => {
    if (!!isModified) {
      updateQuestion(questionDetails.id, {
        ...questionDetails,
      }).then(() => {
        sendToAdmin(questionDetails.id).then(() => {
          navigatToDashboard();
        });
      });
    } else {
      sendToAdmin(questionDetails.id).then(() => {
        navigatToDashboard();
      });
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
      resetModifiedState(dispatch);
      setSuccessMessage(dispatch, 'Question Sent to Adviser');
    }
  };

  const onDeployQuestionClicked = () => {
    setIsLoadingForUpdating(true);
    updateQuestion(questionDetails.id, {
      ...questionDetails,
    })
      .then(() => {
        approveQuestion(questionDetails.id).then(() => {
          navigatToDashboard();
        });
      })
      .finally(() => setIsLoadingForUpdating(false));
  };

  const uploadThumbnail = (questionId = questionDetails.id) => {
    if (thumbnailImage.length === 0 || !isThumbnailChanged) return;
    const imageBlob = new Blob(thumbnailImage);
    const formData = new FormData();
    formData.append('thumbnail', imageBlob, thumbnailImage[0].name);
    uploadQuestionThumbnail(questionId, formData);
  };

  if (
    authManager.isAdviser() &&
    questionDetails?.state === QUESTION_STATUS.pendingAdviserAcceptance
  ) {
    return (
      <Grid item xs={6}>
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
      </Grid>
    );
  }

  if (
    authManager.isAdviser() &&
    questionDetails?.state === QUESTION_STATUS.reviewAndEdit
  ) {
    return (
      <Grid
        item
        xs={6}
        className={questionRoasterClasses.answerButtonContainer}>
        <SubmitButton
          id='saveAndCompleteLaterButton'
          onClick={() => saveAndCompleteLater()}
          buttonText={t('saveAndCompleteLater')}
          className={[
            questionRoasterClasses.answerButtons,
            questionRoasterClasses.buttonMargin,
          ]}
        />
        <SubmitButton
          id={'sendToAdminButton'}
          onClick={onSendToAdminClicked}
          buttonText={'Send for deployment'}
          className={questionRoasterClasses.answerButtons}
        />
      </Grid>
    );
  }

  if (QuestionGuardian.canDeployQuestion(questionDetails)) {
    return (
      <Grid
        item
        xs={6}
        className={questionRoasterClasses.answerButtonContainer}>
        <SubmitButton
          id='applyChangesButton'
          onClick={onSubmitQuestion}
          buttonText={'Apply Changes'}
          className={[
            questionRoasterClasses.answerButtons,
            questionRoasterClasses.buttonMargin,
          ]}
        />

        <SubmitButton
          id={'approveQuestion'}
          disabled={isLoadingForUpdating}
          onClick={onDeployQuestionClicked}
          buttonText={t('deployToQuestionRoaster')}
          className={questionRoasterClasses.answerButtons}
          color='primary'
        />
      </Grid>
    );
  }

  return (
    <Grid item xs={6} className={questionRoasterClasses.answerButtonContainer}>
      {isNewQuestion && (
        <SubmitButton
          id='saveAndCompleteLaterButton'
          onClick={() => saveAndCompleteLater()}
          buttonText={t('saveAndCompleteLater')}
          className={[
            questionRoasterClasses.answerButtons,
            questionRoasterClasses.buttonMargin,
          ]}
        />
      )}
      {QuestionGuardian.showApplyChangesButton() && (
        <SubmitButton
          id='applyChangesButton'
          onClick={onSubmitQuestion}
          buttonText={isNewQuestion ? 'Send to advisor' : 'Apply Changes'}
          className={questionRoasterClasses.answerButtons}
          disabled={false}
        />
      )}
    </Grid>
  );
};

export default QuestionActionButtons;
