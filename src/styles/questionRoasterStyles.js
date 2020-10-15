import { makeStyles } from '@material-ui/core/styles';
import { darkBlue, darkGrey, grey, white } from './colors';
import bannerBackground from '../assets/banner2X.png';
import fontNames from '../constants/fonts';
import { hexToRgb } from '../assets/jss/material-dashboard-react';

const filterStyle = (theme) => ({
  cursor: 'default',
  [theme.breakpoints.down('sm')]: {
    margin: `0 8vw`,
  },
  padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3.5)}px`,
  },
  fontSize: '1.458vw',
  alignItems: 'center',
  display: 'flex',
  height: 'fit-content',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('xl')]: {
    fontSize: '1.172vw',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '1.367vw',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.142vw',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '3.125vw',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '4vw',
  },
});

export const useStyles = makeStyles((theme) => ({
  bannerStyles: {
    backgroundImage: `url(${bannerBackground})`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '35vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: white,
    [theme.breakpoints.down('xl')]: {
      fontSize: '1.172vw',
      height: '19.236vw',
    },
    [theme.breakpoints.down('md')]: {
      backgroundSize: 'cover',
    },
    [theme.breakpoints.down('sm')]: {
      height: '35vw',
    },
    [theme.breakpoints.down('xs')]: {
      height: '56vw',
    },
  },
  searchBarContainer: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '44.931vw',
    border: 'solid 1px' + white,
    borderRadius: '11px',
    maxHeight: '28.846vw',
    [theme.breakpoints.down('sm')]: {
      width: '72vw',
    },
    [theme.breakpoints.down('xs')]: {
      height: '10.667vw',
    },
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    fontFamily: fontNames.SF_COMPACT_TEXT_REGULAR,
    marginLeft: theme.spacing(1),
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  iconButton: {
    padding: 10,
  },
  searchGridStyles: {
    display: 'flex',
    justifyContent: 'center',
  },
  fieldNameFilterStyles: {
    border: 'solid 1px',
    height: '40px',
    margin: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1.190vw',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.00vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.604vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  questionsCategoriesContainerDesktop: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  questionsCategoriesContainerMobile: {
    display: 'flex',
    overflowX: 'scroll',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    backgroundColor: '#fafafa',
  },
  questionContainer: {
    marginTop: theme.spacing(2),
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexContainer: {
    display: 'flex',
  },
  questionFieldsStyles: {
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.190vw',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.00vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.604vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  questionFieldLabel: {
    marginRight: '10px',
    fontSize: '1.190vw',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.00vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.604vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  attachButtonStyle: {
    backgroundColor: darkBlue,
    color: white,
  },
  attachmentUploaderContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
  },
  pageHeaderStyle: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: darkBlue,
    color: white,
    marginBottom: theme.spacing(5),
    borderRadius: '5px',
  },
  headerTextStyles: {
    padding: theme.spacing(1),
  },
  bannerFontStyles: {
    fontSize: '3.125vw',
    color: white,
    fontFamily: fontNames.APERCU_PRO_MEDUIUM,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '5.600vw',
    },
  },
  activeFilterStyle: {
    backgroundColor: darkBlue,
    color: white,
    borderRadius: '9px',
    fontFamily: fontNames.SF_UI_BOLD,
    ...filterStyle(theme),
  },
  inactiveFilterStyle: {
    fontFamily: fontNames.SF_UI_LIGHT,
    color: 'rgba(' + hexToRgb(darkGrey) + ', 0.7)',
    ...filterStyle(theme),
  },
  dropdownDesktop: {
    margin: `0 ${theme.spacing(1)}px`,
    color: grey,
    fontSize: '1.042vw',
    [theme.breakpoints.up('xl')]: {
      fontSize: '0.980vw',
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.042vw',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.142vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
    backgroundColor: white,
    border: 'solid rgba(0,0,0,0.1)',
    borderWidth: '0.5px',
    borderRadius: '9px',
    [theme.breakpoints.down('md')]: {
      borderRadius: '5px',
    },
    height: '4.097vw',
    width: '14.236vw',
    fontFamily: fontNames.SF_UI_REGULAR,
    padding: theme.spacing(2),
    alignItems: 'center',
    display: 'flex',
    textTransform: 'capitalize',
  },
  dropdownMobile: {
    display: 'flex',
    justifyContent: 'center',
    color: 'black',
    fontSize: '1.142vw',
    backgroundColor: white,
    border: 'solid rgba(0,0,0,0.1)',
    borderWidth: '1px',
    borderRadius: '5px',
    fontFamily: `${fontNames.SF_UI_REGULAR} ${fontNames.TAJAWAL_BOLD}`,
    maxWidth: '55px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    openedDropdownMenu: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  menuItem: {
    height: '4.167vw',
    fontFamily: fontNames.SF_UI_REGULAR,
    letterSpacing: theme.spacing(0.065),
    fontSize: '1.042vw',
    [theme.breakpoints.up('xl')]: {
      fontSize: '0.980vw',
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.042vw',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.142vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
    color: darkGrey,
    '&:hover': {
      color: darkBlue,
      borderLeft: `solid 0.486vw` + darkBlue,
    },
  },
  filterWrapper: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
  nextIconSlider: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  nextIconSize: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '6.793vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '5.208vw',
    },
  },
  fieldsFiltersContainer: {
    display: 'flex',
    justifyContent: ' space-evenly',
    alignItems: 'center',
  },
  languageFilterContainer: {
    display: 'flex',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: '8px',
  },
  questionTextWrapper: {
    fontFamily: 'SF UI Display',
    paddingLeft: '2.083vw',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '15px',
    },
  },
  referenceNumberStyle: {
    fontFamily: fontNames.APERCU_PRO_MEDUIUM,
    color: darkBlue,
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      letterSpacing: 0,
      lineHeight: '30px',
    },
  },
  postDateStyle: {
    color: grey,
    fontFamily: 'Apercu Pro',
    fontSize: '1.042vw',
    lineHeight: '1.389vw',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'Apercu Pro',
      fontSize: '12px',
      lineHeight: '25px',
    },
  },
  threeDotButton: {
    borderRadius: '9px',
    background: 'rgba(0,0,0,0.03)',
    color: 'black',
  },
  questionTitle: {
    fontFamily: fontNames.APERCU_PRO_MEDUIUM,
    fontSize: '1.528vw',
    fontWeight: 'bold',
    lineHeight: '2.222vw',
    paddingTop: '16px',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'Apercu Pro',
      fontSize: '14px',
      fontWeight: 'bold',
      lineHeight: '24px',
    },
  },
  FieldChip: {
    marginLeft: '5px',
    marginRight: '5px',
    height: '28px',
    width: '109px',
    borderRadius: '25px',
    paddingTop: '16px',
    [theme.breakpoints.down('xs')]: {
      height: '24px',
      width: '80px',
    },
  },
  questionContentField: {
    color: grey,
    fontFamily: 'SF UI Display',
    fontSize: '1.181vw',
    fontWeight: '300',
    letterSpacing: '0.014vw',
    lineHeight: '2.083vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px',
      fontWeight: '300',
      letterSpacing: '0.15px',
      lineHeight: '23px',
    },
  },
  answerButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.389vw',
  },
  questionAssignmentTypeContainer:{
    display: 'flex',
    verticalAlign: 'baseline',
  },
  submitButton: {
    height: '4.028vw',
    width: '9.722vw',
    borderRadius: '0.625vw',
    fontFamily: fontNames.SF_UI_REGULAR,
    fontSize: '13px',
    lineHeight: '16px',
    [theme.breakpoints.down('xs')]: {
      height: '45px',
      width: '90px',
      borderRadius: '9px',
    },
  },
}));
export const attachButtonStyle = () => {
  return {
    backgroundColor: darkBlue,
    color: white,
    alignSelf: 'center',
    borderRadius: '4px',
    height: '36px',
    textTransform: 'uppercase',
  };
};

export const attachContainerStyle = () => {
  return {
    boxShadow: 'none',
    height: 'fit-content',
    padding: 0,
    margin: '0 10px 0 0',
  };
};
