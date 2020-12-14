import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import RichTextEditorForm from 'components/forms/RichTextEditorForm';
import { useStyles } from 'styles/questionRoasterStyles';
import AttachmentUploader from 'components/forms/AttachmentUploader';
import SubmitButton from 'components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';
import { submitAnswer } from 'apis/answersAPI';
import { useSnackBar } from 'context/SnackBarContext';
import { ANSWER_STATUS } from 'constants/questionStatus';

const AnswerForm = ({ questionId, savedAnswer }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [answerDetails, setAnswerDetails] = useState(
    !!savedAnswer ? savedAnswer : { questionId },
  );

  const { showSuccessMessage, showErrorMessage } = useSnackBar();
  const history = useHistory();

  const richTextRef = useRef(null);
  const onChangeField = (name, value) => {
    setAnswerDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateRichTextCount = () => {
    const charCount = richTextRef.current.editor.plugins.wordcount.body.getCharacterCount();
    return charCount >= 100;
  };

  const validate = () => {
    if (!validateRichTextCount()) {
      showErrorMessage(t('contentValidation'));
      return false;
    }
    return true;
  };

  const saveAndCompleteLater = () => {
    submitAnswer({ ...answerDetails, state: ANSWER_STATUS.draft }).then(() => {
      showSuccessMessage(t('answerSaved'));
      history.push(RoutesPaths.App.Questions);
    });
  };

  const onSubmitAnswer = () => {
    if (!!validate()) {
      submitAnswer({ ...answerDetails, state: ANSWER_STATUS.pending }).then(
        () => {
          showSuccessMessage(t('answerSubmitted'));
          history.push(RoutesPaths.App.Questions);
          // history.push(RoutesPaths.App.SubmitAnswerNote);
        },
      );
    }
  };

  return (
    <Paper elevation={3} className={classes.primaryBoarder}>
      <Grid container className={classes.questionContainer}>
        <Grid item xs={12}>
          <RichTextEditorForm
            initialContent={answerDetails?.content || ''}
            onContentUpdate={(value) => onChangeField('content', value)}
            richTextMediaId={answerDetails?.richTextMediaId}
            updateRichTextMedia={(newRichTextMediaId) =>
              onChangeField('richTextMediaId', newRichTextMediaId)
            }
            richTextRef={richTextRef}
          />
        </Grid>
        <Grid item xs={6} className={classes.containerStart}>
          <AttachmentUploader
            containerClassName={classes.attachmentUploaderContainer}
            attachments={answerDetails?.attachments}
            attachmentsGroupsId={answerDetails?.attachmentsGroupsId}
            setAttachmentsGroupsId={(attachmentsGroupsId) => {
              onChangeField('attachmentsGroupsId', attachmentsGroupsId);
            }}
          />
        </Grid>
        <Grid item xs={6} className={classes.containerEnd}>
          <SubmitButton
            className={classes.answerSaveButton}
            id='saveAndCompleteLaterButton'
            onClick={saveAndCompleteLater}
            buttonText={t('saveAndCompleteLater')}
          />
          <SubmitButton
            onClick={onSubmitAnswer}
            buttonText={t('submit')}
            disabled={false}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AnswerForm;
