import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  maleFemaleIcon: {
    margin: theme.spacing(1),
  },
  paperSection: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  },
  nestedContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(3),
  },
  formHeader: {
    display: 'flex',
  },
  formHeaderIcon: {
    marginLeft: theme.spacing(1),
    justifyContent: 'center',
  },
  selectControl: {
    minWidth: 120,
  },
  checkBoxControl: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  datesContainer: {
    display: 'flex',
    width: '100%',
  },
  nestedCardContainer: {
    margin: theme.spacing(3),
  },
  editButton: {
    width: '10%',
    marginBottom: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(5),
  },

  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  error: {
    color: 'red',
    margin: theme.spacing(1),
  },
  signupLink: {
    margin: theme.spacing(1),
    color: 'royalblue',
  },
}));

export default useStyles;
