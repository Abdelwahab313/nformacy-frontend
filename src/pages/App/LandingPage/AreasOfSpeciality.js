import { Box, Grid, ListItemIcon, ListItemText } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import useStyles from './styles/LandingPageStyles';

const AreasOfSpeciality = () => {
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
        <Box textAlign='center'>
          <CustomTypography variant='h4' fontWeight='bold'>
            Our Fields of Specialty
          </CustomTypography>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            nformacy community of subject matter experts is here to support you
            in your consultancy projects, interim hiring’s, and advisory
            services in the below fields and more.
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction='row' justify='space-between'>
          {/* Strategic Management */}
          <Box className={classes.relativeBox}>
            <Grid item xs={12} className={classes.specialityField}>
              <Box
                textAlign='center'
                className={classes.specialityFieldPadding}>
                <img
                  className={classes.howWorkIcon}
                  src={require('../../../assets/landing/Project_management.svg')}
                />
                <CustomTypography
                  variant='h6'
                  fontWeight='bold'
                  className={classes.workMainTextPadding}>
                  Strategic Management
                </CustomTypography>
                <Box className={classes.workSubTextPadding}>
                  <List>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Corporate Strategy Design and Execution'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Change Management: we help be ahead of the change'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Corporate Risk Management: identify the potential risk factors and mitigate them'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Operating Model Transformation, take your business to the next level and maximize your efficiency and market reach'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Business Planning, translate your vision into actionable plan with measurable milestones'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Organization Performance Optimization, deploy the right tools for performance management and enhancement '
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Leadership and teams’ development'
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Box>
          {/* end Strategic Management */}
          {/* Financial Management */}
          <Box className={classes.relativeBox}>
            <Grid item xs={12} className={classes.specialityField}>
              <Box
                textAlign='center'
                className={classes.specialityFieldPadding}>
                <img
                  className={classes.howWorkIcon}
                  src={require('../../../assets/landing/Finance.svg')}
                />
                <CustomTypography
                  variant='h6'
                  fontWeight='bold'
                  className={classes.workMainTextPadding}>
                  Financial Management
                </CustomTypography>
                <Box className={classes.workSubTextPadding}>
                  <List>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Agile Financial Strategy, move to more agile financial planning and be ready for the market shifts'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Financial Analytics, build the right algorithms and patterns to support your decision-making process'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Finance Technology (Fintech), from design to deployment'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Financial Planning and Modeling'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Cost Management'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Banking Solutions, all aspects of the banking industry and lending technologies'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Insurance and assets management'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Risk Management and Mitigation'
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Box>
          {/* end Financial Management */}
          {/* Organization and Human Resources Management */}
          <Box className={classes.relativeBox}>
            <Grid item xs={12} className={classes.specialityField}>
              <Box
                textAlign='center'
                className={classes.specialityFieldPadding}>
                <img
                  className={classes.howWorkIcon}
                  src={require('../../../assets/landing/HR.svg')}
                />
                <CustomTypography
                  variant='h6'
                  fontWeight='bold'
                  className={classes.workMainTextPadding}>
                  Organization and Human Resources Management
                </CustomTypography>
                <Box className={classes.workSubTextPadding}>
                  <List>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Organization and People strategy design and execution'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='HR Data Management, build the right HR metrics to have deeper insights about your organizations’ performance and culture'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Performance Management system design, top-down KPI’s alignment, policies and procedures'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Organization Culture assessment and uplifting'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Employees’ Wellbeing & Engagement programs'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Agile Organization design and restructuring'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Reward Design and Optimization'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='HR Technology selection and deployment'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Talent Management and Succession Planning systems design and implementation'
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Box>
          {/* end Organization and Human Resources Management */}
          {/* Digitization */}
          <Box className={classes.relativeBox}>
            <Grid item xs={12} className={classes.specialityField}>
              <Box
                textAlign='center'
                className={classes.specialityFieldPadding}>
                <img
                  className={classes.howWorkIcon}
                  src={require('../../../assets/landing/Digital_Transformation.svg')}
                />
                <CustomTypography
                  variant='h6'
                  fontWeight='bold'
                  className={classes.workMainTextPadding}>
                  Digitization
                </CustomTypography>
                <Box className={classes.workSubTextPadding}>
                  <List>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Digital Transformation Strategy design and implantation'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Data Analytics and BigData'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Operating Model Digitization'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='AI and Machine Learning'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='FinTech'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Management Technologies and tools'
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Box>
          {/* end Digitization */}
          {/* Startups and Entrepreneurship */}
          <Box className={classes.relativeBox}>
            <Grid item xs={12} className={classes.specialityField}>
              <Box
                textAlign='center'
                className={classes.specialityFieldPadding}>
                <img
                  className={classes.howWorkIcon}
                  src={require('../../../assets/landing/Financial_Solutions.svg')}
                />
                <CustomTypography
                  variant='h6'
                  fontWeight='bold'
                  className={classes.workMainTextPadding}>
                  Startups and Entrepreneurship
                </CustomTypography>
                <Box className={classes.workSubTextPadding}>
                  <List>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Start up cycle from ideation to scaling up'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Lean Start up strategies'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Business Planning'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Financial Modeling'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Vendors Management'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Funds and Capital Sourcing'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='The Legal Aspects for starting a new venture'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Launch and Marketing strategies'
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Box>
          {/* end Startups and Entrepreneurship */}
          {/* Marketing and Customer Journey */}
          <Box className={classes.relativeBox}>
            <Grid item xs={12} className={classes.specialityField}>
              <Box
                textAlign='center'
                className={classes.specialityFieldPadding}>
                <img
                  className={classes.howWorkIcon}
                  src={require('../../../assets/landing/OperationalSolutions.svg')}
                />
                <CustomTypography
                  variant='h6'
                  fontWeight='bold'
                  className={classes.workMainTextPadding}>
                  Marketing and Customer Journey
                </CustomTypography>
                <Box className={classes.workSubTextPadding}>
                  <List>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Design Thinking'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Marketing Strategy design and implementation'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Media and Public Relations'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Advertising and Digital Marketing'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Product Design'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Customer Care'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Customers’ Channels Management'
                      />
                    </ListItem>
                    <ListItem
                      dense={true}
                      disableGutters={true}
                      className={classes.itemText}>
                      <ListItemIcon className={classes.itemBullet}>
                        <FiberManualRecordIcon
                          color={'primary'}
                          fontSize={'small'}
                          className={classes.circleDot}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.noMarginTop}
                        primary='Market Intelligence'
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Box>
          {/* end Marketing and Customer Journey */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AreasOfSpeciality;
