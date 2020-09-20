import React from 'react';
import { Grid } from '@material-ui/core';
import t from '../../../../../locales/en/questionRoaster.json';
import SubmitButton from 'components/buttons/SubmitButton';
import Button from '@material-ui/core/Button';

const isAdviser = (user) => {
  return user.roles.some((role) => role.name === 'adviser');
};

const ActionButtonsContainer = ({
  questionDetails,
  isNewQuestion,
  currentUser,
  saveAndCompleteLater,
  onSubmitQuestion,
  questionRoasterClasses,
  onSendToAdminClicked,
}) => {
  if (isAdviser(currentUser) && questionDetails.state === 'review_and_edit') {
    return (
      <Grid
        item
        xs={6}
        style={{ justifyContent: 'flex-end' }}
        className={questionRoasterClasses.answerButtonsContainer}>
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
