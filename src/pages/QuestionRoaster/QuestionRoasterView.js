import React from 'react';
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

const QuestionRoasterView = () => {

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.bannerStyles}>
        Banner
      </Grid>
      <Grid container justify={'center'}>
        <Grid item xs={12} sm={8} className={classes.searchGridStyles}>
          <Paper component="form" className={classes.searchBarContainer}>
            <InputBase
              className={classes.searchInput}
              placeholder="Search by Keyword"
              inputProps={{ 'aria-label': 'search by keyword' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon color={'primary'}/>
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Grid container className={classes.questionsCategoriesContainer}>
            <Grid item xs={2} className={classes.fieldNameFilterStyles}>
              All
            </Grid>
            {fieldsOfExperience.map((field, key) => {
              return (
                <Grid item xs={2} key={key} className={classes.fieldNameFilterStyles}>
                  {field.label}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Grid container justify={'center'}>
            <Grid item xs={6}>
              <Typography className={classes.questionFieldsStyles}>Question Title</Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.questionFieldsStyles}>Reference #</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.questionFieldsStyles}>Post Date</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Grid container justify={'center'}>
            <Grid item xs={6}>
              <Typography className={classes.questionFieldsStyles}>Field, Sub field, industry</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.questionFieldsStyles}>Time Counter till its closed (clock
                timer)</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography className={classes.questionFieldsStyles}>Post content: can be video, picture, high text format,
            PowerPoint view</Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Grid container justify={'space-between'}>
            <Grid item xs={4}>
              <BusinessCenterIcon color={'primary'} style={{fontSize: '50px'}}/>
              <Typography>Project</Typography>
            </Grid>
            <Grid item xs={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
              <SubmitButton buttonText={'Answer'} disabled={false}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionRoasterView;