import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useSnackBar } from 'context/SnackBarContext';
import AddBeneficiaryForm from './subComponents/AddBeneficiaryForm';
import { createBeneficiary } from 'apis/userAPI';
import _ from 'lodash';

const AddBeneficiary = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const history = useHistory();
  const { showSuccessMessage } = useSnackBar();
  const [isErrors, setIsErrors] = useState({});
  const newErrors = {};

  const navigateAfterSave = () => {
    history.goBack();
  };

  const validate = () => {
    const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!user.firstName) {
      newErrors.firstName = { message: t('requiredFirstName') };
    }
    if (!user.lastName) {
      newErrors.lastName = { message: t('requiredLastName') };
    }
    if (!emailValidation.test(user.email)) {
      newErrors.email = { message: t('invalidEmail') };
    }
    if (!user.email) {
      newErrors.email = { message: t('requiredEmail') };
    }
    if (Object.keys(newErrors).some((val) => !_.isEmpty(val))) {
      setIsErrors({ ...newErrors });
      return false;
    } else {
      return true;
    }
  };

  const onSubmitBeneficiary = () => {
    if (!!validate()) {
      createBeneficiary(user)
        .then(() => {
          showSuccessMessage(
            t('Created Successfully! Email has been sent to the user.'),
          );
          navigateAfterSave();
        })
        .catch(({ response }) => {
          response.data.errors.forEach((error) => {
            if (error.includes('Email')) {
              newErrors.email = { message: t('emailIsExist') };
              setIsErrors({ ...newErrors });
              return false;
            }
          });
        });
    }
  };

  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Typography component={'h4'} id={'post-service-page-header'}>
                  {t('addBeneficiary')}
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
          <AddBeneficiaryForm
            user={user}
            setUser={setUser}
            viewOnly
            canEditPassword
            errors={isErrors}
            primaryButton={{
              id: 'createAdminButton',
              onClick: onSubmitBeneficiary,
              buttonText: 'Create',
            }}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default AddBeneficiary;
