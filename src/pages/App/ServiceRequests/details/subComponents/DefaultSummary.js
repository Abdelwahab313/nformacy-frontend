import CustomTypography from 'components/typography/Typography';
import React from 'react';
import classNames from 'clsx';
import { getUserName } from 'core/user';
import useStyles from '../styles/ShortlistCandidate';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const DefaultSummary = ({ candidate }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <Box 
    className={classNames(classes.summaryPopupContainer, {
      [classes.summaryPopupContainerAr]: isArlang,
    })}
    >
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
