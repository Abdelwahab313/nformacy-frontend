import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CardBody from 'components/card/CardBody';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CustomInput from 'components/inputs/CustomInput';
import {
  industries,
  questionLanguages,
  questionTypesOfAssignment,
} from 'constants/dropDownOptions';
import humanizedTimeSpan from 'services/humanizedTimeSpan';
import { useStyles } from 'styles/Admin/questionFormStyles';
import RichTextEditorForm from 'components/forms/RichTextEditorForm';
import { Grid } from '@material-ui/core';
import { useStyles as useRoasterStyle } from 'styles/questionRoasterStyles';
import AttachmentUploader from 'components/forms/AttachmentUploader';
import DropdownSelectField from 'components/inputs/DropdownSelectField';
import AssignedAdvisersSelect from './AssignedAdvisersSelect';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import Typography from '@material-ui/core/Typography';
import QuestionActionButtons from './QuestionActionButtons';
import authManager from 'services/authManager';
import { useQuestionContext } from '../context';
import {
  setEmptyMessage,
  updateQuestionField,
} from '../context/questionAction';
import SuccessSnackBar from 'components/snackbar/SuccessSnackBar';
import ImageUploadWithPreview from 'components/inputs/FileUpload/ImageUploadWithPreview';
import FieldsSelect from 'components/inputs/FieldsSelect/FieldsSelect';
import { QUESTION_STATUS } from 'constants/questionStatus';
import QuestionGuardian from 'core/guardians/QuestionGuardian';

