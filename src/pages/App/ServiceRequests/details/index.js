import React, { useState } from 'react';
import { useLocation } from 'react-router';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import { Grid, Box, Typography } from '@material-ui/core';
import QuestionView from 'pages/App/QuestionRoaster/subComponents/QuestionView';
import GridItem from 'components/grid/GridItem';
import AnswerView from 'pages/Admin/Questions/QuestionDetails/subComponents/AnswerView';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Direction from 'components/grid/Direction';
import ShortlistCandidate from 'pages/App/ServiceRequests/details/subComponents/ShortlistCandidate';
import { fetchServiceDetails } from 'apis/servicesAPI';
import { SERVICE_STATUS } from 'constants/questionStatus';
import { lighterPink } from 'styles/colors';
import CandidateItem from './subComponents/CandidateItem';
import CardHeader from 'components/card/CardHeader';
import useStyles from '../details/styles/ShortlistCandidate';
import Card from 'components/card/Card';


const ServiceDetails = () => {
  const classes = useStyles();
  const location = useLocation();
  const serviceId = location?.state?.serviceId;
  const { t } = useTranslation();
  const [, setFocusedCandidate] = useState('');
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
          {serviceDetails.state === SERVICE_STATUS.clientSelection &&
            serviceDetails.candidates?.length > 0 && (
              <ShortlistCandidate
                candidates={serviceDetails?.candidates}
                serviceId={serviceDetails.id}
              />
            )}

          {serviceDetails.state === SERVICE_STATUS.callScheduled &&
            serviceDetails.candidates?.length >= 1 && (
              <Card className={classes.noShadow}>
                <CardHeader color='primary'>
                  <Typography component={'h4'} id={'confirmedCandidate'}>
                    Shortlist Candidate
                  </Typography>
                </CardHeader>
                <Grid
                  container
                  justify='space-evenly'
                  className={classes.shortlistContainer}>
                  <Grid item xs={12} md={3}>
                    <Box className={'shortlistedConsultants'}>
                      <CandidateItem
                        bgcolor={lighterPink}
                        candidate={serviceDetails?.meeting.user}
                        isFocused={true}
                        setFocusedCandidate={setFocusedCandidate}
                        onCandidateClick={()=>{window.location.href = serviceDetails?.meeting.link}}        
                        buttonText={'join meeting'}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            )}
          {serviceDetails.assignmentType === 'question' &&
            !!serviceDetails?.question.answers && (
              <GridItem xs={12}>
                {serviceDetails?.question.answers?.map((answer, index) => (
                  <div id={answer.referenceNumber} key={`answer-${index}`}>
                    <AnswerView
                      answer={answer}
                      index={index}
                      setRating={() => { }}
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
