import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#F5F5F5',
    marginRight: theme.spacing(3),
    padding: theme.spacing(1),
  },
  mapContainer: {
    padding: theme.spacing(2),
  },
  imgContainer: {
    paddingRight: theme.spacing(1),
  },
  mapGrid: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  details: {
    padding: theme.spacing(2),
  },
  img: {
    height: '100%',
    minHeight: '400px',
    maxHeight: 515,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    // maxWidth: 515,
  },
  emptyContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  largeIcon: {
    width: 40,
    height: 40,
    color: 'red',
  },
  notFound: {
    color: 'red',
  },
}));

export default useStyles;
