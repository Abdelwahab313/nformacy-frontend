import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { ViewState } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  Scheduler,
  MonthView,
  Toolbar,
  TodayButton,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useCalendarState } from './Context/CalendarContext';
import { UPDATE_SELECTED_DAY } from './Context/contextActions';
import Grid from '@material-ui/core/Grid';
import calendarStyles from './calendarStyles';
import dateTimeParser from '../../services/dateTimeParser';
import { pink } from '../../styles/colors';

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: 'center', fontWeight: 'bold' }}
  />
);

const TimeTableLayoutBase = ({ classes, ...props }) => (
  <MonthView.TimeTableLayout
    {...props}
    className={classes.table}
  />
);
const TimeTableLayout = withStyles(calendarStyles, { name: 'TimeTable' })(TimeTableLayoutBase);

const DayScaleLayoutBase = ({ classes, ...props }) => (
  <MonthView.DayScaleLayout
    {...props}
    className={classes.table}
  />
);
const DayScaleLayout = withStyles(calendarStyles, { name: 'TimeTable' })(DayScaleLayoutBase);


const useCalendarDayState = (day) => {
  const [{ availableDates, isInteractable, selectedDay }, dispatch] = useCalendarState();
  console.log(availableDates);
  const freelancerAvailableDates = availableDates.map((d) => {
    return d.date;
  });
  const isAvailableDay = freelancerAvailableDates.some((date) =>
    dateTimeParser.isSameDate(date, day),
  );
  const setSelectedDay = () => {
    if (isAvailableDay && isInteractable) {
      dispatch({
        type: UPDATE_SELECTED_DAY,
        payload: day,
      });
    }
  };
  const isSelectedDay = dateTimeParser.isSameDate(day, selectedDay);

  return { isAvailableDay, isSelectedDay, setSelectedDay };
};

const CellBase = React.memo(
  ({ classes, startDate, formatDate, otherMonth }) => {
    const { isAvailableDay, isSelectedDay, setSelectedDay } = useCalendarDayState(startDate);
    console.log(isAvailableDay);

    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: 'numeric', month: 'long' }
      : { day: 'numeric' };

    return (
      <TableCell
        style={isAvailableDay ? { backgroundColor: pink } : {}}
        onClick={setSelectedDay}
        tabIndex={0}
        className={classNames({
          availableCell: isAvailableDay,
          [classes.cell]: true,
          [classes.opacity]: otherMonth,
        })}>
        <div className={classes.text}>
          <Grid container spacing={3} justify='space-evenly'>
            <Grid
              item
              xs={4}
              className={classNames({
                [classes.availableDay]: isAvailableDay,
                dayText: true,
              })}>
              {formatDate(startDate, formatOptions)}
            </Grid>
            <Grid item xs={4} alignself='right'>
              {isSelectedDay && isAvailableDay && (
                <CheckCircleOutlineIcon
                  id={'selectedDayIcon'}
                  className={classes.checkedIcon}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </TableCell>
    );
  },
);

const TimeTableCell = withStyles(calendarStyles, { name: 'Cell' })(CellBase);

const CalendarView = () => {
  return (
    <Paper>
      <Scheduler>
        <ViewState defaultCurrentDate={Date.now()}/>
        <MonthView
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
          dayScaleLayoutComponent={DayScaleLayout}
          timeTableLayoutComponent={TimeTableLayout}
        />
        <Toolbar/>
        <DateNavigator/>
        <TodayButton/>
      </Scheduler>
    </Paper>
  );
};

export default CalendarView;
