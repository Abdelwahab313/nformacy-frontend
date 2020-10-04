import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import React, { Fragment } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { useStyles } from '../../../styles/Admin/questionFormStyles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { rateAnswer } from '../../../apis/answersAPI';
import authManager from '../../../services/authManager';
import createMarkup from '../../../services/markup';
import AcceptAndRejectActionButtons from './details/subComponents/AcceptAndRejectActionButtons';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';


const AnswerView = ({ answer, index, setRating }) => {
  const classes = useStyles();

const onChangeRating = (index, newValue) => {
  setRating(index, newValue);
  rateAnswer(answer.id, newValue);
};

const onAcceptAnswer = () => {
}

const onRejectAnswer = () => {
}

  return (
    <Fragment>
      <GridContainer>
      <GridItem xs={12} className={classes.answerRowStyles}>
      {!authManager.isAdviser() &&
            <Rating
            name={`rateAnswer-${index}`}
            readOnly={true}
            value={answer.rating}
            onChange={(event, newValue) => {
              onChangeRating(index, newValue);
            }}
          />
      }
        </GridItem>
        <GridItem xs={2} className={classes.answerRowStyles}>
        {!authManager.isAdviser() &&
          <Grid
            id={answer.referenceNumber}
            container
            alignContent='row'
            className={classes.answerFieldStyle}>
            <Typography className={classes.answerFieldLabel}>
              # Answer:
            </Typography>
             <Typography> {answer.referenceNumber} </Typography>
          </Grid>
        }
        </GridItem>
        <GridItem xs={10} className={classes.answerRowStyles}>
          <Grid
            container
            alignContent='row'
            className={classes.answerFieldStyle}>
              <Typography>
                {new Date(answer.createdAt).toLocaleString()}
              </Typography>          
          </Grid>
        </GridItem>
        <GridItem xs={12} className={classes.answerRowStyles}>
          <Grid
            container
            alignContent='row'
            className={classes.answerFieldStyle}>
            <Typography className={classes.answerFieldLabel}>
              Consultant:
            </Typography>
            <Tooltip title={`# ${answer.userReferenceNumber}`} >
              <Typography>{answer.userName}</Typography>
            </Tooltip>
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
        {authManager.isAdviser() &&
            <Rating
            name={`rateAnswer-${index}`}
            readOnly={false}
            value={answer.rating}
            onChange={(event, newValue) => {
              onChangeRating(index, newValue);
            }}
          />
        }
        </GridItem>
        <GridItem xs={10}>
        {!authManager.isAdviser() &&
          <AcceptAndRejectActionButtons>
          onAcceptAssignment={onAcceptAnswer}
          onRejectAssignment={onRejectAnswer}
          </AcceptAndRejectActionButtons>
        }
        </GridItem>
      </GridContainer>
      <Divider variant="middle" className={classes.divider}/>
    </Fragment>
  );
};

export default AnswerView;
