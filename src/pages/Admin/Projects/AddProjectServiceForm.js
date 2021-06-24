import React, { Fragment } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import TextField from '@material-ui/core/TextField';
import CardFooter from 'components/card/CardFooter';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import { Checkbox, Grid, Typography } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import CardHeader from 'components/card/CardHeader';
import { useTranslation } from 'react-i18next';

const AddProjectServiceForm = ({ primaryButton }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Typography component={'h4'}>{t('services')}</Typography>
              </Grid>
            </Grid>
          </CardHeader>
        </GridItem>
      </GridContainer>
      <CardBody>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={4}>
            <CustomTypography variant={'body1'}>
              {'Ask the Expert'}
            </CustomTypography>
          </GridItem>
          <GridItem xs={4}>
            <Checkbox
              color='primary'
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </GridItem>
          <GridItem xs={4}>
            <TextField
              id='standard-number'
              label='Frequency/Amount'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={4}>
            <CustomTypography variant={'body1'}>
              {'Call the Expert'}
            </CustomTypography>
          </GridItem>
          <GridItem xs={4}>
            <Checkbox
              color='primary'
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </GridItem>
          <GridItem xs={4}>
            <TextField
              id='standard-number'
              label='Frequency/Amount'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={4}>
            <CustomTypography variant={'body1'}>
              {'Mentoring the Expert'}
            </CustomTypography>
          </GridItem>
          <GridItem xs={4}>
            <Checkbox
              color='primary'
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </GridItem>
          <GridItem xs={4}>
            <TextField
              id='standard-number'
              label='Frequency/Amount'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={4}>
            <CustomTypography variant={'body1'}>
              {'Hire the Expert'}
            </CustomTypography>
          </GridItem>
          <GridItem xs={4}>
            <Checkbox
              color='primary'
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </GridItem>
          <GridItem xs={4}>
            <TextField
              id='standard-number'
              label='Frequency/Amount'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <ActionButtonsContainer primaryButton={primaryButton} />
      </CardFooter>
    </Fragment>
  );
};

export default AddProjectServiceForm;
