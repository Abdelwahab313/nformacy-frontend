import {
  darken,
  fade,
  lighten,
} from '@material-ui/core/styles/colorManipulator';
import { pink } from '../../styles/colors';

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.type === 'light'
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.68)
  }`;

const calendarStyles = (theme) => ({
  cell: {
    color: '#78909C',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: '4em',
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      // backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  table: {
    minWidth: '200px'
    // minWidth: '200px'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  opacity: {
    opacity: '0.5',
  },
  availableDay: {
    color: '#FFFFFF',
    fontSize: '18px',
  },
  availableDayBackground: {
    backgroundColor: '#00a2ff',
  },
  checkedIcon: {
    color: '#FFFFFF'
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
});

export default calendarStyles;