import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import useStyles from './styles/LandingPageStyles';

const AboutUsGalleryDescription = () => {
  const classes = useStyles();

  return (
    <Grid container direction='row' justify='center'>
      <Grid item xs={12}>
        <Grid container direction='row' justify='space-between'>
          {/* Aliquam desc */}
          <Grid item md={6} className={classes.landingSectionsContainerPadding}>
            <Box>
              <CustomTypography
                variant='h5'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                Why nformacy
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Consulting and advisory solutions should not be limited to big
                projects, lengthy contracts, and costly deals! Now you can have
                your consultancy needs met even if it was a single question.{' '}
                <br /> In nformacy we offer a range of solutions as small as a
                bite of advice, up-to mega projects, designed in a clear and
                structured way to bring consultancy to your fingertips. <br />{' '}
                nformacy’s information exchange platform is your second office
                where you can instantly access a pool of top business experts
                from allover the world, build your personalized hub of business
                publications, and track your advisory assignments and
                activities.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Aliquam desc */}
          {/* Aliquam img */}
          <Grid item md={6}>
            <Box textAlign='center'>
              <img
                className={classes.firstSectionImg}
                src={require('../../../assets/about/communication-aboutPage.jpg')}
              />
            </Box>
          </Grid>
          {/* end Aliquam img */}
          {/* Aliquam img */}
          <Grid item md={6}>
            <Box textAlign='center'>
              <img
                className={classes.firstSectionImg}
                src={require('../../../assets/about/business-aboutPage.jpg')}
              />
            </Box>
          </Grid>
          {/* end Aliquam img */}
          {/* Etiam desc */}
          <Grid item md={6} className={classes.landingSectionsContainerPadding}>
            <Box>
              <CustomTypography
                variant='h5'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                With nformacy
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                You can interact, engage with these experts to get your
                consultancy needs met, and our board of Subject Matter Advisors
                will assure you receive the best service by the best fit
                consultants, you are not left alone to figure things out, our
                board is at your side in every step of the way. <br /> Subject
                Mater experts have been always hard to find, and harder to
                assign specially for a short, quick assignment, and with the
                increasing demand on specialized professionals, hiring and
                retaining top talents require high investment, differentiated
                offering and lengthy search process, which many companies can't
                afford. It’s time to stop the search and use nformacy to meet
                your business needs for top professional expertise.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Etiam desc */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutUsGalleryDescription;
