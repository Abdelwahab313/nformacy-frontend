import WorkExperience from './WorkExperience';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import classNames from 'clsx';
import { useTranslation } from 'react-i18next';
import { saveButtonStyle, useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';
import { updateUser } from '../../pages/auth/context/authActions';
import { useAuth } from '../../pages/auth/context/auth';

const WorkExperienceForm = ({ user, closeDialog }) => {
  const formMethods = useForm({
    defaultValues: { ...user.current },
  });
  const [, dispatch] = useAuth();
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  const onSubmitResume = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
      experiences: !!userData.experiences
        ? [...userData.experiences, ...deletedExperiences]
        : deletedExperiences,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        updateUser(dispatch, response.data);
      })
      .catch(() => {
      });
    user.current = {
      ...user.current,
      experiences: [],
      ...userData,
    };
    closeDialog();
  };

  return (
    <FormContext
      user={user}
      {...formMethods}
      setDeletedExperiences={setDeletedExperiences}>
      <form
        id='editProfileForm'
        className={classNames(classes.nestedForm, {
          [classes.nestedFormAr]: isArlang,
        })}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmitResume)}>
        <WorkExperience/>
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

export default WorkExperienceForm;
