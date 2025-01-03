import Grid from '@material-ui/core/Grid';
import classNames from 'clsx';
import { ExpandLess, ExpandMore, ArrowForward, ArrowUpward } from '@material-ui/icons';
import ShowMoreText from 'react-show-more-text';
import React from 'react';
import useStyles from './styles/showMore';
import { useTranslation } from 'react-i18next';
import CustomTypography from './Typography';
import { Box } from '@material-ui/core';



const ShowLessComponent = ({ withTxt }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';


  return (
    <Box> 
      {withTxt ? <LessTxt /> : <div className={classNames(classes.showLessText, {
      [classes.showLessTextAr]: isArlang,
    })}> {t('showLess')}<ArrowUpward className={classes.ArrowUpward} /></div>}

    </Box>
  );
};

const ShowMoreComponent = ({ withTxt }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';



  return (
    <Box>
      {withTxt ? <MoreTxt /> : <Box 
       className={classNames(classes.learnMore, {
        [classes.learnMoreAr]: isArlang,
      })}
     > {t('showMore')}<ArrowForward className={classNames(classes.noTxtIcon, {
      [classes.noTxtIconAr]: isArlang,
    })} /></Box>}

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
  const MAXIMUM_NUMBER_OF_LINES = numberOfLines || 1;
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
