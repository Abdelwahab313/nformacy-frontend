import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../../styles/successStyle';
import SubmitButton from '../../../components/buttons/SubmitButton';
import { useHistory } from 'react-router';

const PostSubmissionNote = () => {

  const classes = useStyles();
  const history = useHistory();

  function handleClickHome() {
    history.push('/');
  }
  function handleClickQuestionRoaster() {
    history.push('/questions');
  }

  return (
    <Grid container justify={'center'} alignItems={'center'} style={{height: '100vh'}}>
      <Grid item xs={12} sm={10}>
        <Typography id={'thankYouNote'} gutterBottom className={classes.successText}>
          Thank you for your answer
        </Typography>
      </Grid>
      <Grid item xs={12} sm={10} className={classes.navButtonsContainer}>
        <SubmitButton id={'redirectToQuestionRoaster'} buttonText={'Question Roaster'} onClick={handleClickQuestionRoaster} className={classes.navButtons}/>
        <SubmitButton id={'redirectToHome'} buttonText={'Homepage'} onClick={handleClickHome} className={classes.navButtons}/>
      </Grid>
    </Grid>
  );
};

export default PostSubmissionNote;