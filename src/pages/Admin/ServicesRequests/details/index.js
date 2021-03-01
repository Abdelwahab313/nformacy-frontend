import React, { useEffect, useState, Fragment } from 'react';
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
import { Typography, Grid } from '@material-ui/core';
import { useSnackBar } from 'context/SnackBarContext';
import { RoutesPaths } from 'constants/routesPath';
import LinkText from 'components/typography/LinkText';
import authManager from 'services/authManager';
import {
  getQuestionDetailsLinkForAdmin,
  getCallEvaluationView,
} from 'services/navigation';
import { useStyles } from 'styles/Admin/questionFormStyles';
import MeetingDetailsSection from 'pages/App/ServiceRequests/details/subComponents/MeetingDetailsSection';
import SubmitButton from 'components/buttons/SubmitButton';
import { MEETING_STATUS } from 'constants/questionStatus';
import RollbackQuestionButton from 'templates/services/RollbackQuestionButton';
import ServiceGuardian from 'core/guardians/ServiceGuardian';

const ServiceDetails = () => {
  const classes = useStyles();
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

  const hasRelatedQuestion = !!serviceRequest.question?.id;
  const handleClick = () => {
    return history.push(getCallEvaluationView(serviceRequest?.meetings[0].id));
  };
  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Typography component={'h4'} id={'post-service-page-header'}>
                  {isNewService ? 'Add Service' : 'Edit Service'}
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                {!!hasRelatedQuestion && (
                  <Typography component={'h4'}>
                    <LinkText
                      to={getQuestionDetailsLinkForAdmin(
                        serviceRequest.question.id,
                      )}
                      className={classes.relatedService}>
                      {authManager.isAdmin() && 'Related Question'}
                    </LinkText>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardHeader>
          {!!hasRelatedQuestion &&
            ServiceGuardian.showRollbackQuestionButton(serviceRequest) && (
              <Grid container direction={'row-reverse'}>
                <RollbackQuestionButton serviceId={serviceRequest?.id} />
              </Grid>
            )}
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
      {!!serviceRequest.meetings?.length > 0 &&
        serviceRequest.meetings?.map((meeting) => (
          <Fragment>
            <GridItem xs={12}>
              <MeetingDetailsSection meeting={meeting} />
            </GridItem>

            <GridItem xs={12}>
              {meeting.state === MEETING_STATUS.callFinished ? (
                <SubmitButton
                  className={classes.viewEvaluations}
                  onClick={() => {
                    handleClick();
                  }}
                  buttonText={t('viewEvaluations')}
                />
              ) : (
                <SubmitButton
                  className={classes.viewEvaluations}
                  onClick={() => {}}
                  buttonText={t('joinMeetingBtn')}
                />
              )}
            </GridItem>
          </Fragment>
        ))}
    </GridContainer>
  );
};

export default ServiceDetails;
