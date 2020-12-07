import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  AllDayPanel,
  EditingState,
  IntegratedEditing,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  Resources,
  Scheduler,
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  calendarStyles,
  appointmentHeaderStyles,
} from './styles/calendarStyles';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import CustomMonthView from './subComponents/CustomMonthView';
import CustomAppointmentForm from './subComponents/CustomAppointmentForm';
import calendarResources from './subComponents/calendarResources';

const useStyles = makeStyles(calendarStyles);

const AppointmentHeader = withStyles(appointmentHeaderStyles, {
  name: 'Header',
})(({ appointmentData, classes, ...restProps }) => (
  <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
    <IconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => {
        restProps.onOpenButtonClick();
        restProps.onHide();
      }}
      className={classes.commandButton}
      id={`edit-${appointmentData.id}`}>
      <EditIcon />
    </IconButton>
    <IconButton
      /* eslint-disable-next-line no-alert */
      onClick={restProps.onDeleteButtonClick}
      className={classes.commandButton}
      id={`delete-${appointmentData.id}`}>
      <DeleteIcon />
    </IconButton>
  </AppointmentTooltip.Header>
));

const AppointmentContent = withStyles(calendarStyles, {
  name: 'AppointmentContent',
})(({ classes, isMinimized, ...restProps }) => {
  if (isMinimized) return <div />;
  return (
    <Appointments.AppointmentContent
      {...restProps}
      className={classes.appointmentContent}
    />
  );
});

const Appointment = withStyles(calendarStyles, {
  name: 'Appointment',
})(({ classes, isMinimized, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    data-title={restProps.data?.title}
    data-date={restProps.data?.startDate}
    className={classNames(classes.appointment, {
      [classes.minimizedAppointment]: isMinimized,
    })}
  />
));

const CalendarView = ({
  availableDates,
  selectedDay,
  canBookDate,
  isMinimized,
  onDayClick,
  containerStyle,
  onUpdateAvailableDays,
  isEditable,
}) => {
  const classes = useStyles();
  const onEditEvent = ({ added, changed, deleted }) => {
    if (added) {
    } else if (changed) {
      const toBeChangedId = Number(Object.keys(changed)[0]);
      let toBeChanged = availableDates.find(
        (date) => date.id === toBeChangedId,
      );
      toBeChanged = { ...toBeChanged, ...Object.values(changed)[0] };
      const startTime = moment(toBeChanged.startDate).format('HH:mm');
      const endTime = moment(toBeChanged.endDate).format('HH:mm');
      toBeChanged.title = `${startTime} - ${endTime}`;
      const allAvailableDates = availableDates.filter(
        (date) => date.id !== toBeChangedId,
      );
      allAvailableDates.push(toBeChanged);
      onUpdateAvailableDays(allAvailableDates, () => {});
    } else {
      const allAvailableDates = availableDates.filter(
        (date) => date.id !== deleted,
      );
      onUpdateAvailableDays(allAvailableDates, () => {});
    }
  };
  return (
    <Paper
      id={'calendar-view'}
      className={classNames([containerStyle, classes.paperBackground])}>
      <Scheduler data={canBookDate ? [] : availableDates}>
        <ViewState defaultCurrentDate={Date.now()} />

        <CustomMonthView
          {...{ availableDates, selectedDay, canBookDate, onDayClick }}
        />
        <Appointments
          appointmentComponent={(props) => (
            <Appointment {...props} isMinimized={isMinimized} />
          )}
          appointmentContentComponent={(props) => (
            <AppointmentContent
              data-date={props.data.startDate}
              {...props}
              isMinimized={isMinimized}
            />
          )}
        />
        <AllDayPanel />
        <Resources data={calendarResources} />
        <EditingState onCommitChanges={onEditEvent} />
        <IntegratedEditing />
        <Toolbar />
        <DateNavigator />
        {isEditable ? (
          <AppointmentTooltip
            headerComponent={AppointmentHeader}
            showCloseButton
          />
        ) : (
          <AppointmentTooltip showCloseButton />
        )}
        <CustomAppointmentForm />
      </Scheduler>
    </Paper>
  );
};

export default CalendarView;
