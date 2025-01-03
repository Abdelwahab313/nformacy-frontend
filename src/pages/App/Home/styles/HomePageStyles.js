import { makeStyles } from '@material-ui/core';
import {
  lightOrange,
  grey,
  whiteLilac,
  darkBlue,
  white,
  black,
  darkOrange,
  mediumTurquoise,
} from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  mobileVisible: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  mobileVisibleAr:{
    [theme.breakpoints.down('md')]: {
      direction: 'ltr',
    },
  },
  desktopVisible: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  flexDesktopVisible: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },  
  },
  flexDesktopVisibleAr: {
    direction: 'ltr',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },  
  },
  card: {
    maxWidth: 345,
    margin: '0 auto 24px',
    borderRadius: 25,
    border: '1px solid #ecedf0',
    backgroundColor: whiteLilac,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  calendarCard: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      maxWidth: '100%',
    },
  },
  calendarCardForTablet: {
    display: 'none',
    marginTop: 60,
    marginBottom: 40,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  media: {
    height: 160,
    textAlign: 'center',
    lineHeight: '160px',
  },
  profileMobile: {
    marginTop: '-30px',
    zIndex: 99,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  profilePictureMobile: {
    width: 60,
    height: 60,
    verticalAlign: 'middle',
    borderRadius: '100%',
    marginBottom: theme.spacing(2),
  },
  orangeText: {
    color: lightOrange,
  },
  darkBlueText: {
    color: darkBlue,
  },
  darkBlueTextAr: {
    textAlign: 'end',
  },
  sectionSubTitle: {
    textAlign: 'initial',

  },
  sectionSubTitleAr: {
    textAlign: 'end',

  },
  darkBackground: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  cardContainer: {
    minHeight: 300,
    padding: theme.spacing(1),
  },
  calendarCardButton: {
    backgroundColor: 'transparent !important',
    color: '#202020 !important',
    textDecoration: 'underline',
  },
  gotToLibraryBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: [theme.spacing(2), theme.spacing(4)],
    border: '1px solid #fff',
    borderRadius: '16px',
  },
  clientHomeContainer: {
    maxWidth: 1440,
    [theme.breakpoints.up('sm')]: {
      padding: [theme.spacing(2), theme.spacing(4)],
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '100%',
    },
  },
  askQuestionBox: {
    padding: 10,
    backgroundColor: whiteLilac,
    borderRadius: 20,
    border: '1px solid #ecedf0',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0',
      borderRadius: 10,
    },
  },
  underline: {
    color: 'red',
  },
  askExpertInputField: {
    width: '100%',
  },
  proceedBtn: {
    marginTop: '12px',
    float: 'right',
    minHeight: theme.spacing(5),
    textTransform: 'capitalize',
    borderRadius: '11px',
    [theme.breakpoints.down('md')]: {
      textTransform: 'capitalize',
    },
  },
  askQuestionLink: {
    marginTop: theme.spacing(2),
    display: 'block',
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
  },
  askExpertContainer: {
    padding: [theme.spacing(4), theme.spacing(2)],
  },
  dividers: {
    margin: [theme.spacing(1), theme.spacing(0)],
  },
  writeQuestionBorder: {
    width: '35%',
    [theme.breakpoints.down('md')]: {
      width: '83%',
    },
  },
  pointsBox: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    textAlign: 'center',
  },
  displayDesktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  pointsContainer: {
    [theme.breakpoints.up('md')]: {
      height: 180,
    },
  },
  userLevelContainer: {
    [theme.breakpoints.up('md')]: {
      // height: 340,
      // overflow: 'auto',
    },
  },
  groupIcon: {
    width: '50px',
    filter: 'invert(100%)',
  },
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  chargeBtn: {
    backgroundColor: '#fff !important',
    color: '#125773 !important',
    textTransform: 'capitalize',
    height: theme.spacing(5),
  },
  clientImg: {
    float: 'right',
    width: 65,
    height: 131,
    [theme.breakpoints.down('md')]: {
      width: 15,
      height: 40,
      marginTop: theme.spacing(1),
    },
  },
  clientText: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  mobileServicesContainerPadding: {
    [theme.breakpoints.down('md')]: {
      padding: '4px !important',
    },
  },
  clientThreeBtns: {
    minWidth: '29.5%',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
      padding: '10px',
      fontSize: 'smaller',
    },
  },
  LandingClientThreeBtns: {
    minWidth: '29.5%',
    backgroundColor: darkBlue,
    color: white,
    padding: theme.spacing(4),
    transition: 'all 1s',
    '&:hover': {
      backgroundColor: white,
      color: black,
      transform: 'scale(1.2)',
    },
    [theme.breakpoints.down('md')]: {
      padding: '10px',
      fontSize: 'smaller',
      '&:hover $clientImg': {
        filter: 'invert(100%)',
      },
    },
  },
  threeBtnsContainer: {
    minHeight: 250,
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 160,
      maxHeight: 160,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  sectionContainer: {
    marginTop: theme.spacing(3),
  },
  startProcessBtn: {
    width: '75%',
    margin: '0px auto',
    marginTop: 50,
    [theme.breakpoints.down('md')]: {
      border: 'none',
      boxShadow: 'none !important',
      whiteSpace: 'nowrap',
      marginTop: 0,
      width: '60%',
      minHeight: 30,
    },
  },
  startProcessBtnPrimaryColor: {
    [theme.breakpoints.down('md')]: {
      color: 'rgb(18 87 115) !important',
      backgroundColor: 'transparent !important',
    },
  },
  largeProfilePic: {
    width: '100px',
    height: '100px',
    verticalAlign: 'middle',
    borderRadius: '100%',
  },
  feedsImg: {
    width: '60%',
    height: '100%',
    borderRadius: 12,
    float: 'right',
    maxHeight: 115,
    [theme.breakpoints.down('md')]: {
      float: 'left',
      width: '80%',
      maxHeight: 115,
    },
  },
  feedsDivider: {
    width: '100%',
    backgroundColor: '#eceded',
  },
  feedsSectionContainer: {
    margin: 15,
  },
  feedsTimelineContainer: {
    maxHeight: 490,
    margin: 0,
    overflowY: 'scroll',
    backgroundColor: whiteLilac,
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  feedsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      marginBottom: 15,
    },
  },
  feedsSubText: {
    color: '#202020',
    fontSize: 15,
    margin: '15px 0',
  },
  questionRoasterText: {
    fontSize: 15,
    margin: '15px 0',
  },
  feedsDate: {
    fontSize: 13,
    color: '#8b8a8a',
  },
  dot: {
    height: 3,
    width: 3,
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block',
  },
  feedsRightSide: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
      order: 1,
    },
  },
  feedsLeftSide: {
    [theme.breakpoints.down('md')]: {
      order: 2,
    },
  },
  headerCard: {
    position: 'relative',
    width: '100%',
  },
  headerCardImg: {
    height: 270,
    [theme.breakpoints.down('md')]: {
      height: 200,
    },
  },
  headerCardTxt: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      color: theme.palette.common.black,
      display: 'none',
    },
  },
  completeLaterBanner: {
    padding: 4,
    top: '65%',
    left: 0,
    color: black,
    right: 0,
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: '#ffff99',
    width: '40%',
    margin: '0 auto',
    fontWeight: 'bold',
    borderRadius: 6,
    cursor: 'pointer',
    display: 'table',
    [theme.breakpoints.down('md')]: {
      top: '30%',
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      top: '20%',
      width: '86%',
    },
  },
  regFormLink: {
    textDecoration: 'underline',
  },
  calendarLibraryContainer: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  calendarMobileBox: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: 'center',
    padding: '16px 0',
    borderRadius: 20,
  },
  goToLibraryMobileBox: {
    backgroundColor: '#ed7d31',
  },
  calendarMarginBottom: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  serviceDesc: {
    margin: 'revert',
    color: grey,
  },
  questionImg: {
    borderRadius: 12,
    height: 115,
    width: 115,
    [theme.breakpoints.down('md')]: {
      height: 80,
      width: 80,
    },
    [theme.breakpoints.down('xs')]: {
      height: 80,
      width: 60,
    },
  },
  mobileLandingServiceContainer: {
    padding: [4, 12],
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  solutionsPageServiceIcon: {
    margin: 'auto',
    height: '80%',
    [theme.breakpoints.down('md')]: {
      height: 140,
      margin: '24px auto',
    },
  },
  darkOrangeBG: {
    backgroundColor: darkOrange,
  },
  mediumTurquoiseBG: {
    backgroundColor: mediumTurquoise,
  },
  lightOrangeBG: {
    backgroundColor: lightOrange,
  },
  darkBlueBG: {
    backgroundColor: darkBlue,
  },
  flexClass: {
    display: 'flex',
  },
  imgContainerHeight: {
    minHeight: 440,
  },
  whiteCtaBtn: {
    background: `${white} !important`,
    color: `${darkBlue} !important`,
    textTransform: 'none',
    padding: theme.spacing(2),
    width: 240,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      width: 210,
    },
  },
  serviceDetailsBox: {
    backgroundColor: white,
    borderRadius: 20,
    border: '1px solid #ecedf0',
    minHeight: 440,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0',
      borderRadius: 10,
      minHeight: 'initial',
    },
  },
  BoxContainer: {
    display: 'flex',
    alignItems: 'baseline',
  },
  BoxContainerAr: {
direction: 'ltr'
  },
  flexDirectionBox: {
    flexDirection: 'row-reverse',
  },
  pointBullet: {
    width: 13,
    height: 13,
    margin: [0, theme.spacing(2)],
  },
  pointBulletMargin: {
    margin: [theme.spacing(2), 0],
  },
  mobileServicePadding: {
    padding: [theme.spacing(2), theme.spacing(1)],
  },
  reasonDetailsBox: {
    backgroundColor: white,
    borderRadius: 20,
    border: '1px solid #ecedf0',
    minHeight: 300,
    overflow: 'hidden',
    paddingRight: '25px',
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0',
      paddingRight: '0px',
      borderRadius: 10,
      minHeight: 'initial',
    },
  },
  reasonDetailsImgContainer: {
    height: 300,
  },
  reasonIcon: {
    margin: 'auto',
    height: 150,
    [theme.breakpoints.down('md')]: {
      height: 115,
      margin: '45px auto',
    },
  },
  fieldInProfile: {
    display: 'flex',
    justifyContent: 'center',
  },
  warningImgContainer: {
    background: white,
    width: 45,
    height: 55,
    verticalAlign: 'middle',
    display: 'table-cell',
  },
  warningImg: {
    width: 25,
  },
  warningMsg: {
    float: 'left',
  },
  completeLaterBannerText: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  pigIcon: {
    filter: 'invert(100%)',
  },
}));

export default useStyles;
