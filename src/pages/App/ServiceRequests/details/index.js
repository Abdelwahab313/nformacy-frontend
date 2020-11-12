import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SubmitButton from 'components/buttons/SubmitButton';
import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardFooter from 'components/card/CardFooter';
import ServiceRequestForm from './ServiceRequestForm';
import { submitService } from 'apis/servicesAPI';
import { useStyles as useStylesForm } from 'styles/Admin/questionFormStyles';

const ServiceRequestDetails = () => {
  const classes = useStyles();
  const formClasses = useStylesForm();
  const location = useLocation();
  const { t } = useTranslation();
  const serviceType = location?.state?.serviceType;
  const serviceTitle = t(`common:${serviceType}`);

  const [serviceRequest, setServiceRequest] = useState({ fields: [], type: serviceType });
  const handleSubmit = () => {
    submitService(serviceRequest)
      .then(() => {
        // console.log('success', res)
      }).catch(() => {
        // console.log('error');
      })
  }
  return (<Grid container alignItems={'center'} justify={'center'}>
    <GridItem xs={12} sm={12} md={8}>
      <Card>
        <CardHeader color='primary'>
          <Typography component={'h4'} id={'create-service-request-header'}>
            {`Request a ${serviceTitle} Service`}
          </Typography>
        </CardHeader>
        <ServiceRequestForm serviceRequest={serviceRequest} setServiceRequest={setServiceRequest} />
        <CardFooter className={classes.footerButtons}>
          <Grid
            item
            xs={6}
            className={[formClasses.answerButtonContainer, formClasses.saveQuestionBtn]}>
            <SubmitButton
              id='saveAndCompleteLaterButton'
              onClick={() => {

              }}
              buttonText={t('common:saveAndCompleteLater')}
              className={[formClasses.answerButtons, formClasses.buttonMargin, formClasses.buttonMargin]}
            />
            <SubmitButton
              id='submitQuestionButtonButton'
              onClick={() => {
                handleSubmit()
              }}
              buttonText={t('common:submitQuestionButton')}
              className={[formClasses.answerButtons, formClasses.buttonMargin, formClasses.buttonMargin]}
            />
          </Grid>
        </CardFooter>
      </Card>
    </GridItem>
  </Grid>);
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