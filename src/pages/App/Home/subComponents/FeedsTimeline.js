import React from 'react';
import { Grid, Typography, Divider, Box } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';

const FeedsTimeline = () => {
  const classes = useStyles();

  return (
    <Box mt={6}>
      <HomePageCard
        title={'Feeds Timelime'}
        viewMoreUrl={RoutesPaths.App.Services}>
        <Grid
          container
          className={[classes.askQuestionBox, classes.feedsTimelineContainer]}>
          <Grid container className={classes.feedsSectionContainer}>
            <Typography
              align={'left'}
              variant='h6'
              component='h1'
              fontWeight='fontWeightBold'>
              Introduction to Human Resource
            </Typography>
            <Grid item md={10}>
              <Typography align={'left'} component='p'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Typography>
              <Typography align={'left'} component='p'>
                23 Answers <span class='dot'></span> Oct 14
              </Typography>
            </Grid>
            <Grid item md={2}>
              <img
                className={classes.feedsImg}
                color={'primary'}
                src={require('../../../../assets/feeds1.jpg')}
              />
            </Grid>
          </Grid>
          <Divider className={[classes.dividers, classes.feedsDivider]} />
          <Grid container className={classes.feedsSectionContainer}>
            <Typography align={'left'} variant='h6' component='h1'>
              Introduction to Human Resource
            </Typography>
            <Grid item md={10}>
              <Typography align={'left'} component='p'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Typography>
              <Typography align={'left'} component='p'>
                23 Answers <span class='dot'></span> Oct 14
              </Typography>
            </Grid>
            <Grid item md={2}>
              <img
                className={classes.feedsImg}
                color={'primary'}
                src={require('../../../../assets/feeds2.jpg')}
              />
            </Grid>
          </Grid>
          <Divider className={[classes.dividers, classes.feedsDivider]} />
          <Grid container className={classes.feedsSectionContainer}>
            <Typography align={'left'} variant='h6' component='h1'>
              Introduction to Human Resource
            </Typography>
            <Grid item md={10}>
              <Typography align={'left'} component='p'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Typography>
              <Typography align={'left'} component='p'>
                23 Answers <span class='dot'></span> Oct 14
              </Typography>
            </Grid>
            <Grid item md={2}>
              <img
                className={classes.feedsImg}
                color={'primary'}
                src={require('../../../../assets/feeds1.jpg')}
              />
            </Grid>
          </Grid>
          <Divider className={[classes.dividers, classes.feedsDivider]} />
          <Grid container className={classes.feedsSectionContainer}>
            <Typography align={'left'} variant='h6' component='h1'>
              Introduction to Human Resource
            </Typography>
            <Grid item md={10}>
              <Typography align={'left'} component='p'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Typography>
              <Typography align={'left'} component='p'>
                23 Answers <span class='dot'></span> Oct 14
              </Typography>
            </Grid>
            <Grid item md={2}>
              <img
                className={classes.feedsImg}
                color={'primary'}
                src={require('../../../../assets/feeds2.jpg')}
              />
            </Grid>
          </Grid>
        </Grid>
      </HomePageCard>
    </Box>
  );
};
export default FeedsTimeline;
