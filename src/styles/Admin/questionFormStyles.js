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
    padding: theme.spacing(2),
  },
  answerFieldStyle: {
    border: `1px solid ${pink}`,
    borderRadius: '5px',
    padding: theme.spacing(1),
  },
  answerRowStyles: {
    margin: '15px 0',
  },
}));
