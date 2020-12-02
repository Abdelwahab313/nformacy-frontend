import React, { useEffect, useState } from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import LoadingCircle from 'components/progress/LoadingCircle';
import {
  fetchServiceDetails,
  returnToClient,
  generateQuestion,
} from 'apis/servicesAPI';
import ServiceRequestForm from 'templates/services/ServiceRequestForm';
import { Typography } from '@material-ui/core';
import { useSnackBar } from 'context/SnackBarContext';
import { RoutesPaths } from 'constants/routesPath';

const ServiceDetails = () => {
  const [serviceRequest, setServiceRequest] = useState({});
  const location = useLocation();

  let history = useHistory();
  const navigatToDashboard = () => {
    history.push(RoutesPaths.Admin.Services);
  };

  const navigateToQuestionDetails = (questionId) => {
    history.push(RoutesPaths.Admin.QuestionsDetails, { questionId });
  };

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

  const handleGenerateQuestion = () => {
    generateQuestion(serviceId)
      .then((response) => {
        const createdQuestionId = response.data.id;
        navigateToQuestionDetails(createdQuestionId);
        showSuccessMessage(t('questionGenerated'));
      })
      .catch(() => {});
  };

  const handleReturnToClient = () => {
    if (!!validate(serviceRequest)) {
      returnToClient(serviceId, serviceRequest.comment)
        .then(() => {
          showSuccessMessage(t('commentSubmitted'));
          navigatToDashboard();
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
            primaryButton={{
              id: 'generateQuestionButton',
              onClick: () => {
                handleGenerateQuestion();
              },
              buttonText: 'Generate Question',
            }}
            secondaryButton={{
              id: 'returnToClientButton',
              buttonText: 'Return to Client',
              onClick: () => {
                handleReturnToClient();
              },
            }}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ServiceDetails;
