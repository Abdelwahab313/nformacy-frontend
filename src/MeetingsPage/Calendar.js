import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import {
  darken,
  fade,
  lighten,
} from '@material-ui/core/styles/colorManipulator';
import { ViewState } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  Scheduler,
  MonthView,
  WeekView,
  ViewSwitcher,
  Toolbar,
  TodayButton,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import Opacity from '@material-ui/icons/Opacity';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.type === 'light'
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.68)
  }`;

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: 'center', fontWeight: 'bold' }}
  />
);

const styles = (theme) => ({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
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
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
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
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  sun: {
    color: '#FFEE58',
  },
  cloud: {
    color: '#90A4AE',
  },
  rain: {
    color: '#4FC3F7',
  },
  sunBack: {
    backgroundColor: '#FFFDE7',
  },
  cloudBack: {
    backgroundColor: '#ECEFF1',
  },
  rainBack: {
    backgroundColor: '#E1F5FE',
  },
  opacity: {
    opacity: '0.5',
  },
  appointment: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  apptContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: 'none',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  tooltipText: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: 'middle',
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});

const WeatherIcon = ({ classes, id }) => {
  switch (id) {
    case 0:
      return <Opacity className={classes.rain} fontSize='large' />;
    default:
      return null;
  }
};

const CellBase = React.memo(
  ({ classes, startDate, formatDate, otherMonth, today }) => {
    const [selectedDay, setSelectedDay] = useState();
    const dates = ['2020-06-28', '2020-06-29', '2020-06-30'];
    const availableDay = dates.some(
      (date) =>
        new Date(date).setHours(0, 0, 0, 0) === new Date(startDate).getTime(),
    );
    console.log('today', today, startDate);

    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: 'numeric', month: 'long' }
      : { day: 'numeric' };
    return (
      <TableCell
        onClick={() => {
          setSelectedDay(true);
          console.log('selected----', startDate);
        }}
        tabIndex={0}
        className={classNames({
          [classes.cell]: true,
          [classes.opacity]: otherMonth,
        })}>
        <div id={'cellll'} className={classes.content}>
          {!!availableDay && <WeatherIcon classes={classes} id={0} />}
        </div>
        <div className={classes.text}>
          {!!selectedDay && 'selected'}
          {formatDate(startDate, formatOptions)}
        </div>
      </TableCell>
    );
  },
);

const TimeTableCell = withStyles(styles, { name: 'Cell' })(CellBase);

const Calendar = ({ availableDates }) => {
  return (
    <Paper style={{ width: '720px' }}>
      <Scheduler>
        <ViewState defaultCurrentDate={Date.now()} />
        <MonthView
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <WeekView startDayHour={9} endDayHour={19} />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <TodayButton />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
