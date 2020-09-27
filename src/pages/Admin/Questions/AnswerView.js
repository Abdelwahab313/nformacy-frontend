import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { useStyles } from '../../../styles/Admin/questionFormStyles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { rateAnswer } from '../../../apis/answersAPI';
import authManager from '../../../services/authManager';
import createMarkup from '../../../services/markup';

const AnswerView = ({ answers, setRating }) => {
  const classes = useStyles();

  const onChangeRating = (index, newValue) => {
    setRating(index, newValue);
    rateAnswer(answers[index].id, newValue);
  };

  return answers?.map((answer, index) => (
    <Paper
      key={answer.referenceNumber}
      id={answer.referenceNumber}
      elevation={2}
      className={classes.answerContainerStyles}>
      <GridContainer>
        <GridItem xs={3} className={classes.answerRowStyles}>
          <Grid
            container
            alignContent='row'
            className={classes.answerFieldStyle}>
            <Typography className={classes.answerFieldLabel}>
              Answer reference number:
            </Typography>
            <Typography>{answer.referenceNumber}</Typography>
          </Grid>
        </GridItem>
        <GridItem xs={3} className={classes.answerRowStyles}>
          <Grid
            container
            alignContent='row'
            className={classes.answerFieldStyle}>
            <Typography className={classes.answerFieldLabel}>
              Freelancer reference number:
            </Typography>
            <Typography>{answer.userReferenceNumber}</Typography>
          </Grid>
        </GridItem>
        <GridItem xs={3} className={classes.answerRowStyles}>
          <Grid
            container
            alignContent='row'
            className={classes.answerFieldStyle}>
            <Typography className={classes.answerFieldLabel}>
              Freelancer short name:
            </Typography>
            <Typography>{answer.userName}</Typography>
          </Grid>
        </GridItem>
        <GridItem xs={3} className={classes.answerRowStyles}>
          <Grid
            container
            alignContent='row'
            className={classes.answerFieldStyle}>
            <Typography className={classes.answerFieldLabel}>
              Answer post date:
            </Typography>
            <Typography>
              {new Date(answer.createdAt).toLocaleString()}
            </Typography>
          </Grid>
        </GridItem>
        <GridItem xs={12} className={classes.answerRowStyles}>
          <Grid
            item
            dangerouslySetInnerHTML={createMarkup(answer.content)}
            className={classes.answerContent}></Grid>
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
        <GridItem xs={2} className={classes.answerRowStyles}>
          <Rating
            name={`rateAnswer-${index}`}
            readOnly={!authManager.isAdviser()}
            value={answer.rating}
            onChange={(event, newValue) => {
              onChangeRating(index, newValue);
            }}
          />
        </GridItem>
      </GridContainer>
    </Paper>
  ));
};

export default AnswerView;
