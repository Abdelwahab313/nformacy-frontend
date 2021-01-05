import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import GridItem from 'components/grid/GridItem';
import AnswerView from 'pages/Admin/Questions/QuestionDetails/subComponents/AnswerView';
import useStyles from '../styles/ShortlistCandidate';
import CardHeader from 'components/card/CardHeader';
import Card from 'components/card/Card';
import { useTranslation } from 'react-i18next';

const AnswersSection = ({ answers, meetingsUsersIds }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.noShadow}>
      <CardHeader color='primary'>
        <Typography component={'h4'} id={'confirmedCandidate'}>
          {t('answers')}
        </Typography>
      </CardHeader>

      <Grid container className={classes.shortlistContainer}>
        {answers?.map((answer, index) => (
          <GridItem xs={12} id={answer.referenceNumber} key={`answer-${index}`}>
            <AnswerView
              answer={answer}
              index={index}
              setRating={() => {}}
              showScheduleMeeting={!meetingsUsersIds.includes(answer.userId)}
            />
          </GridItem>
        ))}
      </Grid>
    </Card>
  );
};

export default AnswersSection;
