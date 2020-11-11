import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { industries, questionLanguages, questionTypesOfAssignment } from 'constants/dropDownOptions';
import humanizedTimeSpan from 'services/humanizedTimeSpan';
import authManager from 'services/authManager';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CustomInput from 'components/inputs/CustomInput';
import FieldsSelect from 'components/inputs/FieldsSelect/FieldsSelect';
import DropdownSelectField from 'components/inputs/DropdownSelectField';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import RichTextEditorForm from 'components/forms/RichTextEditorForm';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import SubmitButton from 'components/buttons/SubmitButton';
import AssignedAdvisersSelect from '../../../Admin/Questions/QuestionDetails/subComponents/AssignedAdvisersSelect';
import { useTranslation } from 'react-i18next';

const ServiceRequestForm = ({ }) => {
  const classes = useStyles();
  const [serviceRequest, setServiceRequest] = useState({fields:[]});
  const isNewServiceRequest = true;
  const onChangeField = (name, value) => {
    setServiceRequest((prevData) => ({ ...prevData, [name]: value }))
  };
  const { t } = useTranslation();

  return (
    <CardBody>
      <GridContainer>
        {!isNewServiceRequest && (
          <GridItem xs={12} sm={12} md={2}>
            <CustomInput
              labelText='Reference ID'
              id='reference-id'
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: serviceRequest.referenceNumber,
                name: 'referenceNumber',
                disabled: true,
              }}
            />
          </GridItem>
        )}
        <GridItem xs={12} sm={12} md={!isNewServiceRequest ? 7 : 12}>
          <CustomInput
            labelText='Title'
            id='title'
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: serviceRequest.title,
              name: 'title',
              onChange: (e) => {
                onChangeField('title', e.target.value);
              },
            }}
          />
        </GridItem>
        {!isNewServiceRequest && (
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput
              labelText='Post Date'
              id='post-date'
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: humanizedTimeSpan(serviceRequest.createdAt),
                name: 'createdAt',
                disabled: true,
              }}
            />
          </GridItem>
        )}
      </GridContainer>

      <FieldsSelect
        initialFields={serviceRequest.fields}
        updateFields={(newOptions) => {
          onChangeField('fields', newOptions);
        }}>
        {({ MajorField, Field }) => (

          <GridContainer className={classes.inputsRow}>
            <GridItem xs={12} sm={12} md={3}>
              <MajorField single />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <Field />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <DropdownSelectField
                fieldId='industry'
                fieldName='industry'
                fieldOptions={industries}
                fieldValue={serviceRequest.industry}
                onFieldChange={(option) =>
                  onChangeField('industry', option)
                }
                fieldLabel='Industry'
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <DropdownSelectField
                fieldId='questionLanguage'
                fieldName='QuestionLanguage'
                fieldOptions={questionLanguages}
                fieldValue={
                  questionLanguages.filter(
                    (option) => serviceRequest.language === option.value,
                  )[0]
                }
                onFieldChange={(option) =>
                  onChangeField('language', option.value)
                }
                fieldLabel='Question Language'
              />
            </GridItem>
          </GridContainer>
        )}
      </FieldsSelect>
      {authManager.isAdmin() && (
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={3}>
            <DropdownSelectField
              fieldId='assignmentType'
              fieldName='AssignmentType'
              fieldOptions={questionTypesOfAssignment}
              fieldValue={
                questionTypesOfAssignment.filter(
                  (option) => serviceRequest.assignmentType === option.value,
                )[0]
              }
              onFieldChange={(option) =>
                onChangeField('assignmentType', option.value)
              }
              fieldLabel='Type of Assignment'
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={3}
            className={classes.countDownContainer}>
            <CustomInput
              labelText='Time for Freelancers to Answer (In Hours)'
              id='hoursToCloseAnswers'
              formControlProps={{
                style: {
                  margin: 0,
                },
                fullWidth: true,
              }}
              inputProps={{
                value: serviceRequest.hoursToCloseAnswers,
                name: 'hoursToCloseAnswers',
                type: 'number',
                onChange: (e) => {
                  onChangeField('hoursToCloseAnswers', e.target.value);
                },
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={3}
            className={classes.countDownContainer}>
            <CustomInput
              labelText='Time for Adviser to Review (In Hours)'
              id='hoursToReviewAndEdit'
              formControlProps={{
                style: {
                  margin: 0,
                },
                fullWidth: true,
              }}
              inputProps={{
                value: serviceRequest.hoursToReviewAndEdit,
                name: 'hoursToReviewAndEdit',
                type: 'number',
                onChange: (e) => {
                  onChangeField('hoursToReviewAndEdit', e.target.value);
                },
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <AssignedAdvisersSelect
              serviceRequest={serviceRequest}
              onChangeField={onChangeField}
            />
          </GridItem>
        </GridContainer>
      )}
      {authManager.isAdviser() && serviceRequest.state === 'review_and_edit' && (
        <GridContainer className={classes.inputsRow} alignItems={'center'}>
          <InputLabel
            className={classes.countDown}
            color={'primary'}
            htmlFor={'reviewAndEditTime'}>
            Remaining time to review and Edit:
          </InputLabel>
          <GridItem xs={12} sm={12} md={3}>
            <QuestionCountDown
              id={'reviewAndEditTime'}
              className={classes.countDownText}
              date={serviceRequest?.currentActionTime}
            />
          </GridItem>
        </GridContainer>
      )}
      <GridContainer className={classes.inputsRow}>
        <GridItem xs={12} sm={12} md={12}>
          <InputLabel className={classes.contentTitle}>
            Question Content
          </InputLabel>
          <Grid container className={classes.questionContainer}>
            <Grid item xs={12}>
              <RichTextEditorForm
                initialContent={serviceRequest.content}
                onContentUpdate={(value) =>
                  onChangeField('content', value)
                }
                richTextMediaId={serviceRequest.richTextMediaId}
                updateRichTextMedia={(newRichTextMediaId) =>
                  onChangeField('richTextMediaId', newRichTextMediaId)
                }
              />
            </Grid>

            <Grid
              item
              xs={6}
              className={[classes.answerButtonContainer, classes.saveQuestionBtn]}>
              <SubmitButton
                id='saveAndCompleteLaterButton'
                onClick={() => {
                }}
                buttonText={t('common:saveAndCompleteLater')}
                className={[classes.answerButtons, classes.buttonMargin, classes.buttonMargin]}
              />
              <SubmitButton
                id='submitQuestionButtonButton'
                onClick={() => {
                }}
                buttonText={t('common:submitQuestionButton')}
                className={[classes.answerButtons, classes.buttonMargin, classes.buttonMargin]}
              />
            </Grid>
          </Grid>
        </GridItem>
      </GridContainer>
    </CardBody>
  );

};

export default ServiceRequestForm;