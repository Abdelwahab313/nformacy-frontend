import { makeStyles } from '@material-ui/core';
import { white, darkBlue, lightGrey } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  landingContainer: {
    maxWidth: 1440,
    margin: 'auto',
  },
  landingSectionsContainerPadding: {
    padding: theme.spacing(11),
  },
  mainCtaBtn: {
    marginTop: '12px',
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
    textTransform: 'capitalize',
    borderRadius: '11px',
  },
  floatRight: {
    float: 'right',
  },
  flexClass: {
    display: 'flex',
  },
  firstSectionImg: {
    width: '100%',
  },
  subTextMargin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  platformBrief: {
    marginTop: theme.spacing(20),
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  whiteCtaBtn: {
    background: `${white} !important`,
    color: `${darkBlue} !important`,
  },
  ourSolutionContainer: {
    background: lightGrey,
  },
}));

export default useStyles;
