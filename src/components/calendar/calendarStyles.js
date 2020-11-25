import {
  darken,
  fade,
  lighten,
} from '@material-ui/core/styles/colorManipulator';

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.type === 'light'
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.68)
  }`;

export const calendarStyles = (theme) => ({
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
  paperBackground: {
    backgroundColor: 'transparent',
  },
  dayScaleCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
  table: {
    minWidth: '200px',
    // minWidth: '200px'
  },
  appointment: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  minimizedAppointment: {
    height: '10px',
  },
  appointmentContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  dayText: {
    color: theme.palette.common.black,
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
    color: '#FFFFFF',
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
});

export const appointmentHeaderStyles = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  firstRoom: {
    background:
      'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  secondRoom: {
    background:
      'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  thirdRoom: {
    background:
      'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  header: {
    height: '260px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});
