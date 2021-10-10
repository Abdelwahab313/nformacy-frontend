import { makeStyles } from '@material-ui/core/styles';
import { darkBlue, darkGrey, grey, white } from './colors';
import bannerBackground from '../assets/banner2X.png';
import fontNames from '../constants/fonts';
import { hexToRgb } from '../assets/jss/material-dashboard-react';

const ITEM_HEIGHT = 48;

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
    fontSize: '2.142vw',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '3.125vw',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '4vw',
  },
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  KhtmlUserSelect: 'none',
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
  mainContainer: {
    padding: theme.spacing(3),
    margin: `${theme.spacing(2)}px 0`,
    backgroundColor: '#fafafa',
    borderRadius: '2vw',
  },
  questionContainer: {
    marginTop: theme.spacing(2),
  },
  fieldContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  flexContainer: {
    display: 'flex',
  },
  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
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
  menu: {
    borderRadius: '9px',
    padding: '15px 5px',
    minWidth: '13.5%',
  },
  threeDotsMenu: {
    borderRadius: '9px',
    padding: '15px 5px',
    maxHeight: ITEM_HEIGHT * 4.5,
    width: 'fit-content',
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
  selectedMenuItem: {
    color: darkBlue,
    background: 'rgba(0,0,0,0.03)',
    borderLeft: `solid 0.486vw` + darkBlue,
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
  imgContainer: {
    display: 'flex',
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    borderRadius: '8px',
  },
  questionTextWrapper: {
    fontFamily: 'SF UI Display',
    padding: '0 2.083vw',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '4vw',
    },
  },
  referenceNumberStyle: {
    fontFamily: fontNames.APERCU_PRO_MEDUIUM,
    color: darkBlue,
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
      letterSpacing: 0,
      lineHeight: '30px',
    },
  },
  postDateStyle: {
    color: grey,
    fontFamily: 'Apercu Pro',
    fontSize: '1.042vw',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'Apercu Pro',
      fontSize: '3.200vw',
      paddingLeft: '5vw',
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
    paddingTop: '1.111vw',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'Apercu Pro',
      fontSize: '3.733vw',
      fontWeight: 'bold',
      lineHeight: '6.400vw',
    },
  },
  fieldChip: {
    marginLeft: '5px',
    marginRight: '5px',
    marginTop: '5px',
    fontSize: '3vw',
    borderRadius: '25px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  fieldChipText: {
    color: theme.palette.common.white,
  },
  questionContentField: {
    color: grey,
    paddingTop: '1.111vw',
    fontFamily: 'SF UI Display',
    fontSize: '1.181vw',
    fontWeight: '300',
    letterSpacing: '0.014vw',
    lineHeight: '2.083vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '3.467vw',
      fontWeight: '300',
      letterSpacing: '0.15px',
      lineHeight: '6.133vw',
    },
  },
  buttonMargin: {
    marginRight: '10px',
  },
  answerButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.389vw',
  },
  answerButtons: {
    padding: '1.4vw',
    maxHeight: '2.500vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 11,
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: '9.600vw',
      padding: '10vw',
    },
  },
  questionAssignmentTypeContainer: {
    display: 'flex',
    verticalAlign: 'baseline',
  },
  assignmentTypeIcon: {
    width: '2vw',
    height: 'fit-content',
    [theme.breakpoints.down('xs')]: {
      width: '5vw',
    },
  },
  submitButton: {
    height: '4vw',
    width: '9vw',
    borderRadius: '0.625vw',
    fontFamily: fontNames.SF_UI_REGULAR,
    fontSize: '1vw',
    lineHeight: '1.111vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '3vw',
      height: '12vw',
      width: '24vw',
      borderRadius: '9px',
    },
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  closedQuestion: {
    margin: 'auto',
    fontSize: '1.15vw',
    fontFamily: fontNames.APERCU_PRO_MEDUIUM,
    [theme.breakpoints.down('xs')]: {
      fontSize: '3vw',
    },
  },
  answerContainer: { marginTop: '10px' },
  primaryBoarder: { border: `solid 1px ${darkBlue}` },
  richEditorMargin: { margin: '30px 0' },
  containerStart: { justifyContent: 'flex-start', padding: theme.spacing(1) },
  containerEnd: {
    display: 'flex',
    padding: theme.spacing(1),
    justifyContent: 'flex-end',
  },
  answerSaveButton: {
    marginRight: '10px',
  },
  viewAnswerBtn: {
    [theme.breakpoints.down('xs')]: {
      lineHeight: 'normal',
    },
  },
}));

export const attachContainerStyle = () => {
  return {
    boxShadow: 'none',
    height: 'fit-content',
    padding: 0,
    margin: '0 10px 0 0',
  };
};
