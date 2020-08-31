import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../../styles/Admin/postQuestionStyles';
import QuestionForm from './QuestionForm';
import SuccessSnackBar from '../../../components/Snackbar/SuccessSnackBar';


const PostQuestion = () => {

  const classes = useStyles();
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);
  const [questionDetails, setQuestionDetails] = useState([]);

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        <div className={classes.headerStyles}>
          <Typography id={'post-question-page-header'}>
            Add Question
          </Typography>
        </div>
        <QuestionForm questionDetails={questionDetails} setQuestionDetails={setQuestionDetails}
                      isLoadingForUpdating={false} isOnEditQuestion={false} setIsSnackbarShown={setIsSnackbarShown}/>
      </Grid>
      <SuccessSnackBar content={'Question Sent to Adviser'} isSnackbarShown={isSnackbarShown} closeSnackBar={() => {setIsSnackbarShown(false)}}/>
    </Grid>
  );
};

export default PostQuestion;