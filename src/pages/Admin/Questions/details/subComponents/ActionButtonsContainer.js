import React from 'react';
import { Grid } from '@material-ui/core';
import t from '../../../../../locales/en/questionRoaster.json';
import SubmitButton from 'components/buttons/SubmitButton';
import authManager from '../../../../../services/authManager';

const ActionButtonsContainer = ({
  questionDetails,
  isNewQuestion,
  currentUser,
  saveAndCompleteLater,
  onSubmitQuestion,
  questionRoasterClasses,
  onSendToAdminClicked,
}) => {
  if (authManager.isAdviser() && questionDetails.state === 'review_and_edit') {
    return (
      <Grid
        item
        xs={6}
        style={{ justifyContent: 'flex-end' }}
        className={questionRoasterClasses.answerButtonsContainer}>
        <SubmitButton
          id='saveAndCompleteLaterButton'
          onClick={() => saveAndCompleteLater()}
          buttonText={t['saveAndCompleteLater']}
          style={{
            marginRight: '10px',
          }}
        />
        <SubmitButton
          id={'sendToAdminButton'}
          onClick={onSendToAdminClicked}
          buttonText={'Send to admin for deployment'}
        />
      </Grid>
    );
  }

  return (
    <Grid
      item
      xs={6}
      style={{ justifyContent: 'flex-end' }}
      className={questionRoasterClasses.answerButtonsContainer}>
      {isNewQuestion && (
        <SubmitButton
          id='saveAndCompleteLaterButton'
          onClick={() => saveAndCompleteLater()}
          buttonText={t['saveAndCompleteLater']}
          style={{
            marginRight: '10px',
          }}
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
          disabled={false}
        />
      )}
    </Grid>
  );
};

export default ActionButtonsContainer;
