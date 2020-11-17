import React, { useEffect, useState } from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchServiceDetails, returnToClient } from 'apis/servicesAPI';
import ServiceRequestForm from '../../../../templates/services/ServiceRequestForm';
import CardFooter from 'components/card/CardFooter';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import { useSnackBar } from 'context/SnackBarContext';

const ServiceDetails = () => {
  const classes = useStyles();
  const [serviceRequest, setServiceRequest] = useState({});
  const location = useLocation();
  const { serviceId } = location?.state?.service;
  const [isLoading, setIsLoading] = useState(false);
  const isNewService = !serviceId;
  const { t } = useTranslation();
  const { showErrorMessage, showSuccessMessage } = useSnackBar();

  const validate = (serviceRequest) => {
    if (!serviceRequest.comment) {
      showErrorMessage(t('commentValidation'));
      return false;
    }
    return true;
  };

  const handleReturnToClient = () => {
    if (!!validate(serviceRequest)) {
      returnToClient(serviceId, serviceRequest.comment)
        .then(() => {
          showSuccessMessage(t('commentSubmitted'));
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchServiceDetails(serviceId)
      .then((response) => {
        setServiceRequest(response.data);
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
            <Typography component={'h4'} id={'post-service-page-header'}>
              {isNewService ? 'Add Service' : 'Edit Service'}
            </Typography>
          </CardHeader>
          <ServiceRequestForm
            serviceRequest={serviceRequest}
            setServiceRequest={setServiceRequest}
            viewOnly
          />
          <CardFooter className={classes.footerButtons}>
            <ActionButtonsContainer
              primaryButton={{
                id: 'returnToClientButton',
                buttonText: 'Return to Client',
                onClick: () => {
                  handleReturnToClient();
                },
              }}
              secondaryButton={{
                id: 'generateQuestionButton',
                onClick: () => {},
                buttonText: 'Generate Question',
              }}
            />
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  item: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 16,
  },
  link: {
    textDecoration: 'none',
  },
}));

export default ServiceDetails;
