import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    marginBottom: theme.spacing(3),
    borderRadius: 25,
    border: '1px solid #ecedf0',
    backgroundColor: '#f9fafd',
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  media: {
    height: 160,
    textAlign: 'center',
    lineHeight: '160px'
  },
  clientHomeContainer: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3)
    },
  },
  askQuestionBox: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    marginTop: 0,
    backgroundColor: '#f9fafd',
    borderRadius: 20,
    border: '1px solid #ecedf0',
    [theme.breakpoints.down('md')]: {
      margin: '10px 0'
    },
  },
  underline: {
    color: 'red'
  },
  askExpertInputField: {
    width: '100%'
  },
  proceedBtn: {
    marginTop: '12px',
    width: '60%',
    float: 'right',
    textTransform: 'capitalize',
    borderRadius: '11px',
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
      textTransform: 'capitalize'
    },
  },
  askQuestionLink: {
    marginTop: theme.spacing(2),
    display: 'block',
    [theme.breakpoints.down('md')]: {
      fontSize: 15
    },
  },
  askExpertContainer: {
    padding: [theme.spacing(4), theme.spacing(2)]
  },
  dividers: {
    margin: [theme.spacing(1), theme.spacing(0)]
  },
  writeQuestionBorder: {
    width: '35%',
    [theme.breakpoints.down('md')]: {
      width: '83%'
    },
  },
  pointsBox: {
    backgroundColor: '#125773',
    color: '#fff',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  chargeBtn: {
    backgroundColor: '#fff !important',
    color: '#125773 !important',
    textTransform: 'capitalize'
  },
  clientImg: {
    float: 'right',
    [theme.breakpoints.down('md')]: {
      width: '60%'
    },
  },
  clientText: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  clientThreeBtns: {
    display: 'inline-flex',
    minWidth: '29.5%',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
      padding: '5px'
    },
  },
  threeBtnsContainer: {
    marginTop: theme.spacing(5),
    minHeight: 290,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between'
    },
  },
  startProcessBtn: {
    width: '75%',
    margin: '0px auto',
    marginTop: 50,
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'transparent !important',
      color: 'rgb(18 87 115) !important',
      border: 'none',
      boxShadow: 'none',
    },
  },
  largeProfilePic: {
    width: '100px',
    height: '100px',
    verticalAlign: 'middle',
    borderRadius: '100%',
  },
  feedsTimelineContainer: {
    backgroundColor: '#f9fafd',
  },
  feedsImg: {
    width: '60%',
    height: '100%',
    borderRadius: 12,
    float: 'right'
  },
  feedsDivider: {
    width: '100%',
    backgroundColor: '#eceded'
  },
  feedsSectionContainer: {
    margin: 15
  }
}));

export default useStyles;