const QuestionForm = ({ isNewQuestion }) => {
  const classes = useStyles();
  const questionRoasterClasses = useRoasterStyle();

  const [
    { questionDetails, message, isError },
    dispatch,
  ] = useQuestionContext();

  const [thumbnailImage, setThumbnailImage] = useState('');
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);

  const onChangeQuestionField = (name, data) => {
    updateQuestionField(dispatch, name, data);
  };

  return (
    <CardBody>
      <GridContainer>
        {!isNewQuestion && (
          <GridItem
            className={classes.projectManagerField}
            xs={12}
            sm={12}
            md={2}>
            <CustomInput
              labelText='Reference ID'
              id='reference-id'
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: questionDetails.referenceNumber,
                name: 'referenceNumber',
                disabled: true,
              }}
            />
          </GridItem>
        )}
        <GridItem xs={12} sm={12} md={!isNewQuestion ? 7 : 12}>
          <CustomInput
            labelText='Title'
            id='title'
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: questionDetails.title,
              name: 'title',
              onChange: (e) => {
                onChangeQuestionField('title', e.target.value);
              },
            }}
          />
        </GridItem>
        {!isNewQuestion && (
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput
              labelText='Post Date'
              id='post-date'
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: humanizedTimeSpan(questionDetails.createdAt),
                name: 'createdAt',
                disabled: true,
              }}
            />
          </GridItem>
        )}
      </GridContainer>

      <FieldsSelect
        initialFields={questionDetails.fields}
        updateFields={(newOptions) => {
          onChangeQuestionField('fields', newOptions);
        }}>
        {({ MajorField, Field }) => (
          <GridContainer>
            <GridItem
              className={classes.projectManagerField}
              xs={12}
              sm={12}
              md={3}>
              <MajorField />
            </GridItem>
            <GridItem
              className={classes.projectManagerField}
              xs={12}
              sm={12}
              md={3}>
              <Field />
            </GridItem>
            <GridItem
              className={classes.projectManagerField}
              xs={12}
              sm={12}
              md={3}>
              <DropdownSelectField
                fieldId='industry'
                fieldName='industry'
                fieldOptions={industries}
                fieldValue={questionDetails.industry}
                onFieldChange={(option) =>
                  onChangeQuestionField('industry', option)
                }
                fieldLabel='Industry'
              />
            </GridItem>
            <GridItem
              className={classes.projectManagerField}
              xs={12}
              sm={12}
              md={3}>
              <DropdownSelectField
                fieldId='questionLanguage'
                fieldName='QuestionLanguage'
                fieldOptions={questionLanguages}
                fieldValue={
                  questionLanguages.filter(
                    (option) => questionDetails.language === option.value,
                  )[0]
                }
                onFieldChange={(option) =>
                  onChangeQuestionField('language', option.value)
                }
                fieldLabel='Question Language'
              />
            </GridItem>
          </GridContainer>
        )}
      </FieldsSelect>
      {!authManager.isAdviser() && (
        <GridContainer>
          <GridItem
            className={classes.projectManagerField}
            xs={12}
            sm={12}
            md={3}>
            <DropdownSelectField
              fieldId='assignmentType'
              fieldName='AssignmentType'
              fieldOptions={questionTypesOfAssignment}
              fieldValue={
                questionTypesOfAssignment.filter(
                  (option) => questionDetails.assignmentType === option.value,
                )[0]
              }
              onFieldChange={(option) =>
                onChangeQuestionField('assignmentType', option.value)
              }
              fieldLabel='Type of Assignment'
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={3}
            className={[classes.countDownContainer]}>
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
                value: questionDetails.hoursToCloseAnswers,
                name: 'hoursToCloseAnswers',
                type: 'number',
                onChange: (e) => {
                  onChangeQuestionField('hoursToCloseAnswers', e.target.value);
                },
                inputProps: { min: 1 },
                style: { paddingBottom: 12 },
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={3}
            className={[classes.countDownContainer]}>
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
                value: questionDetails.hoursToReviewAndEdit,
                name: 'hoursToReviewAndEdit',
                type: 'number',
                onChange: (e) => {
                  onChangeQuestionField('hoursToReviewAndEdit', e.target.value);
                },
                inputProps: { min: 1 },
                style: { paddingBottom: 12 },
              }}
            />
          </GridItem>
          <GridItem
            className={classes.projectManagerField}
            xs={12}
            sm={12}
            md={3}>
            <AssignedAdvisersSelect
              questionDetails={questionDetails}
              onChangeQuestionField={onChangeQuestionField}
            />
          </GridItem>
        </GridContainer>
      )}
      {authManager.isAdviser() &&
        questionDetails.state === QUESTION_STATUS.reviewAndEdit && (
          <GridContainer alignItems={'center'}>
            <InputLabel
              className={classes.countDown}
              color={'primary'}
              htmlFor={'reviewAndEditTime'}>
              Remaining time to review and Edit:
            </InputLabel>
            <GridItem
              className={classes.projectManagerField}
              xs={12}
              sm={12}
              md={3}>
              <Typography
                noWrap
                className={classes.currentActionTime}></Typography>
              <QuestionCountDown
                id={'reviewAndEditTime'}
                className={classes.countDownText}
                date={questionDetails?.currentActionTime}
              />
            </GridItem>
          </GridContainer>
        )}
      <GridContainer>
        <GridItem
          className={classes.projectManagerField}
          xs={12}
          sm={12}
          md={12}>
          <InputLabel className={classes.contentTitle}>
            Question Content
          </InputLabel>
          <Grid container className={questionRoasterClasses.questionContainer}>
            <Grid item xs={12}>
              <RichTextEditorForm
                initialContent={questionDetails.content}
                onContentUpdate={(value) =>
                  onChangeQuestionField('content', value)
                }
                richTextMediaId={questionDetails.richTextMediaId}
                updateRichTextMedia={(newRichTextMediaId) =>
                  onChangeQuestionField('richTextMediaId', newRichTextMediaId)
                }
              />
            </Grid>
            {QuestionGuardian.canUploadThumbnail(questionDetails) && (
              <GridItem
                className={classes.projectManagerField}
                xs={12}
                sm={12}
                md={12}>
                <ImageUploadWithPreview
                  buttonClassName={'thumbnail-uploader'}
                  withPreview={true}
                  singleImage={true}
                  label={'Max file size: 1mb, accepted: jpg, gif, png'}
                  withIcon={true}
                  buttonText='Upload Question Thumbnail'
                  imgExtension={['.jpg', '.gif', '.png', 'jpeg']}
                  maxFileSize={1048576}
                  onChange={(picture) => {
                    setThumbnailImage(picture);
                    setIsThumbnailChanged(true);
                  }}
                  defaultImage={questionDetails.thumbnailUrl}
                />
              </GridItem>
            )}
            <GridItem
              className={classes.projectManagerField}
              xs={6}
              className={`${questionRoasterClasses.answerButtonsContainer} ${classes.attachmentContainer}`}>
              {QuestionGuardian.canUploadAttachment(questionDetails) && (
                <AttachmentUploader
                  containerClassName={
                    questionRoasterClasses.attachmentUploaderContainer
                  }
                  attachments={questionDetails.attachments}
                  attachmentsGroupsId={questionDetails.attachmentsGroupsId}
                  setAttachmentsGroupsId={(attachmentsGroupsId) => {
                    onChangeQuestionField(
                      'attachmentsGroupsId',
                      attachmentsGroupsId,
                    );
                  }}
                />
              )}
            </GridItem>

            <QuestionActionButtons
              isNewQuestion={isNewQuestion}
              thumbnailImage={thumbnailImage}
              isThumbnailChanged={isThumbnailChanged}
            />
          </Grid>
        </GridItem>
      </GridContainer>
      <SuccessSnackBar
        isError={isError}
        isSnackbarShown={!!message}
        closeSnackBar={() => setEmptyMessage(dispatch)}
        content={message}
      />
    </CardBody>
  );
};

export default QuestionForm;
