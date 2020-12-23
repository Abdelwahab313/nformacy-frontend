import Grid from '@material-ui/core/Grid';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ShowMoreText from 'react-show-more-text';
import React from 'react';
import useStyles from './styles/showMore';
import { useTranslation } from 'react-i18next';
import CustomTypography from './Typography';

const ShowLessComponent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction='row'>
      <CustomTypography variant='body1'>{t('showLess')}</CustomTypography>
      <ExpandLess className={classes.icon} />
    </Grid>
  );
};

const ShowMoreComponent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction='row'>
      <CustomTypography variant='subtitle1'>{t('showMore')}</CustomTypography>
      <ExpandMore className={classes.icon} />
    </Grid>
  );
};

const ShowMore = ({ children, numberOfLines, ...restProps }) => {
  const classes = useStyles();
  const MAXIMUM_NUMBER_OF_LINES = numberOfLines || 2;

  return (
    <ShowMoreText
      lines={MAXIMUM_NUMBER_OF_LINES}
      anchorClass={classes.anchor}
      more={<ShowMoreComponent />}
      less={<ShowLessComponent />}
      {...restProps}>
      {children}
    </ShowMoreText>
  );
};

export default ShowMore;
