import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from 'styles/questionRoasterStyles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import useQuestionFetcher from '../../hooks/useQuestionsFetcher';
import { cloneDeep } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import QuestionView from './QuestionView';
import QuestionsFilter from 'pages/QuestionRoaster/QuestionsFilter';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/questionRoaster';
import BreadcrumbsCustomSeparator from '../../components/breadcrumbs/Breadcrumbs';

const QuestionRoasterView = () => {
  const { questions, addFilter, removeFilter, filters, loading } = useQuestionFetcher();
  const [filterAllState, setFilterAllState] = useState(true);
  const [filtersState, setFilterState] = useState(
    Array.from({ length: fieldsOfExperience.length }).fill(false),
  );

  const classes = useStyles();

  if (loading) {
    return (
      <div id='progressBar' className={classes.progressContainer}>
        <CircularProgress/>
      </div>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} className={classes.bannerStyles} direction={'column'}>
        <Grid item id={'question-roaster-banner'}>
          <Typography id={'question-roaster-header'} className={classes.bannerFontStyles}>
            {t['questionRoaster']}
          </Typography>
        </Grid>
        <Grid item className={classes.searchGridStyles}>
          <Paper component='form' className={classes.searchBarContainer} id={'question-roaster-search-bar'}>
            <InputBase
              className={classes.searchInput}
              placeholder={t['enterKeyword']}
              inputProps={{ 'aria-label': 'search by keyword', id: 'search' }}
            />
            <IconButton
              type='submit'
              className={classes.iconButton}
              aria-label='search'>
              <SearchIcon color={'secondary'}/>
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justify={'center'}>
        <Grid item xs={10}>
          <BreadcrumbsCustomSeparator/>
        </Grid>
      </Grid>
      <Grid container justify={'center'} id={'questions-roaster-filters-container'}>
        <QuestionsFilter
          filtersState={filtersState}
          isAllClicked={filterAllState}
          onClickAll={() => {
            addFilter('all');
            setFilterState(
              Array.from({ length: fieldsOfExperience.length }).fill(false),
            );
            setFilterAllState(true);
          }}
          onClickFilter={(field, key) => {
            addFilter(field.value);
            const tempFilterState = cloneDeep(filtersState);
            tempFilterState[key] = true;
            setFilterState(tempFilterState);
            setFilterAllState(false);
          }}
          onDeleteFilter={(field, key) => {
            removeFilter(field.value);
            const tempFilterState = cloneDeep(filtersState);
            tempFilterState[key] = false;
            setFilterState(tempFilterState);
            if (filters.length === 1) {
              setFilterAllState(true);
            }
          }}
        />
        <Grid item xs={12} sm={10}>
          <Grid container>
            {questions?.map((question, key) => {
              return (
                <QuestionView questionDetails={question} key={key} isSubmitVisible={true}/>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionRoasterView;
