import React from 'react';
import GridContainer from '../../../../components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import AddAdminForm from './AddAdminForm';
const AddAdmin = () => {

  const handleCreateAdmin = () => {
    // console.log('=====+++++++++++++++======');
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardHeader color='primary'>
          <Grid container>
            <Grid item md={6} xs={6}>
              <Typography component={'h4'}>
                {'Add a New Admin'}
              </Typography>
            </Grid>
          </Grid>
        </CardHeader>
        <AddAdminForm
          viewOnly
          primaryButton={{
            id: 'createAdminButton',
            onClick: () => {
              handleCreateAdmin();
            },
            buttonText: 'Create Admin',
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default AddAdmin;
