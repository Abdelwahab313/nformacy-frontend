import React, { useRef, useState } from 'react';
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
import SuccessSnackBar from 'components/snackbar/SuccessSnackBar';
import Direction from 'components/grid/Direction';

const ServiceRequestDetails = () => {
  const classes = useStyles();
  const formClasses = useStylesForm();
  const location = useLocation();
  const { t } = useTranslation();
  const serviceType = location?.state?.serviceType;
  const richTextRef = useRef(null);

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [serviceRequest, setServiceRequest] = useState({
    fields: [],
    assignmentType: serviceType,
  });

  const validateRichTextCount = () => {
    const charCount = richTextRef.current.editor.plugins.wordcount.body.getCharacterCount();
    return charCount >= 100;
  };
  const validate = (serviceRequest) => {
    setIsError(false);
    if (!serviceRequest.title) {
      setIsError(true);
      setMessage(t('titleValidation'));
      return false;
    }
    if (!validateRichTextCount()) {
      setIsError(true);
      setMessage(t('contentValidation'));
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!!validate(serviceRequest)) {
      submitService({ ...serviceRequest, state: 'pending' })
        .then(() => {
          setMessage(t('serviceProcessed'));
        })
        .catch(() => {});
    }
  };
  const handleSaveForLater = () => {
    if (!!validate(serviceRequest)) {
      submitService({ ...serviceRequest, state: 'draft' })
        .then(() => {
          setMessage(t('serviceSaved'));
        })
        .catch(() => {});
    }
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
            />
            <CardFooter className={classes.footerButtons}>
              <Grid
                item
                xs={6}
                className={[
                  formClasses.answerButtonContainer,
                  formClasses.saveQuestionBtn,
                ]}>
                <SubmitButton
                  id='saveAndCompleteLaterButton'
                  onClick={() => {
                    handleSaveForLater();
                  }}
                  buttonText={t('saveAndCompleteLater')}
                  className={[
                    formClasses.answerButtons,
                    formClasses.buttonMargin,
                    formClasses.buttonMargin,
                  ]}
                />
                <SubmitButton
                  id='submitQuestionButtonButton'
                  onClick={() => {
                    handleSubmit();
                  }}
                  buttonText={t('submitQuestionButton')}
                  className={[
                    formClasses.answerButtons,
                    formClasses.buttonMargin,
                    formClasses.buttonMargin,
                  ]}
                />
              </Grid>
            </CardFooter>
            <SuccessSnackBar
              isError={isError}
              isSnackbarShown={!!message}
              closeSnackBar={() => setMessage('')}
              content={message}
            />
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
