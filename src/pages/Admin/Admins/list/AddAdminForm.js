import React, { Fragment, useState } from 'react';
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

const AddAdminForm = ({ viewOnly, primaryButton }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [user, setUser] = useState('');
  const onChangeField = (name, value) => {
    setUser((prevData) => ({ ...prevData, [name]: value }));
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
          <GridItem xs={12} sm={12} md={3}>
            <TextField
              label={t('firstname')}
              id='firstname'
              name='firstname'
              fullWidth
              value={user.firstname}
              onChange={e => setUser(e.target.value)}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <TextField
              label={t('lastname')}
              id='lastname'
              name='lastname'
              fullWidth
              value={user.lastname}
              onChange={e => setUser(e.target.value)}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <TextField
              label={t('email')}
              id='email'
              name='email'
              fullWidth
              value={user.email}
              onChange={e => setUser(e.target.value)}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <TextField
              label={t('password')}
              id='password'
              name='password'
              fullWidth
              value={user.password}
              onChange={e => setUser(e.target.value)}
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
