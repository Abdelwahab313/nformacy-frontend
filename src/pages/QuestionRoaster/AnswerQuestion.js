import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import QuestionView from './QuestionView';
import { pink } from '../../styles/colors';
import RichTextEditorForm from '../../components/forms/RichTextEditorForm';
import {
  useStyles as useRoasterStyle,
  useStyles,
} from '../../styles/questionRoasterStyles';
import { submitAnswer, uploadAnswerDocument } from '../../apis/questionsAPI';
import AttachmentUploader from '../../components/forms/AttachmentUploader';
import Button from '@material-ui/core/Button';
import t from '../../locales/en/questionRoaster.json';
import SubmitButton from '../../components/buttons/SubmitButton';

const AnswerQuestion = () => {
  const classes = useStyles();
  const location = useLocation();
  let history = useHistory();
  const questionRoasterClasses = useRoasterStyle();

  const questionDetails = location.state.questionDetails;
  const [attachmentFiles, setAttachmentFiles] = useState();
  const savedAnswer = JSON.parse(
    localStorage.getItem(`answer${questionDetails?.id}`),
  );
  const [content, setContent] = useState(savedAnswer?.content);
  const mediaId = useRef(savedAnswer?.mediaId);

  const saveAndCompleteLater = () => {
    const answerToBeSaved = JSON.stringify({
      content,
      mediaId,
    });
    localStorage.setItem(`answer${questionDetails?.id}`, answerToBeSaved);
  };

  const onSubmitAnswer = () => {
    submitAnswer(questionDetails.id, {
      content: content,
      media_id: mediaId.current,
    })
      .then(({ data }) => {
        if (data.id) {
          uploadAttachmentPromise(data.id);
        }
      })
      .then((responses) => {
        history.push(`/answer/success`);
        console.log('------ responses', responses);
      });
  };

  const onUploadAttachment = (attachmentFile) => {
    setAttachmentFiles(attachmentFile);
  };

  const uploadAttachmentPromise = (answerId) => {
    return new Promise((resolve) => {
      if (attachmentFiles?.length > 0) {
        const formData = new FormData();
        for (const file of attachmentFiles) {
          formData.append('document[]', file, file.name);
        }
        uploadAnswerDocument(answerId, formData).then((response) => {
          resolve(response);
        });
      } else {
        resolve();
      }
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
          style={{ border: `solid 1px ${pink}` }}>
          <Grid container className={questionRoasterClasses.questionContainer}>
            <Grid item xs={12}>
              <RichTextEditorForm
                initialContent={content || ''}
                onContentUpdate={setContent}
                mediaId={mediaId}
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
                attachmentFiles={attachmentFiles}
                onUploadAttachment={onUploadAttachment}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ justifyContent: 'flex-end' }}
              className={questionRoasterClasses.answerButtonsContainer}>
              <Button
                variant='contained'
                size='medium'
                onClick={() => saveAndCompleteLater(mediaId.current)}
                style={{
                  marginRight: '10px',
                  height: '36px',
                  alignSelf: 'center',
                }}>
                {t['saveAndCompleteLater']}
              </Button>
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
