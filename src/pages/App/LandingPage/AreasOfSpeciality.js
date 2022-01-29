import { Box, Grid, ListItemIcon, ListItemText } from '@material-ui/core';
import List from '@material-ui/core/List';
import classNames from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/LandingPageStyles';

const AreasOfSpeciality = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

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
            {t('ourFieldsOfSpecialty')}
          </CustomTypography>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            {t('ourFieldsOfSpecialtyDesc')}
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
                  {t('strategicManagement')}
                </CustomTypography>
                <Box
                  className={classNames(
                    classes.desktopVisible,
                    {
                      [classes.desktopVisibleAr]: isArlang,
                    },
                    classes.workSubTextPadding,
                  )}>
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
                        primary={t('corporateStrategyDesignAndExecution')}
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
                        primary={t('changeManagement')}
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
                        primary={t('corporateRiskManagement')}
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
                        primary={t('operatingModelTransformation')}
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
                        primary={t('businessPlanning')}
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
                        primary={t('organizationPerformanceOptimization')}
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
                        primary={t('leadershipAndTeams')}
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
                  {t('financialManagement')}
                </CustomTypography>
                <Box
                  className={classNames(
                    classes.desktopVisible,
                    {
                      [classes.desktopVisibleAr]: isArlang,
                    },
                    classes.workSubTextPadding,
                  )}>
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
                        primary={t('agileFinancialStrategy')}
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
                        primary={t('financialAnalytics')}
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
                        primary={t('financeTechnology')}
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
                        primary={t('financialPlanning')}
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
                        primary={t('costManagement')}
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
                        primary={t('bankingSolutions')}
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
                        primary={t('insuranceAndAssetsManagement')}
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
                        primary={t('riskManagementAndMitigation')}
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
                  {t('organizationAndHumanResourcesManagement')}
                </CustomTypography>
                <Box
                  className={classNames(
                    classes.desktopVisible,
                    {
                      [classes.desktopVisibleAr]: isArlang,
                    },
                    classes.workSubTextPadding,
                  )}>
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
                        primary={t('organizationAndPeopleStrategy')}
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
                        primary={t('hrDataManagement')}
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
                        primary={t('performanceManagement')}
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
                        primary={t('organizationCulture')}
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
                        primary={t('employeesWellbeing')}
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
                        primary={t('agileOrganizationDesign')}
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
                        primary={t('rewardDesignAndOptimization')}
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
                        primary={t('hrTechnologySelection')}
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
                        primary={t('talentManagement')}
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
                  {t('digitization')}
                </CustomTypography>
                <Box
                  className={classNames(
                    classes.desktopVisible,
                    {
                      [classes.desktopVisibleAr]: isArlang,
                    },
                    classes.workSubTextPadding,
                  )}>
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
                        primary={t('digitalTransformationStrategyDesign')}
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
                        primary={t('dataAnalyticsAndBigData')}
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
                        primary={t('operatingModelDigitization')}
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
                        primary={t('aiAndMachineLearning')}
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
                        primary={t('finTech')}
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
                        primary={t('managementTechnologiesAndTools')}
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
                  {t('startupsAndEntrepreneurship')}
                </CustomTypography>
                <Box
                  className={classNames(
                    classes.desktopVisible,
                    {
                      [classes.desktopVisibleAr]: isArlang,
                    },
                    classes.workSubTextPadding,
                  )}>
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
                        primary={t('startUpCycle')}
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
                        primary={t('leanStartUpStrategies')}
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
                        primary={t('finTechBusinessPlanning')}
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
                        primary={t('financialModeling')}
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
                        primary={t('vendorsManagement')}
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
                        primary={t('fundsAndCapitalSourcing')}
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
                        primary={t('legalAspectsForStarting')}
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
                        primary={t('launchAndMarketingStrategies')}
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
                  {t('marketingAndCustomerJourney')}
                </CustomTypography>
                <Box
                  className={classNames(
                    classes.desktopVisible,
                    {
                      [classes.desktopVisibleAr]: isArlang,
                    },
                    classes.workSubTextPadding,
                  )}>
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
                        primary={t('designThinking')}
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
                        primary={t('marketingStrategyDesignAndImplementation')}
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
                        primary={t('mediaAndPublicRelations')}
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
                        primary={t('advertisingAndDigitalMarketing')}
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
                        primary={t('productDesign')}
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
                        primary={t('customerCare')}
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
                        primary={t('customersChannelsManagement')}
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
                        primary={t('marketIntelligence')}
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
