import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import QuestionView from './QuestionView';
import { darkBlue } from '../../styles/colors';
import RichTextEditorForm from '../../components/forms/RichTextEditorForm';
import {
  useStyles as useRoasterStyle,
  useStyles,
} from '../../styles/questionRoasterStyles';
import { submitAnswer, uploadAnswerAttachment } from '../../apis/questionsAPI';
import AttachmentUploader from '../../components/forms/AttachmentUploader';
import Button from '@material-ui/core/Button';
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
  const [answer, setAnswer] = useState(!!savedAnswer ? savedAnswer : {});
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
    }).then((responses) => {
      history.push(`/answer/success`);
      console.log('------ responses', responses);
    });
  };

  return (
    <Grid
      container
      justify={'center'}
      alignContent={'center'}
      style={{ marginTop: '10px' }}>
      <Grid item xs={12} sm={10}>
        <QuestionView
          questionDetails={questionDetails}
          isSubmitVisible={false}
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper
          elevation={3}
          className={classes.paper}
          style={{ border: `solid 1px ${darkBlue}` }}>
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
            <Grid
              item
              xs={6}
              style={{ justifyContent: 'flex-start' }}
              className={questionRoasterClasses.answerButtonsContainer}>
              <AttachmentUploader
                containerClassName={
                  questionRoasterClasses.attachmentUploaderContainer
                }
                attachments={answer.attachments}
                attachmentsGroupsId={attachmentsGroupsId}
                setAttachmentsGroupsId={setAttachmentsGroupsId}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ justifyContent: 'flex-end' }}
              className={questionRoasterClasses.answerButtonsContainer}>
              <SubmitButton
                id='saveAndCompleteLaterButton'
                onClick={() => saveAndCompleteLater(richTextMediaId.current)}
                buttonText={t['saveAndCompleteLater']}
                style={{
                  marginRight: '10px',
                }}
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
