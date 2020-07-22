import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../styles/questionRoasterStyles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { fieldsOfExperience } from '../../constants/dropDownOptions';
import Typography from '@material-ui/core/Typography';
import SubmitButton from '../../components/buttons/SubmitButton';
import QuestionFetcher from '../../hooks/QuestionsFetcher';
import Chip from '@material-ui/core/Chip';
import { lightPink } from '../../styles/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import Countdown from 'react-countdown';
import { formattedDateTime } from '../../services/dateTimeParser';
import AssignmentType from './AssignmentType';
import { cloneDeep } from 'lodash';

const StyledChip = withStyles({
  root: {
    '&:hover': {
      backgroundColor: lightPink,
    },
  },
})(Chip);

const QuestionRoasterView = () => {
  const { questions, addFilter, removeFilter, filters } = QuestionFetcher();
  const [filtersState, setFilterState] = useState(
    Array.from({ length: fieldsOfExperience.length }).fill(false),
  );
  const [filterAllState, setFilterAllState] = useState(true);

  const classes = useStyles();

  function counterRender(key) {
    return ({
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
          id={`question-${key}-closeDate`}
          className={classes.questionFieldsStyles}>
          {completed
            ? 'Closed'
            : 'Available for: ' +
              days +
              ':' +
              hours +
              ':' +
              minutes +
              ':' +
              seconds}
        </Typography>
      );
    };
  }

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
              inputProps={{ 'aria-label': 'search by keyword', id: 'search' }}
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
          <Grid
            id={'filters'}
            container
            className={classes.questionsCategoriesContainer}>
            <StyledChip
              label='All'
              onClick={() => {
                addFilter('all');
                setFilterState(
                  Array.from({ length: fieldsOfExperience.length }).fill(false),
                );
                setFilterAllState(true);
              }}
              color='primary'
              variant={filterAllState ? 'default' : 'outlined'}
              clickable={true}
              className={classes.fieldNameFilterStyles}
            />
            {fieldsOfExperience.map((field, key) => {
              return (
                <StyledChip
                  key={key}
                  id={`filters-${key}`}
                  label={field.label}
                  onClick={() => {
                    addFilter(field.value);
                    const tempFilterState = cloneDeep(filtersState);
                    tempFilterState[key] = true;
                    setFilterState(tempFilterState);
                    setFilterAllState(false);
                  }}
                  onDelete={() => {
                    removeFilter(field.value);
                    const tempFilterState = cloneDeep(filtersState);
                    tempFilterState[key] = false;
                    setFilterState(tempFilterState);
                    if (filters.length === 1) {
                      setFilterAllState(true);
                    }
                  }}
                  color='primary'
                  clickable={true}
                  variant={filtersState[key] ? 'default' : 'outlined'}
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
                <Paper elevation={3} className={classes.paper}>
                  <Grid
                    container
                    key={key}
                    className={classes.questionContainer}>
                    <Grid item xs={6}>
                      <Typography
                        id={`question-${key}-title`}
                        className={classes.questionFieldsStyles}>
                        {question.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography
                            id={`question-${key}-referenceNumber`}
                            className={classes.questionFieldsStyles}>
                            Reference # {question.referenceNumber}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            id={`question-${key}-postDate`}
                            className={classes.questionFieldsStyles}>
                            Post Date{' '}
                            {formattedDateTime(new Date(question.createdAt))}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        className={[
                          classes.flexContainer,
                          classes.questionFieldsStyles,
                        ]}>
                        <Grid item xs={3} className={classes.fieldContainer}>
                          {question.field?.map((field, fieldKey) => (
                            <Typography
                              id={`question-${key}-field-${fieldKey}`}>
                              {field.label}
                            </Typography>
                          ))}
                        </Grid>
                        <Grid item xs={3} className={classes.fieldContainer}>
                          {question.subfield?.map((subfield, subFieldKey) => (
                            <Typography
                              id={`question-${key}-subfield-${subFieldKey}`}>
                              >{subfield.label}
                            </Typography>
                          ))}
                        </Grid>
                        {question.industry && (
                          <Grid item xs={3} className={classes.fieldContainer}>
                            <Typography id={`question-${key}-industry`}>
                              {question.industry.label}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Countdown
                        className={classes.questionFieldsStyles}
                        renderer={counterRender(key)}
                        date={question.closeDate}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        id={`question-${key}-content`}
                        className={classes.questionFieldsStyles}>
                        {question.content}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <AssignmentType
                        index={key}
                        type={question.assignmentType}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <SubmitButton
                        id={`question-${key}-submit`}
                        buttonText={'Answer'}
                        disabled={false}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionRoasterView;
