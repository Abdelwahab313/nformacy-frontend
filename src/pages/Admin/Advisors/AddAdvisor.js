import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import AddAdvisorForm from './AddAdvisorForm';
import { getAdvisorsList } from 'services/navigation';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { addAdvisor } from 'apis/advisorAPI';

const AddAdvisor = () => {

  const [user, setUser] = useState({});
  const history = useHistory();
  const { t } = useTranslation();
  const navigatToAdminsList = () => {
    history.push(getAdvisorsList());
  };

  const handleCreateAdmin = () => {
    addAdvisor(user).then(() => {
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
                {t('addNewAdvisor')}
              </Typography>
            </Grid>
          </Grid>
        </CardHeader>
        <AddAdvisorForm
          user={user}
          setUser={setUser}
          viewOnly
          primaryButton={{
            id: 'createAdminButton',
            onClick: () => {
              handleCreateAdmin();
            },
            buttonText: 'Create Advisor',
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default AddAdvisor;