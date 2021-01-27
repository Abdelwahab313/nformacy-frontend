import React from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ClientInfo from './ClientInfo';

const ClientsDetails = () => {
  const { t } = useTranslation();
  
  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Typography component={'h4'} id={'post-service-page-header'}>
                  {t('clientInfo')}
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
          <ClientInfo />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ClientsDetails;
