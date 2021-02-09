import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SubmitButton from 'components/buttons/SubmitButton';
import authManager from 'services/authManager';
import { useStyles as useRoasterStyle } from '../../../../../styles/questionRoasterStyles';
import { QUESTION_STATUS } from 'constants/questionStatus';

const ActionButtonsContainer = ({
  questionDetails,
  isNewQuestion,
  currentUser,
  saveAndCompleteLater,
  onSubmitQuestion,
  onSendToAdminClicked,
}) => {
  const questionRoasterClasses = useRoasterStyle();
  const { t } = useTranslation();

  if (authManager.isAdviser() && questionDetails.state === 'review_and_edit') {
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
      {!(
        questionDetails?.state === QUESTION_STATUS.pendingAdviserAcceptance &&
        currentUser?.id === questionDetails?.assignedAdviserId
      ) && (
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

export default ActionButtonsContainer;
