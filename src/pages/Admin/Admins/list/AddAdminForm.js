import React, { Fragment } from 'react';
import { industries } from 'constants/dropDownOptions';
import humanizedTimeSpan from 'services/humanizedTimeSpan';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CustomInput from 'components/inputs/CustomInput';
import FieldsSelect from 'components/inputs/FieldsSelect/FieldsSelect';
import DropdownSelectField from 'components/inputs/DropdownSelectField';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import CardFooter from 'components/card/CardFooter';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { darkBlue } from 'styles/colors';
import { lightBlue } from '@material-ui/core/colors';

const AdminCheckbox = withStyles({
  root: {
    color: lightBlue,
    '&$checked': {
      color: darkBlue,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AddAdminForm = ({ viewOnly, primaryButton, user, setUser }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const onChangeField = (name, value) => {
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleCheckbox = (e) => {
    setUser({ ...user, [e.target.name]: e.target.checked });
  };

  return (
    <Fragment>
      <CardBody>
        <GridContainer>
          {(viewOnly) && (
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
                labelText={t('referenceId')}
                id='reference-id'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: user.referenceNumber,
                  name: 'referenceNumber',
                  disabled: true,
                }}
              />
            </GridItem>
          )}
          {(viewOnly) && (
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText={t('postDate')}
                id='post-date'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: humanizedTimeSpan(user.createdAt),
                  name: 'createdAt',
                  disabled: true,
                }}
              />
            </GridItem>
          )}
        </GridContainer>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              label={t('firstname')}
              id='firstname'
              name='firstname'
              fullWidth
              value={user.firstname}
              onChange={(e) => {
                onChangeField('firstname', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              label={t('lastname')}
              id='lastname'
              name='lastname'
              fullWidth
              value={user.lastname}
              onChange={(e) => {
                onChangeField('lastname', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              label={t('email')}
              id='email'
              name='email'
              fullWidth
              value={user.email}
              onChange={(e) => {
                onChangeField('email', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={6}>
            <TextField
              label={t('password')}
              id='password'
              name='password'
              fullWidth
              type='password'
              value={user.password}
              onChange={(e) => {
                onChangeField('password', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <TextField
              label={t('confirmPassword')}
              id='confirmPassword'
              name='confirmPassword'
              fullWidth
              type='password'
              value={user.confirmPassword}
              onChange={(e) => {
                onChangeField('confirmPassword', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
        </GridContainer>

        <FieldsSelect
          initialFields={user.fields}
          updateFields={(newOptions) => {
            onChangeField('fields', newOptions);
          }}>
          {({ MajorField, Field }) => (
            <GridContainer className={classes.inputsRow}>
              <GridItem xs={12} sm={12} md={4}>
                <MajorField />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Field />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <DropdownSelectField
                  fieldId='industry'
                  fieldName='industry'
                  fieldOptions={industries}
                  fieldValue={user.industry}
                  onFieldChange={(option) => onChangeField('industry', option)}
                  fieldLabel={t('industry')}
                />
              </GridItem>
            </GridContainer>
          )}
        </FieldsSelect>

        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={4}>
            <FormControlLabel
              control={<AdminCheckbox checked={user.isRequestManager}
                onChange={handleCheckbox}
                name="isRequestManager" />}
              label="Requests Manager"
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <FormControlLabel
              control={<AdminCheckbox checked={user.isQuestionRoasterManager}
                onChange={handleCheckbox}
                name="isQuestionRoasterManager" />}
              label="Question Roaster Manager"
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <FormControlLabel
              control={<AdminCheckbox checked={user.isAdvisorManager}
                onChange={handleCheckbox}
                name="isAdvisorManager" />}
              label="Advisor Manager"
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <FormControlLabel
              control={<AdminCheckbox checked={user.isClientManager}
                onChange={handleCheckbox}
                name="isClientManager" />}
              label="Client Manager"
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <FormControlLabel
              control={<AdminCheckbox checked={user.isConsultantManager}
                onChange={handleCheckbox}
                name="isConsultantManager" />}
              label="Consultant Manager"
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <ActionButtonsContainer
          primaryButton={primaryButton}
        />
      </CardFooter>
    </Fragment>
  );
};

export default AddAdminForm;
