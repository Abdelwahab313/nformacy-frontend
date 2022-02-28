import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'clsx';
import PersonalInfo from './PersonalInfo';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import { saveButtonStyle, useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';
import { updateUser } from '../../pages/auth/context/authActions';
import { useAuth } from '../../pages/auth/context/auth';

const PersonalInfoForm = ({ user, closeDialog }) => {
  const formMethods = useForm({
    defaultValues: { ...user.current },
  });
  const [, dispatch] = useAuth();
  const classes = useStyles();

  const onSubmitPersonalInfo = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        updateUser(dispatch, response.data);
      })
      .catch(() => {});
    user.current = { ...user.current, ...userData };
    closeDialog();
  };
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <FormContext user={user} {...formMethods}>
      <form
        id='personalInfoForm'
        className={classNames(classes.nestedForm, {
          [classes.nestedFormAr]: isArlang,
        })}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmitPersonalInfo)}>
        <PersonalInfo />
        <Button
          id='savePersonalInfo'
          type='submit'
          variant='contained'
          style={saveButtonStyle()}
          color='primary'>
           {t('save')}
        </Button>
      </form>
    </FormContext>
  );
};

export default PersonalInfoForm;
