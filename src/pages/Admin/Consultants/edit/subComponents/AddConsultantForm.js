import React, { Fragment } from 'react';
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
import countryList from 'react-select-country-list';
import ErrorMessage from 'components/errors/ErrorMessage';

const AddConsultantForm = ({
  primaryButton,
  user,
  setUser,
  canEditPassword,
  errors,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isNewForm = !user.id;
  const countries = countryList().getData();

  const onChangeField = (name, value) => {
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Fragment>
      <CardBody>
        <GridContainer>
          {!isNewForm && (
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
          {!isNewForm && (
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
        <GridContainer>
          <GridItem
            className={classes.projectManagerField}
            xs={12}
            sm={12}
            md={4}>
            <TextField
              required
              label={t('firstName')}
              id='firstName'
              name='firstName'
              fullWidth
              value={user.firstName}
              onChange={(e) => {
                onChangeField('firstName', e.target.value);
              }}
              variant='outlined'
              error={errors?.firstName}
            />
            <ErrorMessage errorField={errors?.firstName} />
          </GridItem>

          <GridItem
            className={classes.projectManagerField}
            xs={12}
            sm={12}
            md={4}>
            <TextField
              required
              label={t('lastName')}
              id='lastName'
              name='lastName'
              fullWidth
              value={user.lastName}
              onChange={(e) => {
                onChangeField('lastName', e.target.value);
              }}
              variant='outlined'
              error={errors?.lastName}
            />
            <ErrorMessage errorField={errors?.lastName} />
          </GridItem>

          <GridItem
            className={classes.projectManagerField}
            xs={12}
            sm={12}
            md={4}>
            <TextField
              required
              label={t('email')}
              id='email'
              name='email'
              fullWidth
              value={user.email}
              type='email'
              onChange={(e) => {
                onChangeField('email', e.target.value);
              }}
              variant='outlined'
              error={errors?.email}
            />
            <ErrorMessage errorField={errors?.email} />
          </GridItem>
        </GridContainer>

        {!canEditPassword && (
          <GridContainer>
            <GridItem
              className={classes.projectManagerField}
              xs={12}
              sm={12}
              md={6}>
              <TextField
                required
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
            <GridItem
              className={classes.projectManagerField}
              xs={12}
              sm={12}
              md={6}>
              <TextField
                required
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
        )}
        <FieldsSelect
          initialFields={user.fields}
          updateFields={(newOptions) => {
            onChangeField('fields', newOptions);
          }}>
          {({ MajorField, Field }) => (
            <GridContainer>
              <GridItem
                className={classes.projectManagerField}
                xs={12}
                sm={12}
                md={4}>
                <MajorField />
              </GridItem>
              <GridItem
                className={classes.projectManagerField}
                xs={12}
                sm={12}
                md={4}>
                <Field />
              </GridItem>
              <GridItem
                className={classes.projectManagerField}
                xs={12}
                sm={12}
                md={4}>
                <DropdownSelectField
                  fieldId='country'
                  fieldName='country'
                  fieldOptions={countries}
                  fieldValue={!!user.country ? user.country : []}
                  onFieldChange={(option) => onChangeField('country', option)}
                  fieldLabel={t('Country')}
                />
              </GridItem>
            </GridContainer>
          )}
        </FieldsSelect>
      </CardBody>
      <CardFooter>
        <ActionButtonsContainer primaryButton={primaryButton} />
      </CardFooter>
    </Fragment>
  );
};

export default AddConsultantForm;
