import { makeStyles } from '@material-ui/core';
import { white, darkBlue, lighterGrey, lightOrange } from 'styles/colors';

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
    padding: theme.spacing(1),
  },
  howWorkIcon: {
    height: 65,
  },
  specialityFieldPadding: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  specialityField: {
    background: white,
    borderRadius: '11px',
    maxWidth: '31%',
    marginTop: theme.spacing(4),
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
    padding: theme.spacing(2),
  },
  fitContent: {
    height: 'fit-content',
  },
}));

export default useStyles;
