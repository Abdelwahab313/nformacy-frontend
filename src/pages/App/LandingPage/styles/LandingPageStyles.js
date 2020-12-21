import { makeStyles } from '@material-ui/core';
// import { lightOrange, grey, whiteLilac } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  landingContainer: {
    maxWidth: 1440,
    margin: 'auto',
  },
  mainCtaBtn: {
    marginTop: '12px',
    padding:`${theme.spacing(2)}px ${theme.spacing(5)}px`,
    float: 'right',
    textTransform: 'capitalize',
    borderRadius: '11px',
  },
  firstSectionImg: {
    width: '100%',
  },
}));

export default useStyles;
