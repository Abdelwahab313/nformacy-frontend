import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { attachButtonStyle, attachContainerStyle, useStyles } from '../../styles/questionRoasterStyles';
import { formattedDateTime } from '../../services/dateTimeParser';
import SubmitButton from '../../components/buttons/SubmitButton';
import t from '../../locales/en/questionRoaster';
import { Editor } from '@tinymce/tinymce-react';
import QuestionView from './QuestionView';
import { uploadDocument, uploadImage } from '../../apis/questionsAPI';
import ImageUploader from 'react-images-upload';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import RichTextEditor from 'components/inputs/RichTextEditor';

const AnswerQuestion = () => {
  const classes = useStyles();
  const location = useLocation();
  const questionDetails = location.state.questionDetails;
  const [attachmentFiles, setAttachmentFiles] = useState();
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);
  const savedAnswer = localStorage.getItem(`answer${questionDetails?.id}`);
  const [content, setContent] = useState(savedAnswer);

  const onUploadAttachment = (attachmentFile) => {
    setAttachmentFiles(attachmentFile);
  };

  const onSubmitAnswer = () => {
    if (attachmentFiles?.length > 0) {
      const file = attachmentFiles[0];
      const formData = new FormData();
      formData.append('document', file, attachmentFiles[0].name);

      uploadDocument(questionDetails.id, formData).then(({ data }) => {
        setAttachmentFiles(data.document);
      });
    }
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
        <Paper elevation={3} className={classes.paper}>
          <Grid container className={classes.questionContainer}>
            <Grid item xs={6}>
              <Typography
                id={`question-${questionDetails.referenceNumber}-title`}
                className={classes.questionFieldsStyles}>
                {t['referenceNumber'] + questionDetails.referenceNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                id={`question-${questionDetails.referenceNumber}-postDate`}
                className={classes.questionFieldsStyles}>
                {t['postDate'] + ' '}
                {formattedDateTime(new Date(questionDetails.createdAt))}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.questionFieldsStyles}>
                M Taison
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <RichTextEditor
                initialContent={savedAnswer}
                onContentChange={(content) => setContent(content)}
                onImageUpload ={(imageFormData, callback) => {
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
                  label={false}
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
                attachmentFiles.map((attachment) => (
                  <Typography gutterBottom variant='subtitle2'>
                    {attachment.name}
                  </Typography>
                ))}
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
                  setIsSnackbarShown(true);
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
          <Snackbar
            open={isSnackbarShown}
            onClose={() => {
              setIsSnackbarShown(false);
              window.location.reload();
            }}>
            <Alert onClose={() => setIsSnackbarShown(false)} severity='success'>
              <Typography>Your answer has been saved successfully</Typography>
            </Alert>
          </Snackbar>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnswerQuestion;
