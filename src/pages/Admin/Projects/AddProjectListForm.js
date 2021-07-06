import React, { Fragment } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardBody from 'components/card/CardBody';
import { Grid, Typography } from '@material-ui/core';
import CardHeader from 'components/card/CardHeader';
import { useTranslation } from 'react-i18next';
import AddConsultantsTable from './AddConsultantsTable';
import useFetchData from 'hooks/useFetchData';
import { fetchBeneficiariesList, fetchConsultantsList } from 'apis/projectsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import AddBeneficiariesTable from './AddBenficiariesTable';
import { useStyles } from 'styles/Admin/postProjectStyles';

const AddProjectListForm = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchConsultantsList();
  });
  const { fetchedData: beneficiaries } = useFetchData(() => {
    return fetchBeneficiariesList();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

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
        <AddConsultantsTable consultants={consultants} />
      </CardBody>

      <GridContainer className={classes.beneficiariesSection}>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Typography component={'h4'}>
                  {t('beneficiariesList')}
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
        </GridItem>
      </GridContainer>
      <CardBody>
        <AddBeneficiariesTable beneficiaries={beneficiaries} />
      </CardBody>
    </Fragment>
  );
};

export default AddProjectListForm;
