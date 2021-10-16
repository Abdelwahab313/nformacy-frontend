import React from 'react';
import GridItem from '../../../../components/grid/GridItem';
import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useLocation } from 'react-router';
import { getUser, resendInvitationMail } from 'apis/userAPI';
import useFetchData from 'hooks/useFetchData';
import CustomTypography from 'components/typography/Typography';
import ConsultantDetailsView from 'templates/consultants/ConsultantDetailsView';
import { fetchFreelancerAnswers } from 'apis/answersAPI';
import SubmitButton from 'components/buttons/SubmitButton';
import { useTranslation } from 'react-i18next';
import { useSnackBar } from 'context/SnackBarContext';


const ConsultantsServicesList = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const { consultantId, consultantEmailStatus } = location?.state;
  const { showSuccessMessage, showErrorMessage } = useSnackBar();


  const { fetchedData: activities, isLoading } = useFetchData(() => fetchFreelancerAnswers(consultantId));

  const { fetchedData: users } = useFetchData(() => {
    return getUser(consultantId);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  const handleResendInvitationMail = () => {
    resendInvitationMail(consultantId).then(() => {
      showSuccessMessage(t('successResendInvitationMail'));
    }).catch(() => {
      showErrorMessage(t('failedResendInvitationMail'));
    });
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer alignItems="center" justify="space-between">
          <CustomTypography fontWeight='bold'>
            {users.firstName + ' ' + users.lastName}
          </CustomTypography>
          {!consultantEmailStatus && <SubmitButton

            id={'resendInvitationMailBtn'}
            onClick={handleResendInvitationMail}
            buttonText={
              <CustomTypography variant="body1">
                {t('resendInvitationMailBtn')}
              </CustomTypography>
            }
          />}
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ConsultantDetailsView activities={activities} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer >
  );
};

export default ConsultantsServicesList;
