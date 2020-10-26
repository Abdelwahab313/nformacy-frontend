import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from 'styles/questionRoasterStyles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import useQuestionsFilter from './hooks/useQuestionsFilter';
import CircularProgress from '@material-ui/core/CircularProgress';
import QuestionView from './subComponents/QuestionView';
import QuestionsFilter from 'pages/QuestionRoaster/subComponents/QuestionsFilter';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/questionRoaster';
import { QuestionRoasterProvider } from './context';
import BreadcrumbsCustomSeparator from '../../components/breadcrumbs/Breadcrumbs';
import useLocale from '../../hooks/localization/useLocale';
import DIRECTION from '../../constants/direction';

const QuestionRoasterView = () => {
  const { filteredQuestions, loading } = useQuestionsFilter();
  const { locale } = useLocale();
  const classes = useStyles();

  if (loading) {
    return (
      <div id='progressBar' className={classes.progressContainer}>
        <CircularProgress/>
      </div>
    );
  }

  return (
    <Grid id='questionRoasterMainContainer' container dir={DIRECTION[locale]}>
      <Grid item xs={12} className={classes.bannerStyles} direction={'column'}>
        <Grid item id={'question-roaster-banner'}>
          <Typography
            id={'question-roaster-header'}
            className={classes.bannerFontStyles}>
            {t['questionRoaster']}
          </Typography>
        </Grid>
        <Grid item className={classes.searchGridStyles}>
          <Paper
            component='form'
            className={classes.searchBarContainer}
            id={'question-roaster-search-bar'}>
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
          <BreadcrumbsCustomSeparator pageName={'Question Roaster'}/>
        </Grid>
      </Grid>
      <Grid
        container
        justify={'center'}
        id={'questions-roaster-filters-container'}>
        <QuestionsFilter />
        <Grid item xs={12} sm={10}>
          <Grid container>
            {filteredQuestions?.map((question, key) => {
              return (
                <QuestionView
                  questionDetails={question}
                  key={key}
                  isSubmitVisible={true}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const QuestionRoaster = (props) => {
  return (
    <QuestionRoasterProvider>
      <QuestionRoasterView {...props} />
    </QuestionRoasterProvider>
  );
};
export default QuestionRoaster;
