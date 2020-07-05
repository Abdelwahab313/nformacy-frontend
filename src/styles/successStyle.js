import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  successRootContainer: {
    height: '100vh',
  },
  successMessageContainer: { height: '100vh', paddingTop: 50 },
  successText: { textAlign: 'center', marginTop: 50 },
  subtext: { alignSelf: 'flex-end' },
}));
