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
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
};

const useStyles = makeStyles(styles);

const LoadingCircle = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.progressContainer}>
      <CircularProgress className={classes.defaultColor} {...props} />
    </div>
  );
};

export default LoadingCircle;
