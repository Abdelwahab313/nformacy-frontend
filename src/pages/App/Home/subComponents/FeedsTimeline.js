import React from 'react';
import { Grid, Typography, Divider, Box } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';
import ShowMore from 'components/typography/ShowMore';
import { useTranslation } from 'react-i18next';
import ComingSoonWrapper from 'components/grid/ComingSoonWrapper';

const FeedsTimeline = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box mt={6}>
      <HomePageCard
        title={t('feedsTimeline')}
        viewMoreText={t('viewAll')}
        viewMoreUrl={RoutesPaths.App.Services}>
        <Grid
          container
          className={[classes.askQuestionBox, classes.feedsTimelineContainer]}>
          <ComingSoonWrapper>
            <Grid container className={classes.feedsSectionContainer}>
              <Grid item xs={6} md={10} className={classes.feedsLeftSide}>
                <Typography
                  align={'left'}
                  variant='p'
                  component='p'
                  className={classes.feedsHeader}>
                  Introduction to Human Resource
              </Typography>
                <Typography
                  align={'left'}
                  component='p'
                  className={classes.feedsSubText}>
                  <ShowMore>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                  </p>
                  </ShowMore>
                </Typography>

                <Typography
                  align={'left'}
                  component='p'
                  className={classes.feedsDate}>
                  23 Answers <span className={classes.dot}> </span> Oct 14
              </Typography>
              </Grid>

              <Grid item xs={6} md={2} className={classes.feedsRightSide}>
                <img
                  className={classes.feedsImg}
                  color={'primary'}
                  src={require('../../../../assets/feeds1.jpg')}
                />
              </Grid>
            </Grid>
            <Divider className={[classes.dividers, classes.feedsDivider]} />
            <Grid container className={classes.feedsSectionContainer}>
              <Grid item xs={6} md={10} className={classes.feedsLeftSide}>
                <Typography
                  align={'left'}
                  variant='p'
                  component='p'
                  className={classes.feedsHeader}>
                  Introduction to Human Resource
              </Typography>
                <Typography
                  align={'left'}
                  component='p'
                  className={classes.feedsSubText}>
                  <ShowMore>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                  </p>
                  </ShowMore>
                </Typography>
                <Typography
                  align={'left'}
                  component='p'
                  className={classes.feedsDate}>
                  23 Answers <span className={classes.dot}></span> Oct 14
              </Typography>
              </Grid>
              <Grid item xs={6} md={2} className={classes.feedsRightSide}>
                <img
                  className={classes.feedsImg}
                  color={'primary'}
                  src={require('../../../../assets/feeds2.jpg')}
                />
              </Grid>
            </Grid>
            <Divider className={[classes.dividers, classes.feedsDivider]} />
            <Grid container className={classes.feedsSectionContainer}>
              <Grid item xs={6} md={10} className={classes.feedsLeftSide}>
                <Typography
                  align={'left'}
                  variant='p'
                  component='p'
                  className={classes.feedsHeader}>
                  Introduction to Human Resource
              </Typography>
                <Typography
                  align={'left'}
                  component='p'
                  className={classes.feedsSubText}>
                  <ShowMore>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                  </p>
                  </ShowMore>
                </Typography>
                <Typography
                  align={'left'}
                  component='p'
                  className={classes.feedsDate}>
                  23 Answers <span className={classes.dot}></span> Oct 14
              </Typography>
              </Grid>
              <Grid item xs={6} md={2} className={classes.feedsRightSide}>
                <img
                  className={classes.feedsImg}
                  color={'primary'}
                  src={require('../../../../assets/feeds1.jpg')}
                />
              </Grid>
            </Grid>
          </ComingSoonWrapper>
        </Grid>
      </HomePageCard>
    </Box>
  );
};
export default FeedsTimeline;
