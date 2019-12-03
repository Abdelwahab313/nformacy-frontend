import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#F5F5F5',
    padding: theme.spacing(3),
  },
  addButton: {
    marginBottom: theme.spacing(1),
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
    width: '98%',
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
