import React from 'react';
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { Box } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';

const styles = {
  container: {
    margin: 5,
    position: 'relative',
  },
  blurContainer: {
    filter: 'blur(8px)',
    '-webkit-filter': 'blur(6px)',
  },
  comingSoonText: {},
  comingSoonContainer: {
    position: 'absolute',
    zIndex: '10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
  },
};

const useStyles = makeStyles(styles);

const ComingSoonWrapper = ({ children, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Box {...rest} className={classNames([classes.container, className])}>
      <Box className={classes.comingSoonContainer}>
        <CustomTypography
          variant={'h5'}
          fontWeight={'bold'}
          className={classes.comingSoonText}>
          Coming Soon
        </CustomTypography>
      </Box>
      <Box className={classes.blurContainer}>{children}</Box>
    </Box>
  );
};

export default ComingSoonWrapper;
