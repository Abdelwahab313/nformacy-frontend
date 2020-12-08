import React from 'react';
import { useLocation } from 'react-router';

import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import { Grid } from '@material-ui/core';
import QuestionView from 'pages/App/QuestionRoaster/subComponents/QuestionView';
import GridItem from 'components/grid/GridItem';
import AnswerView from 'pages/Admin/Questions/QuestionDetails/subComponents/AnswerView';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Direction from 'components/grid/Direction';
import ShortlistCandidate from 'pages/App/ServiceRequests/details/subComponents/ShortlistCandidate';
import { fetchServiceDetails } from 'apis/servicesAPI';

const ServiceDetails = () => {
  const location = useLocation();
  const serviceId = location?.state?.serviceId;
  const { t } = useTranslation();
  const { fetchedData: serviceDetails, isLoading } = useFetchData(() =>
    fetchServiceDetails(serviceId),
  );
  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Direction>
      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={10} sm={10}>
          <BreadcrumbsCustomSeparator pageName={t('serviceDetails')} />
          <QuestionView
            questionDetails={serviceDetails?.question}
            isSubmitVisible={false}
          />
          {serviceDetails.assignmentType === 'call' &&
            serviceDetails.candidates?.length > 0 && (
              <ShortlistCandidate
                candidates={serviceDetails?.candidates}
                serviceId={serviceDetails.id}
              />
            )}
          {serviceDetails.assignmentType === 'question' &&
            !!serviceDetails?.question.answers && (
              <GridItem xs={12}>
                {serviceDetails?.question.answers?.map((answer, index) => (
                  <div id={answer.referenceNumber} key={`answer-${index}`}>
                    <AnswerView
                      answer={answer}
                      index={index}
                      setRating={() => {}}
                    />
                  </div>
                ))}
              </GridItem>
            )}
        </Grid>
      </Grid>
    </Direction>
  );
};

export default ServiceDetails;
