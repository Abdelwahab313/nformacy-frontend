import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { useStyles } from '../../../styles/Admin/questionFormStyles';
import Grid from '@material-ui/core/Grid';

const AnswerView = ({ answers }) => {
  const classes = useStyles();

  return  answers?.map((answer) => (
    <Paper key={answer.referenceNumber} id={answer.referenceNumber} elevation={2} className={classes.answerContainerStyles}>
      <GridContainer>
        <GridItem xs={4} className={classes.answerRowStyles}>
          <Grid container alignContent='row' className={classes.answerFieldStyle}>
            <Typography className={classes.answerFieldLabel}>
              Answer reference number:
            </Typography>
            <Typography>
              {answer.referenceNumber}
            </Typography>
          </Grid>
        </GridItem>
        <GridItem xs={4} className={classes.answerRowStyles}>
          <Grid container alignContent='row' className={classes.answerFieldStyle}>
            <Typography className={classes.answerFieldLabel}>
              Freelancer short name:
            </Typography>
            <Typography>
              {answer.userName}
            </Typography>
          </Grid>
        </GridItem>
        <GridItem xs={4} className={classes.answerRowStyles}>
          <Grid container alignContent='row' className={classes.answerFieldStyle}>
            <Typography className={classes.answerFieldLabel}>
              Answer post date:
            </Typography>
            <Typography>
              {new Date(answer.createdAt).toLocaleString()}
            </Typography>
          </Grid>
        </GridItem>
        <GridItem xs={12} className={classes.answerRowStyles}>
          <Typography
            className={classes.answerFieldStyle}>
            {answer.content}
          </Typography>
        </GridItem>
        <GridItem xs={12} className={classes.answerRowStyles}>
          {answer.attachments?.map((attachment) => (
            <Chip
              className={classes.answerAttachment}
              size='small'
              label={attachment.filename}
              onClick={() => {
                window.open(attachment.url, '_blank');
              }}
            />
          ))}
        </GridItem>
      </GridContainer>
    </Paper>
  ));

};

export default AnswerView;
