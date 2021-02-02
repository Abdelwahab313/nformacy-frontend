import React, { useState, useEffect } from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AddAdvisorForm from '../../AddAdvisorForm';
import { fetchAdviserDetails, updateAdviser } from 'apis/advisorAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useLocation, useHistory } from 'react-router';
import { getAdvisorsList } from 'services/navigation';
import { useSnackBar } from 'context/SnackBarContext';

const AdvisersDetails = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const adviserId = location?.state?.adviserId;
  const history = useHistory();
  const { showSuccessMessage, showErrorMessage } = useSnackBar();

  const navigatToAdvisersList = () => {
    history.push(getAdvisorsList());
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAdviserDetails(adviserId)
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
    return true;
  };

  const onSubmitAdviser = () => {
    if (!!validate(user)) {
      updateAdviser(adviserId, {
        ...user,
      }).then(() => {
        showSuccessMessage(t('adviserUpdated'));
        navigatToAdvisersList();
      })
        .catch(() => { });
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
                  {t('editAdviser')}
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
              onClick: onSubmitAdviser,
              buttonText: 'Apply Changes',
            }}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default AdvisersDetails;
