import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import Grid from '@material-ui/core/Grid';
import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import ServiceRequestForm from 'templates/services/ServiceRequestForm';
import Direction from 'components/grid/Direction';
import LoadingCircle from 'components/progress/LoadingCircle';
import { SERVICE_STATUS } from 'constants/questionStatus';
import { RoutesPaths } from 'constants/routesPath';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';

const NewQuestion = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const { assignmentType, content } = location?.state?.service;
  const richTextRef = useRef(null);
  const [isLoading] = useState(false);
  const [serviceRequest, setServiceRequest] = useState({
    fields: [],
    content: assignmentType === 'call' ? CONTENT_FOR_CALL(t, isArlang) : content,
    assignmentType: assignmentType,
  });
  const [errors, setErrors] = useState({});

  const isNoActionForm = serviceRequest?.state === SERVICE_STATUS.pending;

  let history = useHistory();

  if (isLoading) {
    return <LoadingCircle />;
  }

  const validateRichTextCount = () => {
    const charCount = richTextRef.current.editor.plugins.wordcount.body.getCharacterCount();
    return charCount >= 100;
  };

  const validate = (serviceRequest) => {
    const validationErrors = {};
    if (!serviceRequest.title) {
      validationErrors.title = { message: t('titleValidation') };
    }
    if (!serviceRequest.fields || !(serviceRequest.fields?.length > 0)) {
      validationErrors.fields = { message: t('fieldsValidation') };
    }
    if (!validateRichTextCount()) {
      validationErrors.content = { message: t('contentValidation') };
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!!validate(serviceRequest)) {
      localStorage.setItem('requests', JSON.stringify(serviceRequest));
      history.push(RoutesPaths.App.Signup);
    }
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
              errors={errors}
              primaryButton={{
                id: 'submitQuestionButtonButton',
                onClick: handleSubmit,
                buttonText: t('submitQuestionButton'),
              }}
            />
          </Direction>
        </Card>
      </GridItem>
    </Grid>
  );
};
const CONTENT_FOR_CALL= (t,isArlang) =>
`<p><span style="font-weight: 500; display: flex; direction: ${isArlang ? 'rtl' : 'ltr'}; background-color: #ffffff; color: #125773;">${t('submitQuestionButton')}</span></p><ul style="direction: ${isArlang ? 'rtl' : 'ltr'};"><li style="font-weight: 500;">
  <span style="font-weight: 500; background-color: #ffffff; color: #125773;">${t('purposeOfCall')}</span></li></ul><p>&nbsp;</p><ul style="direction: ${isArlang ? 'rtl' : 'ltr'};"><li style="font-weight: 500;">
  <span style="font-weight: 500; background-color: #ffffff; color: #125773;">${t('callAchievements')}</span></li></ul><p>&nbsp;</p><ul style="direction: ${isArlang ? 'rtl' : 'ltr'};"><li style="font-weight: 500;">
  <span style="font-weight: 500; background-color: #ffffff; color: #125773;">${t('specificInformationBeforeCall')}</span></li></ul><p>&nbsp;</p><ul style="direction: ${isArlang ? 'rtl' : 'ltr'};"><li style="font-weight: 500;">
  <span style="font-weight: 500; background-color: #ffffff; color: #125773;">${t('specificRequirements')}</span></li></ul><p>&nbsp;</p>`;
export default NewQuestion;
