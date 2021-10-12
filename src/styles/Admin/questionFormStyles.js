import { makeStyles } from '@material-ui/core/styles';
import { overlayColor, white } from 'styles/colors';

export const useStyles = makeStyles((theme) => ({
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    marginBottom: '3px',
    textDecoration: 'none',
  },
  footerButtons: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  saveQuestionBtn: {
    flexBasis: '100%',
    textAlign: 'right',
    marginTop: 20,
    maxWidth: '100%',
  },
  buttonMargin: {
    marginRight: '10px',
  },
  inputsRow: {
    marginTop: theme.spacing(4),
  },
  projectManagerField: { marginTop: 20 },
  countDown: {
    marginLeft: theme.spacing(2),
  },
  countDownText: {
    fontSize: '1vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  rollbackQuestion: {
    fontSize: '11px',
    margin: [theme.spacing(1), theme.spacing(2)],
  },
  currentActionTime: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  attachmentContainer: {
    justifyContent: 'flex-start',
    marginTop: '1.389vw',
  },
  contentTitle: {
    color: '#AAAAAA',
    marginBottom: theme.spacing(2),
  },
  countDownContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    marginTop: 20,
  },
  fieldLabelStyles: {
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
  serviceRequestFieldsMobile: {
    [theme.breakpoints.down('md')]: {
      marginBottom: 20,
    },
  },
  answerContainerStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  errorMessage: {
    fontSize: 14,
  },
  answerContent: {
    fontSize: '1.042vw',
    color: 'grey',
    [theme.breakpoints.down('lg')]: {
      fontSize: 'initial',
    },
  },
  answerFieldLabel: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  answerRowStyles: {
    margin: '5px 0',
  },
  answerAttachment: {
    margin: theme.spacing(1),
  },

  divider: {
    margin: `${theme.spacing(5)}px 0`,
  },

  rollbackButton: {
    fontSize: '0.972vw',
    height: '40px',
    borderRadius: '9px',
    marginRight: '20px',
    [theme.breakpoints.down('lg')]: {
      fontSize: 'initial',
    },
  },
  rejectedAnswer: {
    width: '100%',
    height: '100%',
    backgroundColor: overlayColor,
    opacity: '95%',
    padding: '0 10px',
  },
  attachmentChip: {
    marginTop: '0.5vw',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '70vw',
      marginTop: '2vw',
    },
  },
  flipMove: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '0.5vw',
    [theme.breakpoints.down('xs')]: {
      marginTop: '12vw',
    },
  },
  relatedService: {
    float: 'right',
    color: white,
    textDecoration: 'none',
  },
  viewEvaluations: {
    float: 'right',
  },
  addAdminBtn: {
    paddingLeft: '35px !important',
  },
  checkboxContainer: {
    border: '1px solid #1257736b',
    borderRadius: 7,
    padding: 25,
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
  addAccountDate: {
    width: '100%',
  },
  durationLabel: {
    margin: 'auto',
  },
  addAccountContainer: {
    marginTop: theme.spacing(10),
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pageContainerMargin: {
    marginTop: theme.spacing(3),
  },
  accountField: {
    marginTop: theme.spacing(4),
  },
  nextStepBtn: { float: 'right' },
  projectFormFields: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 30,
    },
  },
  addNewConsultantBtn: {
    float: 'right',
    margin: theme.spacing(2),
  },
  mentorsDialogContainer: {
    minWidth: 800,
  },
  editMentorsBtn: {
    float: 'right',
    marginTop: theme.spacing(2),
  },
  clickableTextButton: {
    cursor: 'pointer',
  },
  relatedQuestioneHeaderText: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'right',
      whiteSpace: 'nowrap',
      fontSize: 14,
    },
  },
  relatedServiceHeaderText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  projectManagerHeader: {
    [theme.breakpoints.down('md')]: {
      marginTop: '0 !important',
    },
  },
}));
