import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import RichTextEditorForm from 'components/forms/RichTextEditorForm';
import { useStyles } from 'styles/questionRoasterStyles';
import { useStyles as useFormStyles } from 'styles/Admin/questionFormStyles';
import AttachmentUploader from 'components/forms/AttachmentUploader';
import { RoutesPaths } from 'constants/routesPath';
import { submitAnswer } from 'apis/answersAPI';
import { useSnackBar } from 'context/SnackBarContext';
import { ANSWER_STATUS } from 'constants/questionStatus';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import CardFooter from 'components/card/CardFooter';
import Card from 'components/card/Card';
import { IS_Nformacy_APP } from 'settings';

const AnswerForm = ({ questionId, savedAnswer }) => {
  const classes = useStyles();
  const formClasses = useFormStyles();
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
      const initialAnswerState = IS_Nformacy_APP
        ? ANSWER_STATUS.pending
        : ANSWER_STATUS.accepted;
      submitAnswer({ ...answerDetails, state: initialAnswerState }).then(() => {
        showSuccessMessage(t('answerSubmitted'));
        history.push(RoutesPaths.App.Questions);
      });
    }
  };

  return (
    <Paper elevation={3} className={classes.richEditorMargin}>
      <Card>
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
        <CardFooter className={formClasses.footerButtons}>
          <Grid item xs={6}>
            <AttachmentUploader
              attachments={answerDetails?.attachments}
              attachmentsGroupsId={answerDetails?.attachmentsGroupsId}
              setAttachmentsGroupsId={(attachmentsGroupsId) => {
                onChangeField('attachmentsGroupsId', attachmentsGroupsId);
              }}
            />
          </Grid>
          <ActionButtonsContainer
            primaryButton={{
              id: 'submitAnswer',
              onClick: () => {
                onSubmitAnswer();
              },
              buttonText: t('submit'),
            }}
            secondaryButton={{
              id: 'saveAndCompleteLaterButton',
              onClick: () => {
                saveAndCompleteLater();
              },
              buttonText: t('saveAndCompleteLater'),
            }}
          />
        </CardFooter>
      </Card>
    </Paper>
  );
};

export default AnswerForm;
