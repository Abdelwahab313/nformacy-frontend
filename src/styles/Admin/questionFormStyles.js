import { makeStyles } from '@material-ui/core/styles';
import { pink } from '../colors';

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
    justifyContent: 'flex-end',
    display: 'flex',
  },
  inputsRow: {
    marginTop: theme.spacing(4),
  },
  countDown: {
    marginLeft: theme.spacing(2),
  },
  currentActionTime: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  attachmentContainer: { justifyContent: 'flex-start' },
  contentTitle: {
    color: '#AAAAAA',
    marginBottom: theme.spacing(2),
  },
  countDownContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    borderBottom: '1px solid #d2d2d2',
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
  answerContainerStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    marginTop: theme.spacing(4)
  },
  answerFieldStyle: {
    border: `1px solid ${pink}`,
    borderRadius: '5px',
    padding: theme.spacing(1),
  },
  answerContent: {
    border: `1px solid ${pink}`,
    borderRadius: '5px',
    padding: theme.spacing(2),
  },
  answerFieldLabel: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main
  },
  answerRowStyles: {
    margin: '15px 0',
  },
  answerAttachment: {
    margin: theme.spacing(1)
  }
}));
