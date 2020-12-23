import { Box, Divider, Grid } from '@material-ui/core';
import ShowMore from 'components/typography/ShowMore';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { greyDividerStyle } from 'styles/formsStyles';
import useStyles from './styles/LandingPageStyles';

const OurPromiseSection = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={[
        classes.landingSectionsContainerPadding,
        classes.lighterGrayContainer,
      ]}>
      <Grid item xs={12}>
        <Box textAlign='center' className={classes.specialityFieldPadding}>
          <CustomTypography variant='h4' fontWeight='bold'>
            Our Promise
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction='row' justify='space-between'>
          {/* Great Consultants */}
          <Grid
            item
            xs={4}
            md={4}
            className={[classes.specialityField, classes.fitContent]}>
            <Box textAlign='left' className={classes.specialityFieldPadding}>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={[
                  classes.workMainTextPadding,
                  classes.orangeMainText,
                ]}>
                The Best Among Great Consultants
              </CustomTypography>
              <Divider variant='middle' style={greyDividerStyle} />
              <Box className={classes.workSubTextPadding}>
                <CustomTypography
                  variant='body1'
                  fontWeight='light'
                  className={classes.workSubTextPadding}>
                  <ShowMore numberOfLines={4}>
                    <span>
                      In nformacy we make sure that the right consultant <br />
                      is hired for you, using our special screening and
                      <br />
                      matching process designed to address your specific
                      requirements. Most sourcing and recruitment platforms use
                      lagging indicators as previous performance, customer
                      feedback or background to match you with the consultants,
                      unfortunately these measures don’t assess the potential of
                      the consultant or his/her capability to deliver what you
                      need. In nformacy we use an intelligent questioning tool
                      tailored based on your specific needs to elect the best
                      fit among the bests.
                    </span>
                  </ShowMore>
                </CustomTypography>
              </Box>
            </Box>
          </Grid>
          {/* end Great Consultants */}
          {/* Quality is Assured  */}
          <Grid
            item
            xs={4}
            md={4}
            className={[classes.specialityField, classes.fitContent]}>
            <Box textAlign='left' className={classes.specialityFieldPadding}>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={[
                  classes.workMainTextPadding,
                  classes.orangeMainText,
                ]}>
                Quality is Assured
              </CustomTypography>
              <Divider variant='middle' style={greyDividerStyle} />
              <Box className={classes.workSubTextPadding}>
                <CustomTypography
                  variant='body1'
                  fontWeight='light'
                  className={classes.workSubTextPadding}>
                  <ShowMore numberOfLines={4}>
                    <span>
                      Post evaluations, deliverables revision and checks,
                      <br /> and assignments tracking tools all in place to make
                      sure you receive the service you expect and more.
                      <br /> Our board of subject matter experts are equipped
                      with all the tools to monitor and objectively assess the
                      quality of the deliverables submitted from our
                      consultants.
                    </span>
                  </ShowMore>
                </CustomTypography>
              </Box>
            </Box>
          </Grid>
          {/* end Quality is Assured  */}
          {/* We Understand Your Needs */}
          <Grid
            item
            xs={4}
            md={4}
            className={[classes.specialityField, classes.fitContent]}>
            <Box textAlign='left' className={classes.specialityFieldPadding}>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={[
                  classes.workMainTextPadding,
                  classes.orangeMainText,
                ]}>
                We Understand Your Needs
              </CustomTypography>
              <Divider variant='middle' style={greyDividerStyle} />
              <Box className={classes.workSubTextPadding}>
                <CustomTypography
                  variant='body1'
                  fontWeight='light'
                  className={classes.workSubTextPadding}>
                  <ShowMore numberOfLines={4}>
                    <span>
                      In your journey towards growth and success <br />
                      we believe your needs would vary in nature and size.
                      <br />
                      An urgent question would popup any moment which needs and
                      quick reliable answer from an expert, or a second opinion
                      is needed to make sure you are in the right track in your
                      new product and a call with a subject matter expert will
                      give you a fresh perspective. What if you have a very
                      specialized assignment which requires a top expert in an
                      area beyond your teams’ expertise, and a subject matter
                      exert is needed to work on it with your team. Your needs
                      are diversified and so our solutions, from advisory bites
                      to full consultancy feast we are here to support with the
                      same high quality and same focus.
                    </span>
                  </ShowMore>
                </CustomTypography>
              </Box>
            </Box>
          </Grid>
          {/* end We Understand Your Needs */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OurPromiseSection;
