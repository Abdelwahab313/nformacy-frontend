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
  Appointments,
  AppointmentTooltip,
  Resources,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
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


const CellBase = React.memo(
  ({ classes, startDate, formatDate, otherMonth, availableDates, isInteractable, selectedDay, setSelectedDay }) => {

    const isSelectedDay = dateTimeParser.isSameDate(startDate, selectedDay);
    const isAvailableDay = availableDates.map((d) => {
      return d.date;
    }).some((date) =>
      dateTimeParser.isSameDate(date, startDate),
    );

    const dayClicked = () => {
      if (isAvailableDay && isInteractable) {
        setSelectedDay(startDate);
      }
    };

    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: 'numeric', month: 'long' }
      : { day: 'numeric' };

    return (
      <TableCell
        style={isAvailableDay ? { backgroundColor: pink } : {}}
        onClick={dayClicked}
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

const AppointmentContent = withStyles(calendarStyles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent {...restProps} className={classes.apptContent}/>
));

const Appointment = withStyles(calendarStyles, { name: 'Appointment' })(({ classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
  />
));

const appointments = [
  {
    id: 0,
    title: 'Call with Consultant',
    startDate: new Date(2020, 6, 23, 9, 30),
    endDate: new Date(2020, 6, 23, 11, 30),
    ownerId: 1,
  }, {
    id: 1,
    title: 'Call with Medad Expert',
    startDate: new Date(2020, 6, 9, 11, 0),
    endDate: new Date(2020, 6, 9, 12, 0),
    ownerId: 3,
  },
];
export const owners = [
  {
    text: 'Andrew Glover',
    id: 1,
    color: '#7E57C2',
  }, {
    text: 'Arnie Schwartz',
    id: 2,
    color: '#FF7043',
  }, {
    text: 'John Heart',
    id: 3,
    color: '#E91E63',
  },
];

const resources = [{
  fieldName: 'ownerId',
  title: 'Owners',
  instances: owners,
}];


const CalendarView = ({ availableDates, selectedDay, isInteractable, setSelectedDay }) => {
  return (
    <Paper>
      <Scheduler
        data={isInteractable ? [] : appointments}
      >
        <ViewState defaultCurrentDate={Date.now()}/>
        <MonthView
          timeTableCellComponent={(props) => (<TimeTableCell
            {...props}
            availableDates={availableDates}
            selectedDay={selectedDay}
            isInteractable={isInteractable}
            setSelectedDay={setSelectedDay}
          />)}
          dayScaleCellComponent={DayScaleCell}
          dayScaleLayoutComponent={DayScaleLayout}
          timeTableLayoutComponent={TimeTableLayout}
        />
        <Appointments
          appointmentComponent={Appointment}
          appointmentContentComponent={AppointmentContent}
        />
        <Resources
          data={resources}
        />

        <Toolbar/>
        <DateNavigator/>
        <TodayButton/>
        <AppointmentTooltip
          showCloseButton
          // showDeleteButton
          // showOpenButton
        />
        <AppointmentForm/>

      </Scheduler>
    </Paper>
  );
};

export default CalendarView;
