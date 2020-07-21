import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../styles/questionRoasterStyles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { fieldsOfExperience } from '../../constants/dropDownOptions';
import Typography from '@material-ui/core/Typography';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SubmitButton from '../../components/buttons/SubmitButton';
import QuestionFetcher from '../../hooks/QuestionsFetcher';
import Chip from '@material-ui/core/Chip';
import { lighterPink, lightPink } from '../../styles/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import Countdown from 'react-countdown';
import { formattedDateTime } from '../../services/dateTimeParser';
import AssignmentType from './AssignmentType';

const StyledChip = withStyles({
  root: {
    '&:hover': {
      backgroundColor: lightPink,
    },
  },
})(Chip);

const QuestionRoasterView = () => {
  const { questions, addFilter, removeFilter } = QuestionFetcher();

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.bannerStyles}>
        Banner
      </Grid>
      <Grid container justify={'center'}>
        <Grid item xs={12} sm={8} className={classes.searchGridStyles}>
          <Paper component='form' className={classes.searchBarContainer}>
            <InputBase
              className={classes.searchInput}
              placeholder='Search by Keyword'
              inputProps={{ 'aria-label': 'search by keyword' }}
            />
            <IconButton
              type='submit'
              className={classes.iconButton}
              aria-label='search'>
              <SearchIcon color={'primary'} />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Grid container className={classes.questionsCategoriesContainer}>
            <StyledChip
              label='All'
              onClick={() => addFilter('all')}
              color='primary'
              clickable={true}
              className={classes.fieldNameFilterStyles}
            />
            {fieldsOfExperience.map((field, key) => {
              return (
                <StyledChip
                  key={key}
                  label={field.label}
                  onClick={() => addFilter(field.value)}
                  onDelete={() => removeFilter(field.value)}
                  color='primary'
                  clickable={true}
                  className={classes.fieldNameFilterStyles}
                />
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Grid container>
            {questions?.map((question, key) => {
              return (
                <Grid  key={key} className={classes.questionContainer}>
                  <Grid item xs={12} sm={10}>
                    <Grid container justify={'center'}>
                      <Grid item xs={6}>
                        <Typography className={classes.questionFieldsStyles}>
                          {question.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography className={classes.questionFieldsStyles}>
                              Reference # {question.referenceNumber}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.questionFieldsStyles}>
                              Post Date {formattedDateTime(new Date(question.createdAt))}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <Grid container justify={'center'}>
                      <Grid item xs={6}>
                        <Typography className={classes.questionFieldsStyles}>
                          {question.field?.map(field => field.label)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Countdown
                          className={classes.questionFieldsStyles}
                          renderer={({
                                       total,
                                       days,
                                       hours,
                                       minutes,
                                       seconds,
                                       milliseconds,
                                       completed,
                                     }) => {
                            return (
                              <Typography
                                className={classes.questionFieldsStyles}>
                                {completed
                                  ? 'Closed'
                                  : days +
                                  ':' +
                                  hours +
                                  ':' +
                                  minutes +
                                  ':' +
                                  seconds}
                              </Typography>
                            );
                          }}
                          date={question.closeDate}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <Typography className={classes.questionFieldsStyles}>
                      {question.content}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <Grid container justify={'space-between'}>
                      <Grid item xs={4}>
                        <AssignmentType type={question.assignmentType} />
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <SubmitButton buttonText={'Answer'} disabled={false} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionRoasterView;
