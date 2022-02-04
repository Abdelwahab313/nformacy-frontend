import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import classNames from 'clsx';
import { FormContext, useForm } from 'react-hook-form';
import { updateProfile, updateProfilePicture } from '../../../apis/userAPI';
import { saveButtonStyle, useStyles } from '../../../styles/formsStyles';
import { updateUser } from '../../../pages/auth/context/authActions';
import { useAuth } from '../../../pages/auth/context/auth';
import ClientPersonalInfoDialog from '../ClientPersonalInfoDialog';

const ClientProfilePersonalInfoForm = ({ user, closeDialog }) => {
  const formMethod = useForm({
    defaultValues: { ...user.current },
  });
  const [avatar, setAvatar] = useState([]);
  const [, dispatch] = useAuth();

  const classes = useStyles();
  const onSubmitBasicInfo = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        updateUser(dispatch, response.data);
      });
    if (avatar.length > 0) {
      const file = new Blob(avatar);
      const formData = new FormData();
      formData.append('avatar', file, avatar[0].name);

      updateProfilePicture(formData, user.current.id)
        .then((response) => {
          updateUser(dispatch, response.data);
        });
    }
    user.current = { ...user.current, ...userData };
    closeDialog();
  };
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  return (
    <FormContext user={user} setAvatar={setAvatar} {...formMethod}>
      <form
        id='editBasicInfoForm'
        className={classNames(classes.nestedForm, {
          [classes.nestedFormAr]: isArlang,
        })}
        noValidate
        onSubmit={formMethod.handleSubmit(onSubmitBasicInfo)}>
        <ClientPersonalInfoDialog />
        <Button
          id='saveBasicInfo'
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

export default ClientProfilePersonalInfoForm;
