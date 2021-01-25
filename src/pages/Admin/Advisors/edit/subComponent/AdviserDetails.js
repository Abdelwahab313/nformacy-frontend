import React, { useState, useEffect } from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AddAdvisorForm from '../../AddAdvisorForm';
import { fetchAdviserDetails } from 'apis/advisorAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useLocation } from 'react-router';

const AdvisersDetails = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const adviserId = location?.state?.adviserId;

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
              onClick: () => { },
              buttonText: 'Apply Changes',
            }}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default AdvisersDetails;
