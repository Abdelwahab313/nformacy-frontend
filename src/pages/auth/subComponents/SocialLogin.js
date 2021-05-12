import React from 'react';
import { Box } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import { API_BASE_URL } from 'settings';
import { useStyles } from 'styles/formsStyles';

const SocialLogin = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box mt={2} width={'100%'}>
      <CustomTypography align={'center'} variant='body2'>
        {t('socialLoginTitle')}
      </CustomTypography>
      <div className={classes.socialLoginContainer}>
        <a
          id='google-login'
          href={`${API_BASE_URL}/auth/google_oauth2`}
          className={classes.socialLoginButton}>
          <FaGoogle />
        </a>
        <a
          id='linkedin-login'
          href={`${API_BASE_URL}/auth/linkedin`}
          className={classes.socialLoginButton}>
          <FaLinkedin />
        </a>
      </div>
    </Box>
  );
};

export default SocialLogin;
