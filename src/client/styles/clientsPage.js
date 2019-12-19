import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    background: '#F5F5F5',
    padding: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  tableContainer: {
    margin: theme.spacing(1),
  },
  tableContainerFW: {
    width: '100%',
    margin: theme.spacing(1),
  },
  mapContainer: {
    width: '100%',
    maxHeight: 600,
    margin: theme.spacing(1),
  },
}));
export default useStyles;
