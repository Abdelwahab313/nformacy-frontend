import { makeStyles } from '@material-ui/core/styles';
import { black, darkBlue, grey, white } from './colors';
import bannerBackground from '../assets/banner2X.png';
import fontNames from '../constants/fonts';

const filterStyle = (theme) => ({
  [theme.breakpoints.down('sm')]: {
    margin: `0 8vw`,
  },
  cursor: 'default',
  padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  fontSize: '1.458vw',
  alignItems: 'center',
  display: 'flex',
  height: 'fit-content',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('xl')]: {
    fontSize: '1.302vw',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '1.367vw',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.953vw',
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
    height: '35vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: white,
    marginBottom: theme.spacing(3),
  },
  searchBarContainer: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '44.931vw',
    border: 'solid 1px' + darkBlue,
    borderRadius: '11px',
    maxHeight: '52px',
    [theme.breakpoints.down('sm')]: {
      width: '72vw',
    },
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
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
    marginTop: theme.spacing(3),
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
  answerButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  assignmentTypeIcon: {
    fontSize: '50px',
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
    marginBottom: '38px',
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
    color: grey,
    ...filterStyle(theme),
  },
  dropdownDesktop: {
    margin: `0 ${theme.spacing(1)}px`,
    color: black,
    fontSize: '1.042vw',
    backgroundColor: white,
    border: 'solid rgba(0,0,0,0.1)',
    borderWidth: '0.5px',
    borderRadius: '9px',
    [theme.breakpoints.down('md')]: {
      borderRadius: '5px',
    },
    height: '4.097vw',
    width: '14.306vw',
    fontFamily: 'SF UI Display',
    padding: theme.spacing(2),
    alignItems: 'center',
    display: 'flex',
    textTransform: 'capitalize',
  },
  dropdownMobile: {
    display: 'flex',
    justifyContent: 'center',
    color: black,
    fontSize: '1.042vw',
    backgroundColor: white,
    border: 'solid rgba(0,0,0,0.1)',
    borderWidth: '1px',
    borderRadius: '5px',
    fontFamily: 'SF UI Display',
    maxWidth: '55px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
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
    justifyContent:' space-evenly',
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
    paddingLeft: '2.083vw',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '15px',
    },
  },
  referenceNumberStyle: {
    color: darkBlue,
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'Apercu Pro',
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
      letterSpacing: 0,
      lineHeight: '25px',
    },
  },
  questionTitle: {
    fontFamily: 'Apercu Pro',
    fontSize: '1.528vw',
    fontWeight: 'bold',
    lineHeight: '2.222vw',
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
    [theme.breakpoints.down('xs')]: {
      height: '24px',
      width: '80px',
      borderRadius: '25px',
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
  assignmentTypeIcon: {
    fontSize: '35px',
  },
  submitButton: {
    height: '4.028vw',
    width: '9.722vw',
    borderRadius: '0.625vw',
    fontFamily: 'SF UI Display',
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
