import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../../styles/Admin/postQuestionStyles';
import QuestionForm from './QuestionForm';
import SubmitButton from '../../../components/buttons/SubmitButton';


const PostQuestion = () => {

const classes = useStyles();
const [questionDetails, setQuestionDetails] = useState([]);

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        <div className={classes.headerStyles}>
          <Typography id={'post-question-page-header'}>
            Add Question
          </Typography>
        </div>
        <QuestionForm questionDetails={questionDetails} setQuestionDetails={setQuestionDetails} isLoadingForUpdating={false} isOnEditQuestion={false} />
      </Grid>
      <Grid item xs={6}/>
      <Grid item xs={6} className={classes.buttonsContainerStyles}>
        <SubmitButton buttonText={'Send to Adviser'} disabled={false} id={'send-to-adviser-button'} />
      </Grid>
    </Grid>
  )
};

export default PostQuestion;