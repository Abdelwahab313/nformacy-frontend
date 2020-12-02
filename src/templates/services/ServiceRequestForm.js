import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import {
  industries,
  questionLanguages,
  questionTypesOfAssignmentTranslated,
} from 'constants/dropDownOptions';
import humanizedTimeSpan from 'services/humanizedTimeSpan';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CustomInput from 'components/inputs/CustomInput';
import FieldsSelect from 'components/inputs/FieldsSelect/FieldsSelect';
import DropdownSelectField from 'components/inputs/DropdownSelectField';
import RichTextEditorForm from 'components/forms/RichTextEditorForm';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { red } from 'styles/colors';
import { SERVICE_STATUS } from 'constants/questionStatus';
import CardFooter from 'components/card/CardFooter';
import authManager from 'services/authManager';
import AttachmentUploader from 'components/forms/AttachmentUploader';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';

const useSelectStyles = makeStyles(() => ({
  disabledStyle: {
    '& .MuiInputBase-input.Mui-disabled': {
      color: red,
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: red,
    },
    '& .MuiFormLabel-root.Mui-disabled': {
      color: red,
    },
  },
}));

const ServiceRequestForm = ({
  serviceRequest,
  setServiceRequest,
  richTextRef,
  viewOnly,
  primaryButton,
  secondaryButton,
}) => {
  const classes = useStyles();
  const disabledClasses = useSelectStyles();

  const isNewServiceRequest = !serviceRequest.id;
  const isDraftServiceRequest =
    !!serviceRequest.state && serviceRequest.state === SERVICE_STATUS.draft;
  const { t } = useTranslation();
  const questionTypesOfAssignment = questionTypesOfAssignmentTranslated(t);
  const onChangeField = (name, value) => {
    setServiceRequest((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <Fragment>
      <CardBody>
        <GridContainer>
          {(!isNewServiceRequest || viewOnly) && (
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
                labelText={t('referenceId')}
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
          {(!isNewServiceRequest || viewOnly) && (
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText={t('postDate')}
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
              <GridItem xs={12} sm={12} md={4}>
                <MajorField single disabled={viewOnly} />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Field disabled={viewOnly} />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <DropdownSelectField
                  fieldId='industry'
                  fieldName='industry'
                  fieldOptions={industries}
                  fieldValue={serviceRequest.industry}
                  onFieldChange={(option) => onChangeField('industry', option)}
                  fieldLabel={t('industry')}
                  disabled={viewOnly}
                />
              </GridItem>
            </GridContainer>
          )}
        </FieldsSelect>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={8}>
            <TextField
              label={t('title')}
              id='title'
              name='title'
              fullWidth
              value={serviceRequest.title}
              onChange={(e) => {
                onChangeField('title', e.target.value);
              }}
              variant='outlined'
              disabled={viewOnly}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
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
              fieldLabel={t('languageField')}
              disabled={viewOnly}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <DropdownSelectField
              fieldId='assignmentType'
              fieldName='AssignmentType'
              fieldOptions={questionTypesOfAssignment}
              fieldValue={
                questionTypesOfAssignment.filter(
                  (option) => serviceRequest.assignmentType === option.value,
                )[0]
              }
              fieldLabel={t('assignmentType')}
              disabled
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            {!isNewServiceRequest && !isDraftServiceRequest && (
              <TextField
                label={t('comment')}
                id='comment'
                name='comment'
                fullWidth
                value={serviceRequest.comment}
                onChange={(e) => {
                  onChangeField('comment', e.target.value);
                }}
                disabled={!authManager.isAdmin()}
                variant='outlined'
                className={[classes.inputsRow, disabledClasses.disabledStyle]}
              />
            )}
          </GridItem>
        </GridContainer>

        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={12}>
            <InputLabel className={classes.contentTitle}>
              {t('questionContent')}
            </InputLabel>
            <Grid container className={classes.questionContainer}>
              <Grid item xs={12}>
                <RichTextEditorForm
                  initialContent={serviceRequest.content}
                  onContentUpdate={(value) => onChangeField('content', value)}
                  richTextMediaId={serviceRequest.richTextMediaId}
                  updateRichTextMedia={(newRichTextMediaId) =>
                    onChangeField('richTextMediaId', newRichTextMediaId)
                  }
                  richTextRef={richTextRef}
                  disabled={viewOnly}
                />
              </Grid>
            </Grid>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter className={classes.footerButtons}>
        {serviceRequest.assignmentType === 'call' && (
          <Grid item xs={6}>
            <AttachmentUploader
              attachments={serviceRequest.attachments}
              attachmentsGroupsId={serviceRequest.attachmentsGroupsId}
              setAttachmentsGroupsId={(attachmentsGroupsId) => {
                onChangeField('attachmentsGroupsId', attachmentsGroupsId);
              }}
            />
          </Grid>
        )}
        <ActionButtonsContainer
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
        />
      </CardFooter>
    </Fragment>
  );
};

export default ServiceRequestForm;
