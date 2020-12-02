import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import Grid from '@material-ui/core/Grid';
import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import ServiceRequestForm from 'templates/services/ServiceRequestForm';
import { fetchServiceDetails, createOrUpdateService } from 'apis/servicesAPI';
import Direction from 'components/grid/Direction';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useSnackBar } from 'context/SnackBarContext';
import { SERVICE_STATUS } from 'constants/questionStatus';
import { RoutesPaths } from 'constants/routesPath';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';

const ServiceRequestDetails = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { serviceId, assignmentType, content } = location?.state?.service;
  const richTextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceRequest, setServiceRequest] = useState({
    fields: [],
    content: assignmentType === 'call' ? CONTENT_FOR_CALL : content,
    assignmentType: assignmentType,
  });
  const { showSuccessMessage, showErrorMessage } = useSnackBar();

  const isNoActionForm = serviceRequest?.state === SERVICE_STATUS.pending;
  const showDrafButtons =
    !serviceRequest.id || serviceRequest?.state === 'draft';

  let history = useHistory();
  const navigatToDashboard = () => {
    history.push(RoutesPaths.App.Services);
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

  const validateRichTextCount = () => {
    const charCount = richTextRef.current.editor.plugins.wordcount.body.getCharacterCount();
    return charCount >= 100;
  };
  const validate = (serviceRequest) => {
    if (!serviceRequest.title) {
      showErrorMessage(t('titleValidation'));
      return false;
    }
    if (!validateRichTextCount()) {
      showErrorMessage(t('contentValidation'));
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!!validate(serviceRequest)) {
      createOrUpdateService({ ...serviceRequest, state: 'pending' })
        .then(() => {
          showSuccessMessage(t('serviceProcessed'));
          navigatToDashboard();
        })
        .catch(() => {});
    }
  };
  const handleSaveForLater = () => {
    createOrUpdateService({ ...serviceRequest, state: 'draft' })
      .then(() => {
        showSuccessMessage(t('serviceSaved'));
        navigatToDashboard();
      })
      .catch(() => {});
  };

  return (
    <Grid container alignItems={'center'} justify={'center'}>
      <GridItem xs={12} sm={12} md={8}>
        <BreadcrumbsCustomSeparator pageName={t('serviceTitle')} />
        <Card>
          <Direction>
            <CardHeader color='primary'>
              <Typography component={'h4'} id={'create-service-request-header'}>
                {t('askTheExpert')}
              </Typography>
            </CardHeader>
            <ServiceRequestForm
              serviceRequest={serviceRequest}
              setServiceRequest={setServiceRequest}
              richTextRef={richTextRef}
              viewOnly={isNoActionForm}
              primaryButton={{
                id: 'submitQuestionButtonButton',
                onClick: () => {
                  handleSubmit();
                },
                buttonText: showDrafButtons
                  ? t('submitQuestionButton')
                  : t('applyChange'),
              }}
              secondaryButton={
                showDrafButtons
                  ? {
                      id: 'saveAndCompleteLaterButton',
                      onClick: () => {
                        handleSaveForLater();
                      },
                      buttonText: t('saveAndCompleteLater'),
                    }
                  : {}
              }
            />
          </Direction>
        </Card>
      </GridItem>
    </Grid>
  );
};

const CONTENT_FOR_CALL =
  '<p><span style="font-weight: 500; background-color: #ffffff; color: #125773;">Please answer below questions:-</span></p><ul><li style="font-weight: 500;"><span style="font-weight: 500; background-color: #ffffff; color: #125773;">What is the purpose of call?</span></li></ul><p>&nbsp;</p><ul><li style="font-weight: 500;"><span style="font-weight: 500; background-color: #ffffff; color: #125773;">What do you want to achieve at the end of the call?</span></li></ul><p>&nbsp;</p><ul><li style="font-weight: 500;"><span style="font-weight: 500; background-color: #ffffff; color: #125773;">What are the issues you want to discuss in the call?</span></li></ul><p>&nbsp;</p><ul><li style="font-weight: 500;"><span style="font-weight: 500; background-color: #ffffff; color: #125773;">Is there any specific information we need to know before the call?</span></li></ul><p>&nbsp;</p><ul><li style="font-weight: 500;"><span style="font-weight: 500; background-color: #ffffff; color: #125773;">Is there any specific requirements in the expert you want to talk?</span></li></ul><p>&nbsp;</p>';

export default ServiceRequestDetails;
