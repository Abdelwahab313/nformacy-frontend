import React from 'react';
import SubmitButton from 'components/buttons/SubmitButton';
import Collapse from '@material-ui/core/Collapse';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { getUserName } from 'core/user';
import { Box, Grid } from '@material-ui/core';
import useStyles from '../styles/ShortlistCandidate';
import authManager from 'services/authManager';

const CandidateItem = ({
  candidate,
  isFocused,
  setFocusedCandidate,
  onCandidateClick,
  bgcolor,
  buttonText,
  clientType = ''
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isAdmin = authManager.isAdmin();
  const defaultImage = require('../../../../../assets/emptyavatar.jpg');

  return (
    <div className={classes.candidateContainerBorder}>
      <Collapse in={isFocused} collapsedHeight={350} timeout={500}>
        <Grid
          container
          justify='center'
          onMouseEnter={() => setFocusedCandidate(candidate.id)}
          onMouseLeave={() => setFocusedCandidate('')}>
          <Box
            style={{ backgroundColor: bgcolor }}
            textAlign='center'
            width={1}>
            <Grid item xs={12} md={12}>
              <img
                src={!!candidate.avatar ? candidate.avatar : defaultImage}
                className={classes.candidateImg}
              />
            </Grid>
          </Box>
          <Box p={2} textAlign='center'>
            <Grid item xs={12}>
              <CustomTypography variant='h6' fontWeight='bold'>
                {getUserName(candidate)}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={classes.candidateDesc}>
                {candidate.summary}
              </CustomTypography>
            </Grid>
            <Grid container justify='center' xs={12}>
              {isFocused && !isAdmin && (
                <SubmitButton
                  id={'proceedBtn'}
                  className={classes.desktopVisible}
                  onClick={() => onCandidateClick()}
                  buttonText={
                    <CustomTypography variant='body1'>
                      {buttonText ? buttonText : t('bookCandidate')}
                    </CustomTypography>
                  }
                />
              )}
              {
                !isAdmin && (
                  <SubmitButton
                    id={'proceedBtn'}
                    className={classes.mobileVisible}
                    onClick={() => onCandidateClick()}
                    buttonText={
                      <CustomTypography variant='body1'>
                        {buttonText ? buttonText : t('bookCandidate')}
                      </CustomTypography>
                    }
                  />
                )
              }
            </Grid>
            <Grid item xs={12}>
              {!!isAdmin && (
                <CustomTypography>{clientType}</CustomTypography>
              )}
            </Grid>
          </Box>
        </Grid>
      </Collapse>
    </div>
  );
};

export default CandidateItem;