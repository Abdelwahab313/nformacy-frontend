import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  circleRate: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid #000',
  }
}));

export default useStyles;
