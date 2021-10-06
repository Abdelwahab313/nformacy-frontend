import React, { Fragment } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import authManager from 'services/authManager';
import MentorCard from './MentorCard';
import MenteeCard from './MenteeCard';

const MentoringDetailsSection = ({ serviceDetails }) => {
  const classes = useStyles();

  const { t } = useTranslation();
  const consultant = serviceDetails?.mentoring?.consultant;

  if (!consultant || !!serviceDetails.meetings?.length) {
    return '';
  }
  return (
    <Fragment>
      <Card className={classes.noShadow}>
        <CardHeader color='primary'>
          <Typography component={'h4'} id={'Shortlist'}>
            {t('mentorDetails')}
          </Typography>
        </CardHeader>
        <Grid
          container
          justify='space-evenly'
          className={classes.shortlistContainer}>
          <Grid container alignItems='center' justify='center'>
            <Grid item xs={12} md={3}>
              <Box className={'shortlistedConsultants'}>
                {authManager.isNormalUser() ? (
                  <MentorCard serviceDetails={serviceDetails} />
                ) : (
                  <MenteeCard serviceDetails={serviceDetails} />
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  noShadow: {
    boxShadow: 'none',
  },
  shortlistContainer: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  },
  buttonMargin: {
    marginRight: '10px',
  },
}));

export default MentoringDetailsSection;
