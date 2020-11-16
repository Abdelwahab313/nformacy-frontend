import React from 'react';
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

const ServiceRequestForm = ({
  serviceRequest,
  setServiceRequest,
  richTextRef,
  viewOnly,
}) => {
  const classes = useStyles();

  const isNewServiceRequest = !serviceRequest.id;
  const { t } = useTranslation();
  const questionTypesOfAssignment = questionTypesOfAssignmentTranslated(t);
  const onChangeField = (name, value) => {
    setServiceRequest((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
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
            onFieldChange={(option) => onChangeField('language', option.value)}
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
            {!isNewServiceRequest && (
              <TextField
                label={t('comment')}
                id='comment'
                name='comment'
                fullWidth
                value={serviceRequest.comment}
                onChange={(e) => {
                  onChangeField('comment', e.target.value);
                }}
                disabled={!viewOnly}
                variant='outlined'
                className={classes.inputsRow}
              />
            )}
          </Grid>
        </GridItem>
      </GridContainer>
    </CardBody>
  );
};

export default ServiceRequestForm;
