import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    marginBottom: theme.spacing(3),
    borderRadius: 25,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  media: {
    height: 140,
  },
  sidebar: {
    padding: theme.spacing(3),
  },
}));

export default useStyles;
