import { makeStyles } from '@material-ui/core';
import { white, darkBlue, lighterGrey, lightOrange } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  landingContainer: {
    maxWidth: 1440,
    margin: 'auto',
  },
  landingSectionsContainerPadding: {
    padding: theme.spacing(11),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
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
  orangeCtaBtn: {
    background: `${lightOrange} !important`,
    color: `${white} !important`,
  },
  lighterGrayContainer: {
    background: lighterGrey,
  },
  stepsContainerMargin: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  workMainTextPadding: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  workSubTextPadding: {
    padding: ['2px', theme.spacing(1)],
  },
  howWorkIcon: {
    height: 65,
  },
  specialityFieldPadding: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  relativeBox: {
    position: 'relative',
    width: '31%',
    marginBottom: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  specialityField: {
    background: white,
    borderRadius: '11px',
    marginTop: theme.spacing(4),
    height: 250,
    overflow: 'hidden',
    transition: 'all 1s',
    '&:hover': {
      transform: 'scale(1.2)',
      height: 'fit-content',
      position: 'absolute',
      zIndex: 2,
      left: 0,
      right: 0,
      margin: 'auto',
    },
  },
  promiseField: {
    background: white,
    borderRadius: '11px',
    marginTop: theme.spacing(4),
    maxWidth: '31%',
  },
  itemBullet: {
    minWidth: 20,
  },
  circleDot: {
    width: 12,
  },
  itemText: {
    padding: 0,
    alignItems: 'flex-start',
  },
  noMarginTop: {
    marginTop: 0,
  },
  orangeMainText: {
    color: lightOrange,
    padding: [0, theme.spacing(2)],
    textAlign: 'center',
  },
  fitContent: {
    height: 'fit-content',
  },
  primaryBoldTxt: {
    color: darkBlue,
    fontWeight: 'bold',
  },
  desktopVisible: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export default useStyles;
