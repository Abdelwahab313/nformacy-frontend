import React from 'react';
import { Grid } from '@material-ui/core';
import t from '../../../../../locales/en/questionRoaster.json';
import SubmitButton from 'components/buttons/SubmitButton';
import authManager from '../../../../../services/authManager';
import { useStyles as useRoasterStyle } from '../../../../../styles/questionRoasterStyles';

const ActionButtonsContainer = ({
  questionDetails,
  isNewQuestion,
  currentUser,
  saveAndCompleteLater,
  onSubmitQuestion,
  onSendToAdminClicked,
}) => {
  const questionRoasterClasses = useRoasterStyle();

  if (authManager.isAdviser() && questionDetails.state === 'review_and_edit') {
    return (
      <Grid
        item
        xs={6}
        className={questionRoasterClasses.answerButtonContainer}>
        <SubmitButton
          id='saveAndCompleteLaterButton'
          onClick={() => saveAndCompleteLater()}
          buttonText={t['saveAndCompleteLater']}
          className={[questionRoasterClasses.answerButtons, questionRoasterClasses.buttonMargin]}
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
    <Grid
      item
      xs={6}
      className={questionRoasterClasses.answerButtonContainer}>
      {isNewQuestion && (
        <SubmitButton
          id='saveAndCompleteLaterButton'
          onClick={() => saveAndCompleteLater()}
          buttonText={t['saveAndCompleteLater']}
          className={[questionRoasterClasses.answerButtons, questionRoasterClasses.buttonMargin]}
        />
      )}
      {!(
        questionDetails?.state === 'pending_adviser_acceptance' &&
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
