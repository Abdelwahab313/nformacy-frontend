import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
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
import { withStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useCalendarState } from './Context/CalendarContext';
import { UPDATE_SELECTED_DAY } from './Context/contextActions';
import Grid from '@material-ui/core/Grid';
import calendarStyles from './calendarStyles';

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: 'center', fontWeight: 'bold' }}
  />
);

const CellBase = React.memo(
  ({ classes, startDate, formatDate, otherMonth }) => {
    const [{ availableDates, selectedDay }, dispatch] = useCalendarState();

    function isSameDate(date1, date2) {
      return (
        new Date(date1).setHours(0, 0, 0, 0) ===
        new Date(date2).setHours(0, 0, 0, 0)
      );
    }

    const freelancerAvailableDates = availableDates.map((d) => {
      return d.date;
    });

    const availableDay = freelancerAvailableDates.some((date) =>
      isSameDate(date, startDate),
    );

    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: 'numeric', month: 'long' }
      : { day: 'numeric' };
    return (
      <TableCell
        style={availableDay ? { backgroundColor: '#00a2ff' } : {}}
        onClick={
          availableDay
            ? () => {
                dispatch({
                  type: UPDATE_SELECTED_DAY,
                  payload: startDate,
                });
              }
            : () => {}
        }
        tabIndex={0}
        className={classNames({
          availableCell: availableDay,
          [classes.cell]: true,
          [classes.opacity]: otherMonth,
        })}>
        <div className={classes.text}>
          <Grid container spacing={3} justify='space-evenly'>
            <Grid
              item
              xs={4}
              className={classNames({
                [classes.availableDay]: availableDay,
                dayText: true,
              })}>
              {formatDate(startDate, formatOptions)}
            </Grid>
            <Grid item xs={4} alignItems='right'>
              {isSameDate(startDate, selectedDay) && availableDay && (
                <CheckCircleOutlineIcon
                  id={'selectedDayIcon'}
                  style={{ color: '#FFFFFF' }}
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

const Calendar = () => {
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
