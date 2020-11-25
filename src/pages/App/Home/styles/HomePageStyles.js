import { makeStyles } from '@material-ui/core';
import { lightOrange, grey } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  mobileVisible: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  desktopVisible: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  card: {
    maxWidth: 345,
    margin: '0 auto 24px',
    borderRadius: 25,
    border: '1px solid #ecedf0',
    backgroundColor: '#f9fafd',
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
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
  darkBackground: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  cardContainer: {
    minHeight: 300,
    padding: theme.spacing(1),
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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  askQuestionBox: {
    padding: theme.spacing(3),
    // margin: 20,
    backgroundColor: '#f9fafd',
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
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  pointsContainer: {
    [theme.breakpoints.up('md')]: {
      height: 180,
    },
  },
  walletIcon: {
    width: '50px',
  },
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  chargeBtn: {
    backgroundColor: '#fff !important',
    color: '#125773 !important',
    textTransform: 'capitalize',
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
  clientThreeBtns: {
    minWidth: '29.5%',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
      padding: '10px',
      fontSize: 'smaller',
    },
  },
  threeBtnsContainer: {
    minHeight: 310,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
      display: 'flex',
      minHeight: 160,
      maxHeight: 160,
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
      backgroundColor: 'transparent !important',
      color: 'rgb(18 87 115) !important',
      border: 'none',
      boxShadow: 'none !important',
      whiteSpace: 'nowrap',
      marginTop: 0,
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
    backgroundColor: '#f9fafd',
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
    [theme.breakpoints.down('md')]: {
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
      height: 115,
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
}));

export default useStyles;
