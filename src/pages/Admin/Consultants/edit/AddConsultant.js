import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useSnackBar } from 'context/SnackBarContext';
import AddConsultantForm from './subComponents/AddConsultantForm';
import { createConsultant } from 'apis/userAPI';

const AddConsultant = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const history = useHistory();
  const { showSuccessMessage } = useSnackBar();

  const navigateAfterSave = () => {
    history.goBack();
  };

  const onSubmitConsultant = () => {
    createConsultant(user).then(() => {
      showSuccessMessage(
        t('Created Successfully! Email has been sent to the user.'),
      );
      navigateAfterSave();
    });
  };

  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Typography component={'h4'} id={'post-service-page-header'}>
                  {t('addConsultant')}
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
          <AddConsultantForm
            user={user}
            setUser={setUser}
            viewOnly
            canEditPassword
            primaryButton={{
              id: 'createAdminButton',
              onClick: onSubmitConsultant,
              buttonText: 'Create',
            }}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default AddConsultant;
