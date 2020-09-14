import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../../styles/Admin/postQuestionStyles';
import QuestionForm from './QuestionForm';
import SuccessSnackBar from '../../../components/Snackbar/SuccessSnackBar';

const PostQuestion = () => {
  const classes = useStyles();
  const savedQuestion = JSON.parse(localStorage.getItem('newQuestion'));
  const [questionDetails, setQuestionDetails] = useState(
    savedQuestion || {},
  );
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        <div className={classes.headerStyles}>
          <Typography id={'post-question-page-header'}>Add Question</Typography>
        </div>
        <QuestionForm
          questionDetails={questionDetails}
          setQuestionDetails={setQuestionDetails}
          setIsSnackbarShown={setIsSnackbarShown}
          setSnackbarMessage={setSnackbarMessage}
          isNewQuestion={true}
        />
      </Grid>
      <SuccessSnackBar
        content={snackbarMessage}
        isSnackbarShown={isSnackbarShown}
        closeSnackBar={() => {
          setIsSnackbarShown(false);
        }}
      />
    </Grid>
  );
};

export default PostQuestion;
