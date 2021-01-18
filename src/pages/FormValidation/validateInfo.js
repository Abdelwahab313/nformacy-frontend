
const validateResetPasswordForm = (values) => {
  let errors = {};

  if (!values.password) {
    errors.password = 'Password is Required!';
  } else if (values.password.length < 6) {
    errors.password = 'Password need to be 6 characers or more!';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Password is Required!';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords don\'t match!';
  }

  return errors;
};

const validateForgetPasswordForm = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = 'Email is Required!';
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
    errors.email = 'Invalid Email!';
  }

  return errors;

}

export {validateResetPasswordForm, validateForgetPasswordForm };