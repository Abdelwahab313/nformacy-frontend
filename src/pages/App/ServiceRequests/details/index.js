import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardFooter from 'components/card/CardFooter';
import ServiceRequestForm from 'templates/services/ServiceRequestForm';
import { fetchServiceDetails, createOrUpdateService} from 'apis/servicesAPI';
import Direction from 'components/grid/Direction';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useSnackBar } from 'context/SnackBarContext';
import { SERVICE_STATUS } from 'constants/questionStatus';
import { RoutesPaths } from 'constants/routesPath';

const ServiceRequestDetails = () => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  const { serviceId, assignmentType } = location?.state?.service;
  const richTextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceRequest, setServiceRequest] = useState({
    fields: [],
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
            />
            <CardFooter className={classes.footerButtons}>
              {!isNoActionForm && (
                <ActionButtonsContainer
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
              )}
            </CardFooter>
          </Direction>
        </Card>
      </GridItem>
    </Grid>
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

export default ServiceRequestDetails;
