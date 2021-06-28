import React, { Fragment } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import CardFooter from 'components/card/CardFooter';
import { Grid, Typography } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import CardHeader from 'components/card/CardHeader';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import { selectStyle } from 'styles/formsStyles';
import { projectManagers } from 'constants/dropDownOptions';
import SubmitButton from 'components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';
import CreatableSelect from 'react-select/creatable';

const AddProjectListForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const handleProjectServiceForm = () => {
    history.push(RoutesPaths.Admin.ProjectConsultants);
  };

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Typography component={'h4'}>{t('ConsultantsList')}</Typography>
              </Grid>
            </Grid>
          </CardHeader>
        </GridItem>
      </GridContainer>
      <CardBody>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={3}>
            <CustomTypography variant={'body1'}>
              {'Consultants List'}
            </CustomTypography>
          </GridItem>

          <GridItem xs={9}>
            <FormControl fullWidth id='country-select'>
              <CreatableSelect
                fullWidth={true}
                placeholder={t('selectConsultants')}
                SelectProps={{
                  styles: selectStyle,
                }}
                isMulti
                options={projectManagers}
              />
            </FormControl>
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={3}>
            <CustomTypography variant={'body1'}>
              {'Benefeciaries List'}
            </CustomTypography>
          </GridItem>

          <GridItem xs={9}>
            <FormControl fullWidth id='country-select'>
              <CreatableSelect
                fullWidth={true}
                placeholder={t('selectBenefeciaries')}
                SelectProps={{
                  styles: selectStyle,
                }}
                isMulti
                options={projectManagers}
              />
            </FormControl>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter className={classes.nextStepBtn}>
        <SubmitButton
          onClick={() => {
            handleProjectServiceForm();
          }}
          buttonText={t('submit')}
        />
      </CardFooter>
    </Fragment>
  );
};

export default AddProjectListForm;
