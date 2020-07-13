import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  meetingPageSection: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  meetingPageContainer: {
    marginRight: theme.spacing(3),
    padding: theme.spacing(3),
  },
  meetingPageLowerSection: {
    marginTop: theme.spacing(6),
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    marginRight: theme.spacing(3),
    padding: theme.spacing(3),
  },
  addButton: {
    marginBottom: theme.spacing(1),
    alignSelf: 'flex-start',
  },
  toolBar: {
    position: 'relative',
    color: '#edf0f2',
    justifyContent: 'space-between',
    flexBasis: '100%',
  },
  addForm: {
    margin: 'auto',
  },
  tableContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(1),
  },
  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default useStyles;
