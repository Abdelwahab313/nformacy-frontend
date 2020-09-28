import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles( () => ({
  columnHeader: { fontWeight: 'bold', whiteSpace: 'nowrap' },
  link: { textDecoration: 'none' },
  field: { margin: 2 },
  answersCount: { marginLeft: '15px' },
  currentActionTimeContainer: { fontWeight: 'bold', whiteSpace: 'nowrap' },
  currentActionTime: { marginRight: '0.1rem' },
  tooltip: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  nowrapText: {
    whiteSpace: 'nowrap',
  }
}));
