import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import classNames from 'clsx';
import { useTranslation } from 'react-i18next';
import { saveButtonStyle, useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';
import { updateUser } from '../../pages/auth/context/authActions';
import { useAuth } from '../../pages/auth/context/auth';
import UserPrevProject from './UserPrevProject';

const UserPrevProjectForm = ({ user, closeDialog }) => {
  const formMethods = useForm({
    defaultValues: { ...user.current },
  });
  const [, dispatch] = useAuth();
  const [deletedProjects, setDeletedProjects] = useState([]);
  const classes = useStyles();

  const onSubmitResume = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
      prevProjects: !!userData.prevProjects
        ? [...userData.prevProjects, ...deletedProjects]
        : deletedProjects,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        updateUser(dispatch, response.data);
      })
      .catch(() => {
      });
    user.current = {
      ...user.current,
      prevProjects: [],
      ...userData,
    };
    closeDialog();
  };
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <FormContext
      user={user}
      {...formMethods}
      setDeletedProjects={setDeletedProjects}>
      <form
        id='editProfileForm'
        className={classNames(classes.nestedForm, {
          [classes.nestedFormAr]: isArlang,
        })}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmitResume)}>
        <UserPrevProject />
        <Button
          id='saveResume'
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

export default UserPrevProjectForm;
