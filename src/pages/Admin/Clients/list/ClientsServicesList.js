import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'styles/Admin/questionFormStyles';
import ClientDetailsView from 'templates/clients/ClientDetailsView';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchCorporateActivities from 'hooks/useFetchCorporateActivities';
import { useLocation } from 'react-router';

const ClientsServicesList = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const userId = location?.state?.userId;

  const { activities: services, isLoading } = useFetchCorporateActivities(userId);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.addAdminBtn}>
        <SubmitButton
          id={'addClientBtn'}
          onClick={() => { }}
          buttonText={
            <CustomTypography variant='body1'>
              {t('addClientBtn')}
            </CustomTypography>
          }
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ClientDetailsView services={services} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ClientsServicesList;
