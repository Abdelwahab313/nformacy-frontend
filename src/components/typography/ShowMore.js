import Grid from '@material-ui/core/Grid';
import { ExpandLess, ExpandMore, ArrowForward, ArrowUpward } from '@material-ui/icons';
import ShowMoreText from 'react-show-more-text';
import React from 'react';
import useStyles from './styles/showMore';
import { useTranslation } from 'react-i18next';
import CustomTypography from './Typography';
import { Box } from '@material-ui/core';

const ShowLessComponent = ({ withTxt }) => {
  const classes = useStyles();

  return (
    <Box>
      {withTxt ? <LessTxt /> : <ArrowUpward className={classes.noTxtIcon} />}
    </Box>
  );
};

const ShowMoreComponent = ({ withTxt }) => {
  const classes = useStyles();
  return (
    <Box>
      {withTxt ? <MoreTxt /> : <ArrowForward className={classes.noTxtIcon} />}
    </Box>
  );
};

const MoreTxt = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction='row'>
      <CustomTypography variant='subtitle1'>{t('showMore')}</CustomTypography>
      <ExpandMore className={classes.icon} />
    </Grid>
  );
};
const LessTxt = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction='row'>
      <CustomTypography variant='subtitle1'>{t('showLess')}</CustomTypography>
      <ExpandLess className={classes.icon} />
    </Grid>
  );
};
const ShowMore = ({
  children,
  withTxt = true,
  numberOfLines,
  ...restProps
}) => {
  const classes = useStyles();
  const MAXIMUM_NUMBER_OF_LINES = numberOfLines || 2;
  return (
    <ShowMoreText
      lines={MAXIMUM_NUMBER_OF_LINES}
      anchorClass={classes.anchor}
      more={<ShowMoreComponent withTxt={withTxt} />}
      less={<ShowLessComponent withTxt={withTxt} />}
      {...restProps}>
      {children}
    </ShowMoreText>
  );
};

export default ShowMore;
