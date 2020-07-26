import React from 'react';
import { useLocation } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../styles/questionRoasterStyles';
import { formattedDateTime } from '../../services/dateTimeParser';
import SubmitButton from '../../components/buttons/SubmitButton';
import t from '../../locales/en/questionRoaster';
import { Editor } from '@tinymce/tinymce-react';
import QuestionView from './QuestionView';

const AnswerQuestion = () => {
  const classes = useStyles();
  const location = useLocation();
  const questionDetails = location.state.questionDetails;

  return (
    <Grid
      container
      justify={'center'}
      alignContent={'center'}
      style={{ marginTop: '10px' }}>
      <Grid item xs={12} sm={10}>
        <QuestionView questionDetails={questionDetails} isSubmitVisible={false}/>
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
              <Editor
                id='richContent'
                initialValue='<p>This is the initial content of the editor</p>'
                init={{
                  height: 500,
                  file_picker_types: 'image',
                  plugins: [
                    'advlist autolink lists link image imagetools charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo link image | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                  file_picker_callback: function(cb, value, meta) {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    /*
                      Note: In modern browsers input[type="file"] is functional without
                      even adding it to the DOM, but that might not be the case in some older
                      or quirky browsers like IE, so you might want to add it to the DOM
                      just in case, and visually hide it. And do not forget do remove it
                      once you do not need it anymore.
                    */

                    input.onchange = function() {
                      const file = this.files[0];

                      const reader = new FileReader();
                      reader.onload = function() {
                        /*
                          Note: Now we need to register the blob in TinyMCEs image blob
                          registry. In the next release this part hopefully won't be
                          necessary, as we are looking to handle it internally.
                        */
                        // const id = 'blobid' + new Date().getTime();
                        // const blobCache = this.editorUpload.blobCache;
                        // const base64 = reader.result.split(',')[1];
                        // const blobInfo = blobCache.create(id, file, base64);
                        // blobCache.add(blobInfo);

                        /* call the callback and populate the Title field with the file name */
                        cb('https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png', { title: 'test' });
                      };
                      reader.readAsDataURL(file);
                    };

                    input.click();
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}/>
            <Grid
              item
              xs={6}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}>
              <Button
                variant='contained'
                size='medium'
                style={{ marginRight: '10px' }}>
                {t['saveAndCompleteLater']}
              </Button>
              <SubmitButton buttonText={t['submit']} disabled={false}/>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnswerQuestion;
