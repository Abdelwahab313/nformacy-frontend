import React from 'react';
import { Button, Grid } from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import t from '../../locales/en/questionRoaster';
import Typography from '@material-ui/core/Typography';
import RichTextEditor from '../inputs/RichTextEditor';
import { uploadImage } from '../../apis/questionsAPI';
import SubmitButton from '../buttons/SubmitButton';
import { attachButtonStyle, attachContainerStyle, useStyles } from '../../styles/questionRoasterStyles';

const RichTextEditorForm = ({ questionDetails, onSubmit, onUploadAttachment, attachmentFiles, content, setContent, savedAnswer, submitButtonText }) => {

  const classes = useStyles();


  return (
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
          </Grid>}
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
            localStorage.setItem(`question${questionDetails.id}`, content ? content : '');
          }}
          style={{
            marginRight: '10px',
            height: '36px',
            alignSelf: 'center',
          }}>
          {t['saveAndCompleteLater']}
        </Button>
        <SubmitButton
          onClick={() => onSubmit()}
          buttonText={submitButtonText}
          disabled={false}
        />
      </Grid>
    </Grid>
  );

};

export default RichTextEditorForm;