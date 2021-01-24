import { makeStyles } from '@material-ui/core';
import {
  white,
  darkBlue,
  darkOrange,
  lighterGrey,
  lightOrange,
  whiteLilac,
  mediumTurquoise,
} from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  landingContainer: {
    maxWidth: 1440,
    margin: 'auto',
  },
  landingSectionsContainerPadding: {
    padding: theme.spacing(11),
    [theme.breakpoints.down('md')]: {
      padding: [theme.spacing(6), theme.spacing(2)],
    },
  },
  serveYouPadding: {
    padding: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      padding: [theme.spacing(3), theme.spacing(1)],
    },
  },
  rollerSection: {
    order: 1,
    [theme.breakpoints.down('md')]: {
      order: 2,
      textAlign: 'center',
    },
  },
  imgSection: {
    order: 2,
    [theme.breakpoints.down('md')]: {
      order: 1,
    },
  },
  ctaSection: {
    order: 3,
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
    order: 4,
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(15),
    },
  },
  whiteCtaBtn: {
    background: `${white} !important`,
    color: `${darkBlue} !important`,
    textTransform: 'none',
  },
  orangeCtaBtn: {
    background: `${lightOrange} !important`,
    color: `${white} !important`,
  },
  lighterGrayContainer: {
    background: whiteLilac,
  },
  stepsContainerMargin: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  workMainTextPadding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  MobileWorkMainTextPadding: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  mobileFirstStep: {
    marginLeft: '-60px',
  },
  mobileSecondStep: {
    marginLeft: '-30px',
  },
  workSubTextPadding: {
    padding: ['2px', theme.spacing(1)],
    textAlign: 'justify',
  },
  howWorkIcon: {
    height: 65,
  },
  MobileHowWorkIcon: {
    height: 30,
  },
  mobileStep: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 30,
    background: lighterGrey,
    padding: [theme.spacing(1), theme.spacing(2)],
    width: 200,
    marginBottom: theme.spacing(2),
    textAlign: 'left',
  },
  specialityFieldPadding: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  relativeBox: {
    position: 'relative',
    width: '31%',
    // marginBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      width: '48%',
      //   marginBottom: 0,
    },
  },
  specialityField: {
    background: white,
    borderRadius: '11px',
    marginTop: theme.spacing(4),
    height: 178,
    overflow: 'hidden',
    transition: 'all 0.5s ease-out',
    '&:hover': {
      transform: 'scale(1.2)',
      height: 'fit-content',
      position: 'absolute',
      zIndex: 2,
      left: 0,
      right: 0,
      marginTop: -20,
      transition: 'all 0.5s ease-in',
    },
    [theme.breakpoints.down('md')]: {
      '&:hover': {
        height: 178,
        transform: 'none',
        position: 'initial',
        marginTop: theme.spacing(4),
      },
    },
  },
  promiseField: {
    background: white,
    borderRadius: '11px',
    marginTop: theme.spacing(4),
    maxWidth: '31%',
    [theme.breakpoints.down('md')]: {
      maxWidth: 'initial',
      margin: '16px auto',
    },
  },
  promiseFieldDescTxt: {
    textAlign: 'justify',
    padding: [theme.spacing(1), theme.spacing(2)],
    fontWeight: 300,
    lineHeight: 1.7,
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
    minHeight: 230,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      minHeight: 'initial',
      paddingBottom: theme.spacing(2),
    },
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
  mobileVisible: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  mobileHowWorkVisible: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  headerCommunitySectionOrder: {
    order: 1,
  },
  leftMapCommunitySectionOrder: {
    order: 2,
  },
  rightMapCommunitySectionOrder: {
    order: 4,
    [theme.breakpoints.down('md')]: {
      order: 3,
    },
  },
  betweenMapCommunitySectionOrder: {
    order: 3,
    [theme.breakpoints.down('md')]: {
      order: 4,
    },
  },
  golbalSectionDivider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  tileItem: {
    width: '33% !important',
    padding: '0px !important',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      width: '50% !important',
      height: '250px !important',
    },
  },
  tileBarContainer: {
    height: 60,
    alignItems: 'end',
    transition: 'height 0.5s ease-out',
    overflow: 'hidden',
    '&:hover': {
      height: '100%',
      transition: 'height 0.5s ease-in',
    },
  },
  tileSubTitleTxt: {
    whiteSpace: 'normal',
  },
  tileIcon: {
    color: white,
  },
  tileSpacing: {
    paddingTop: 4,
  },
  ourValuesIconContainer: {
    width: 70,
    height: 70,
    display: 'flex',
    margin: 'auto',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightOrangeBG: {
    background: lightOrange,
  },
  darkBlueBG: {
    background: darkBlue,
  },
  mediumTurquoiseBG: {
    background: mediumTurquoise,
  },
  darkOrangeBG: {
    background: darkOrange,
  },
  ourValueItem: {
    border: '1px solid #ecedf0',
    borderRadius: 20,
    backgroundColor: white,
    padding: [theme.spacing(5), theme.spacing(2)],
    margin: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
}));

export default useStyles;
