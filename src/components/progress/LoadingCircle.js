import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as colors from '../../styles/colors';

const styles = {
  defaultColor: {
    color: colors.darkBlue,
  },
  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const useStyles = makeStyles(styles);

const LoadingCircle = ({ containerClass, ...restProps }) => {
  const classes = useStyles();
  return (
    <div
      className={containerClass ? containerClass : classes.progressContainer}>
      <CircularProgress className={classes.defaultColor} {...restProps} />
    </div>
  );
};

export default LoadingCircle;
