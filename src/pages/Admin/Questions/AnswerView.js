import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { useStyles } from '../../../styles/Admin/questionFormStyles';

const AnswerView = () => {

  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.answerContainerStyles}>
      <GridContainer>
        <GridItem xs={4} className={classes.answerRowStyles}>
          <Typography className={classes.answerFieldStyle}>Reference Number</Typography>
        </GridItem>
        <GridItem xs={4} className={classes.answerRowStyles}>
          <Typography className={classes.answerFieldStyle}>Freelancer short name</Typography>
        </GridItem>
        <GridItem xs={4} className={classes.answerRowStyles}>
          <Typography className={classes.answerFieldStyle}>Post date</Typography>
        </GridItem>
        <GridItem xs={12} className={classes.answerRowStyles}>
          <Typography className={classes.answerFieldStyle} style={{ minHeight: '90px' }}>Answer content</Typography>
        </GridItem>
        <GridItem xs={12} className={classes.answerRowStyles}>
          <Chip size="small" label="Attachment" onClick={() => {
            console.log('clicked');
          }}/>
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default AnswerView;