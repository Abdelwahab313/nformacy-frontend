import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { industries, questionLanguages, questionTypesOfAssignment } from 'constants/dropDownOptions';
import humanizedTimeSpan from 'services/humanizedTimeSpan';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CustomInput from 'components/inputs/CustomInput';
import FieldsSelect from 'components/inputs/FieldsSelect/FieldsSelect';
import DropdownSelectField from 'components/inputs/DropdownSelectField';
import RichTextEditorForm from 'components/forms/RichTextEditorForm';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import SubmitButton from 'components/buttons/SubmitButton';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import { submitService } from 'apis/servicesAPI';


const ServiceRequestForm = ({ }) => {
  const classes = useStyles();
  const [serviceRequest, setServiceRequest] = useState({ fields: [] });
  const isNewServiceRequest = true;
  const onChangeField = (name, value) => {
    setServiceRequest((prevData) => ({ ...prevData, [name]: value }))
  };
  const { t } = useTranslation();
  const handleSubmit = () => {
    submitService(serviceRequest)
    .then(() => {
      // console.log('success', res)
    }).catch(()=>{
      // console.log('error');
    })
  }
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
            <GridItem xs={12} sm={12} md={4}>
              <MajorField single />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Field />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
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
          </GridContainer>
        )}
      </FieldsSelect>
      <GridContainer className={classes.inputsRow}>
        <GridItem xs={12} sm={12} md={8}>
          <TextField
            label="Title"
            id='title'
            name='title'
            fullWidth
            value={serviceRequest.title}
            onChange={
              (e) => {
                onChangeField('title', e.target.value);
              }
            }
            variant="outlined"
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
            fieldLabel='Language'
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
            onFieldChange={(option) =>
              onChangeField('assignmentType', option.value)
            }
            fieldLabel='Type'
          />
        </GridItem>
      </GridContainer>

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
                  handleSubmit()
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