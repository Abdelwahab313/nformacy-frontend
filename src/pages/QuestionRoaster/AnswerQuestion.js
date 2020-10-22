import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import QuestionView from './subComponents/QuestionView';
import RichTextEditorForm from '../../components/forms/RichTextEditorForm';
import {
  useStyles as useRoasterStyle,
  useStyles,
} from '../../styles/questionRoasterStyles';
import { submitAnswer } from '../../apis/questionsAPI';
import AttachmentUploader from '../../components/forms/AttachmentUploader';
import t from '../../locales/en/questionRoaster.json';
import SubmitButton from '../../components/buttons/SubmitButton';

const AnswerQuestion = () => {
  const classes = useStyles();
  const questionRoasterClasses = useRoasterStyle();

  const location = useLocation();
  let history = useHistory();
  const questionDetails = location.state.questionDetails;

  const savedAnswer = JSON.parse(
    localStorage.getItem(`answer${questionDetails?.id}`),
  );
  const [answer,] = useState(!!savedAnswer ? savedAnswer : {});
  const [content, setContent] = useState(savedAnswer?.content);
  const [attachmentsGroupsId, setAttachmentsGroupsId] = useState(
    savedAnswer?.attachmentsGroupsId,
  );
  const richTextMediaId = useRef(savedAnswer?.richTextMediaId);

  const saveAndCompleteLater = () => {
    const answerToBeSaved = JSON.stringify({
      content,
      richTextMediaId,
      attachmentsGroupsId,
    });
    localStorage.setItem(`answer${questionDetails?.id}`, answerToBeSaved);
  };

  const onSubmitAnswer = () => {
    submitAnswer(questionDetails.id, {
      content: content,
      attachmentsGroupsId,
      richTextMediaId: richTextMediaId.current,
    }).then(() => {
      history.push(`/answer/success`);
    });
  };

  return (
    <Grid container justify={'center'} alignContent={'center'}>
      <Grid item xs={12} sm={10}>
        <QuestionView
          questionDetails={questionDetails}
          isSubmitVisible={false}
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper elevation={3} className={classes.primaryBoarder}>
          <Grid container className={questionRoasterClasses.questionContainer}>
            <Grid item xs={12}>
              <RichTextEditorForm
                initialContent={content || ''}
                onContentUpdate={setContent}
                richTextMediaId={richTextMediaId.current}
                updateRichTextMedia={(newRichTextMediaId) =>
                  (richTextMediaId.current = newRichTextMediaId)
                }
              />
            </Grid>
            <Grid item xs={6} className={questionRoasterClasses.containerStart}>
              <AttachmentUploader
                containerClassName={
                  questionRoasterClasses.attachmentUploaderContainer
                }
                attachments={answer.attachments}
                attachmentsGroupsId={attachmentsGroupsId}
                setAttachmentsGroupsId={setAttachmentsGroupsId}
              />
            </Grid>
            <Grid item xs={6} className={questionRoasterClasses.containerEnd}>
              <SubmitButton
                className={questionRoasterClasses.answerSaveButton}
                id='saveAndCompleteLaterButton'
                onClick={() => saveAndCompleteLater(richTextMediaId.current)}
                buttonText={t['saveAndCompleteLater']}
              />
              <SubmitButton
                onClick={onSubmitAnswer}
                buttonText={'Submit'}
                disabled={false}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnswerQuestion;
