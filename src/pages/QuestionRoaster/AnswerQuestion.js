import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ImageUploader from 'react-images-upload';

import SubmitButton from 'components/buttons/SubmitButton';
import RichTextEditor from 'components/inputs/RichTextEditor';
import QuestionView from './QuestionView';
import { formattedDateTime } from 'services/dateTimeParser';
import { submitAnswer, uploadDocument, uploadImage } from 'apis/questionsAPI';
import { attachButtonStyle, attachContainerStyle, useStyles } from 'styles/questionRoasterStyles';
import t from '../../locales/en/questionRoaster';
import { pink } from '../../styles/colors';

const AnswerQuestion = () => {
  const classes = useStyles();
  const location = useLocation();
  let history = useHistory();

  const questionDetails = location.state.questionDetails;

  const [attachmentFiles, setAttachmentFiles] = useState();
  const savedAnswer = localStorage.getItem(`answer${questionDetails?.id}`);
  const [content, setContent] = useState(savedAnswer);

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

  const onSubmitAnswer = () => {
    Promise.all([
      submitAnswer(questionDetails.id, { content: content }),
      uploadAttachmentPromise(),
    ]).then((responses) => {
      history.push(`/`, { snackBarContent: 'Your answer has been submitted successfully' });
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
        <Paper elevation={3} className={classes.paper} style={{border: `solid 1px ${pink}`}}>
          <Grid container className={classes.questionContainer}>
            <Grid item xs={12}>
              <RichTextEditor
                initialContent={savedAnswer}
                onContentChange={(content) => setContent(content)}
                onImageUpload={(imageFormData, callback) => {
                  uploadImage(questionDetails.id, imageFormData).then(
                    ({ data }) => {
                      callback(data['imageUrl']);
                    },
                  );
                }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ justifyContent: 'flex-start' }}
              className={classes.answerButtonsContainer}>
              <div className={classes.attachmentUploaderContainer}>
                <ImageUploader
                  label={''}
                  fileContainerStyle={attachContainerStyle()}
                  withIcon={false}
                  withPreview={false}
                  onChange={onUploadAttachment}
                  accept='application/pdf'
                  buttonStyles={attachButtonStyle()}
                  buttonText={t['attach']}
                  imgExtension={['.pdf']}
                />
                {attachmentFiles?.length > 0 &&
                <Grid container alignItems={'center'} justify={'center'}>
                  {attachmentFiles.map((attachment, index) => (
                    <Grid item xs={12}>
                      <Typography key={index} id={`attachment-${index}`} gutterBottom variant='subtitle2'>
                        {attachment.name}
                      </Typography>
                    </Grid>
                  ))}
                </Grid> }
              </div>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ justifyContent: 'flex-end' }}
              className={classes.answerButtonsContainer}>
              <Button
                variant='contained'
                size='medium'
                onClick={() => {
                  localStorage.setItem(`answer${questionDetails.id}`, content ? content : '');
                }}
                style={{
                  marginRight: '10px',
                  height: '36px',
                  alignSelf: 'center',
                }}>
                {t['saveAndCompleteLater']}
              </Button>
              <SubmitButton
                onClick={() => onSubmitAnswer()}
                buttonText={t['submit']}
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
