import React, { useState, useEffect } from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { Typography, Grid } from '@material-ui/core';
import AddAdminForm from '../../list/AddAdminForm';
import { useTranslation } from 'react-i18next';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchAdminDetails, updateAdmin } from 'apis/adminsAPI';
import { useLocation, useHistory } from 'react-router';
import { getAdminsList } from 'services/navigation';
import { useSnackBar } from 'context/SnackBarContext';

const AdminDetails = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const adminId = location?.state?.adminId;
  const history = useHistory();
  const { showSuccessMessage, showErrorMessage } = useSnackBar();

  const navigatToAdminsList = () => {
    history.push(getAdminsList());
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAdminDetails(adminId)
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingCircle />;
  }
  const validate = (user) => {
    if (!user.firstName) {
      showErrorMessage(t('requiredFirstName'));
      return false;
    }
    if (!user.lastName) {
      showErrorMessage(t('requiredLastName'));
      return false;
    }
    if (!user.email) {
      showErrorMessage(t('requiredEmail'));
      return false;
    }
    if (!user.password) {
      showErrorMessage(t('requiredPassword'));
      return false;
    }
    if (!user.confirmPassword) {
      showErrorMessage(t('requiredConfirmPassword'));
      return false;
    }
    if (user.password !== user.confirmPassword) {
      showErrorMessage(t('passwordsNotMatching'));
      return false;
    }
    return true;
  };

  const onSubmitAdmin = () => {
    if (!!validate(user)) {
      updateAdmin(adminId, {
        ...user,
      }).then(() => {
        showSuccessMessage(t('adminUpdated'));
        navigatToAdminsList();
      });
    };
  };

  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Typography component={'h4'} id={'post-service-page-header'}>
                  {t('editAdmin')}
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
              onClick: onSubmitAdmin,
              buttonText: 'Apply Changes',
            }}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default AdminDetails;
