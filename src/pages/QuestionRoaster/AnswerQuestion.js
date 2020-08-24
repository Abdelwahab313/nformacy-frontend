import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import QuestionView from './QuestionView';
import { pink } from '../../styles/colors';
import RichTextEditorForm from '../../components/forms/RichTextEditorForm';
import { useStyles } from '../../styles/questionRoasterStyles';
import { submitAnswer, uploadDocument } from '../../apis/questionsAPI';

const AnswerQuestion = () => {
  const classes = useStyles;
  const location = useLocation();
  let history = useHistory();

  const questionDetails = location.state.questionDetails;
  const [attachmentFiles, setAttachmentFiles] = useState();
  const savedAnswer = localStorage.getItem(`answer${questionDetails?.id}`);
  const [content, setContent] = useState(savedAnswer);

  const onSubmitAnswer = () => {
    Promise.all([
      submitAnswer(questionDetails.id, { content: content }),
      uploadAttachmentPromise(),
    ]).then((responses) => {
      history.push(`/answer/success`);
      console.log('------ responses', responses);
    });
  };


  const onUploadAttachment = (attachmentFile) => {
    setAttachmentFiles(attachmentFile);
  };

  const uploadAttachmentPromise = () => {
    return new Promise((resolve) => {
      if (attachmentFiles?.length > 0) {
        const file = attachmentFiles[0];
        const formData = new FormData();
        formData.append('document', file, attachmentFiles[0].name);
        uploadDocument(questionDetails.id, formData).then((response) => {
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
        <Paper elevation={3} className={classes.paper} style={{ border: `solid 1px ${pink}` }}>
          <RichTextEditorForm questionDetails={questionDetails}
                              onSubmit={onSubmitAnswer}
                              submitButtonText={'submit'}
                              onUploadAttachment={onUploadAttachment}
                              attachmentFiles={attachmentFiles}
                              content={content}
                              setContent={setContent}
                              savedAnswer={savedAnswer}/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnswerQuestion;
