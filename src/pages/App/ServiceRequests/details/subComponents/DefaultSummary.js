import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { getUserName } from 'core/user';
import useStyles from '../styles/ShortlistCandidate';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const DefaultSummary = ({ candidate }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.summaryPopupContainer}>
      {!candidate?.summary || candidate?.summary?.length === 0 ? (
        <CustomTypography variant={'body1'}>
          {getUserName(candidate) +
            t('defaultSummary') +
            candidate?.industriesOfExperience?.map(
              (industry) => industry.label,
            ) }
        </CustomTypography>
      ) : (
        candidate.summary
      )}
    </Box>
  );
};

export default DefaultSummary;
