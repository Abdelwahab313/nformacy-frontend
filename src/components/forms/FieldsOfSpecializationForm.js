import FieldsOfSpecialization from './FieldsOfSpecialization';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import React from 'react';
import classNames from 'clsx';
import { useTranslation } from 'react-i18next';
import { saveButtonStyle, useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';
import { updateUser } from '../../pages/auth/context/authActions';
import { useAuth } from '../../pages/auth/context/auth';

const FieldsOfSpecializationForm = ({
  user,
  fields,
  updateFields,
  closeDialog,
}) => {
  const formMethods = useForm({
    defaultValues: { ...user.current, fields },
  });
  const classes = useStyles();
  const [, dispatch] = useAuth();

  const onSubmitFieldsOfSpecialization = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
    };
    updateProfile(userToBeSubmitted, user.current.id).then((response) => {
      updateUser(dispatch, response.data);
    });
    user.current = { ...user.current, ...userData };
    updateFields();
    closeDialog();
  };
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <FormContext user={user} {...formMethods}>
      <form
        id='editProfileForm'
        className={classNames(classes.nestedForm, {
          [classes.nestedFormAr]: isArlang,
        })}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmitFieldsOfSpecialization)}>
        <FieldsOfSpecialization />
        <Button
          id='saveFieldsOfSpecialization'
          type='submit'
          variant='contained'
          color='primary'
          style={saveButtonStyle()}>
          {t('save')}
        </Button>
      </form>
    </FormContext>
  );
};

export default FieldsOfSpecializationForm;
