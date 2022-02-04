
const validateResetPasswordForm = (values) => {
  let errors = {};

  if (!values.password) {
    errors.password = 'requiredPassword';
  } else if (values.password.length < 6) {
    errors.password = 'invalidPasswordError';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'requiredPassword';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'passwordsNotMatching';
  }

  return errors;
};

const validateForgetPasswordForm = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = 'requiredEmail';
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
    errors.email = 'invalidEmail';
  }
  return errors;
};

const validateChangePasswordForm = (values) => {
  let errors = {};
  if (!values.currentPassword) {
    errors.currentPassword = 'currentPasswordRequired';
  }
  if (!values.newPassword) {
    errors.newPassword = 'newPasswordRequired';
  }
  if (values.currentPassword === values.newPassword) {
    errors.newPassword = 'newAndOldPassword';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'confirmPasswordRequired';
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'passwordsNotMatching';
  }
  return errors;
};

export { validateResetPasswordForm, validateForgetPasswordForm, validateChangePasswordForm };