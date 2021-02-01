import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import AdminInfo from './AdminInfo';
import { useTranslation } from 'react-i18next';
import Card from 'components/card/Card';

const AdminProfile = () => {
  const { t } = useTranslation();

  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Typography component={'h4'} id={'post-service-page-header'}>
                  {t('adminInfo')}
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
          <AdminInfo />
        </Card>
      </GridItem>
    </GridContainer>
  );
};


export default AdminProfile;