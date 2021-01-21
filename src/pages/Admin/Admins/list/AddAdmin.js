import React, { useState } from 'react';
import GridContainer from '../../../../components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import AddAdminForm from './AddAdminForm';
import { getAdminsList } from 'services/navigation';
import { addAdmin } from 'apis/adminsAPI';
import { useHistory } from 'react-router';

const AddAdmin = () => {

  const [user, setUser] = useState({});
  const history = useHistory();
  const navigatToAdminsList = () => {
    history.push(getAdminsList());
  };

  const handleCreateAdmin = () => {
    addAdmin(user).then(() => {
      navigatToAdminsList();
    });
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
          user={user}
          setUser={setUser}
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
