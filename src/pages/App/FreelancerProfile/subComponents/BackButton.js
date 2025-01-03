import React, { useState } from 'react';
import { useStyles } from 'styles/formsStyles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BackDialog from './BackDialog';
import { useTranslation } from 'react-i18next';
import SubmitButton from 'components/buttons/SubmitButton';

const BackButton = ({ onClickGoBack, isLoading }) => {
  const classes = useStyles();
  const [isBackDialogueOpen, setIsDialogueOpen] = useState(false);

  const getBackToPreviousStep = () => {
    setIsDialogueOpen(true);
  };

  const onClickAgree = () => {
    setIsDialogueOpen(false);
    onClickGoBack();
  };

  const onClickCancel = () => {
    setIsDialogueOpen(false);
  };
  const { t } = useTranslation();

  return (
    <>
      <SubmitButton
        buttonText={t('back')}
        onClick={getBackToPreviousStep}
        id='backButton'
        disabled={isLoading}
        variant='contained'
        className={classes.backButton}
        startIcon={<ArrowBackIosIcon />}
      />
      <BackDialog
        open={isBackDialogueOpen}
        onAgree={onClickAgree}
        onCancel={onClickCancel}
      />
    </>
  );
};

export default BackButton;
