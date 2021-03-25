import React, { useMemo } from 'react';
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
import { formatDayAsKey } from 'services/dateTimeParser';
import { formatDaySlot } from 'core/userAvailableDays';

const useStyles = makeStyles(calendarStyles);

const AppointmentHeader = withStyles(appointmentHeaderStyles, {
  name: 'Header',
})(({ appointmentData, classes, ...restProps }) => (
  <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
    <IconButton
      onClick={() => {
        restProps.onOpenButtonClick();
        restProps.onHide();
      }}
      className={classes.commandButton}
      id={`edit-${appointmentData.id}`}>
      <EditIcon />
    </IconButton>
    <IconButton
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
  events,
  selectedDay,
  canBookDate,
  isMinimized,
  onDayClick,
  containerStyle,
  updateAvailableDays,
  isEditable,
}) => {
  const classes = useStyles();

  const availableDaysSlots = useMemo(() => {
    return Object.values(availableDates).flat(1);
  }, [availableDates]);
  const availableDaysList = useMemo(() => {
    return Object.keys(availableDates).filter((dateKey) => {
      return (
        !!availableDates[dateKey] &&
        moment(dateKey, 'YYYYMMDD').isAfter(moment()) &&
        availableDates[dateKey].length > 0
      );
    });
  }, [availableDates]);

  const onEditEvent = ({ changed, deleted }) => {
    if (changed) {
      const toBeChangedSlotId = Object.keys(changed)[0];
      const modifiedDate = formatDayAsKey(
        moment(toBeChangedSlotId, 'YYYYMMDD HH:mm'),
      );
      const slotIndex = availableDates[modifiedDate].findIndex(
        (slot) => slot.id === toBeChangedSlotId,
      );

      if (slotIndex >= 0) {
        let changedSlot = availableDates[modifiedDate][slotIndex];
        changedSlot = { ...changedSlot, ...Object.values(changed)[0] };
        const startTime = moment(changedSlot.startDate);
        const endTime = moment(changedSlot.endDate);
        availableDates[modifiedDate][slotIndex] = formatDaySlot(modifiedDate, {
          startTime,
          endTime,
        });
        updateAvailableDays(availableDates);
      }
    } else if (deleted) {
      const parsedIdAsDate = moment(deleted, 'YYYYMMDD HH:mm');
      const parsedKey = formatDayAsKey(parsedIdAsDate);
      if (!!availableDates[parsedKey]) {
        availableDates[parsedKey] = availableDates[parsedKey].filter(
          (date) => date.id !== deleted,
        );
        updateAvailableDays(availableDates);
      }
    }
  };

  // TODO needs to handle remote fetch for events instead of pre fetching
  return (
    <Paper
      id={'calendar-view'}
      className={classNames([containerStyle, classes.paperBackground])}>
      <Scheduler data={canBookDate ? [] : [...availableDaysSlots, ...events]}>
        <ViewState defaultCurrentDate={Date.now()} />

        <CustomMonthView
          {...{ availableDaysList, selectedDay, canBookDate, onDayClick }}
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
