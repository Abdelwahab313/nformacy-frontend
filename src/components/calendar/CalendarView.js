import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import {
  AllDayPanel,
  EditingState,
  IntegratedEditing,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  MonthView,
  Resources,
  Scheduler,
  TodayButton,
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import calendarStyles from './calendarStyles';
import { formatDayAsKey, isSameDate } from '../../services/dateTimeParser';
import { AppointmentColors, pink } from '../../styles/colors';
import moment from 'moment';

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: 'center', fontWeight: 'bold' }}
  />
);

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const excludeFields = [
    'titleTextEditor',
    'multilineTextEditor',
    'numberEditor',
  ];
  if (excludeFields.includes(props.type)) {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BooleanEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const excludeFields = ['All Day', 'Repeat'];
  if (excludeFields.includes(props.label)) {
    return null;
  }
  return <AppointmentForm.BooleanEditor {...props} />;
};

const ResourceEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.resource.title === 'Owners') {
    return null;
  }
  return <AppointmentForm.Select {...props} />;
};

const LabelEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const excludeFields = [
    'Title',
    'More Information',
    'Owners',
    'Repeat',
    'End Repeat',
  ];
  if (excludeFields.includes(props.text)) {
    return null;
  }
  return <AppointmentForm.Label {...props} />;
};

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  firstRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  secondRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  thirdRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  header: {
    height: '260px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

const Header = withStyles(style, { name: 'Header' })(({
                                                        children, appointmentData, classes, ...restProps
                                                      }) => (
  <AppointmentTooltip.Header
    {...restProps}
    appointmentData={appointmentData}
  >
    <IconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => {
        restProps.onOpenButtonClick();
        restProps.onHide();
      }
      }
      className={classes.commandButton}
      id={`edit-${appointmentData.id}`}
    >
      <EditIcon />
    </IconButton>
    <IconButton
      /* eslint-disable-next-line no-alert */
      onClick={restProps.onDeleteButtonClick}
      className={classes.commandButton}
      id={`delete-${appointmentData.id}`}
    >
      <DeleteIcon />
    </IconButton>
  </AppointmentTooltip.Header>
));

const TimeTableLayoutBase = ({ classes, ...props }) => (
  <MonthView.TimeTableLayout {...props} className={classes.table} />
);
const TimeTableLayout = withStyles(calendarStyles, { name: 'TimeTable' })(
  TimeTableLayoutBase,
);

const DayScaleLayoutBase = ({ classes, ...props }) => (
  <MonthView.DayScaleLayout {...props} className={classes.table} />
);
const DayScaleLayout = withStyles(calendarStyles, { name: 'TimeTable' })(
  DayScaleLayoutBase,
);

const CellBase = React.memo(
  ({
    classes,
    startDate,
    formatDate,
    otherMonth,
    availableDates,
    selectedDay,
    onDayClick,
  }) => {
    const isSelectedDay = !!selectedDay && isSameDate(startDate, selectedDay);

    const isAvailableDay = formatDayAsKey(startDate) in availableDates;

    const dayClicked = () => {
      console.log('day pressed', startDate);
      onDayClick && onDayClick({ selectedDay: startDate, isAvailableDay });
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
        data-day={moment(startDate).format('DD-MM')}
        className={classNames({
          availableCell: isAvailableDay,
          [classes.cell]: true,
          [classes.opacity]: otherMonth,
        })}>
        <div className={classes.text}>
          <Grid container spacing={3} justify='space-evenly'>
            <Grid
              item
              xs={3}
              className={classNames({
                dayText: true,
                [classes.dayText]: true,
                [classes.availableDay]: isAvailableDay,
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

export const owners = [
  {
    text: 'Call',
    id: 1,
    color: AppointmentColors.call,
  },
  {
    text: 'Meeting',
    id: 2,
    color: AppointmentColors.meeting,
  },
  {
    text: 'Assignment',
    id: 3,
    color: AppointmentColors.assignment,
  },
];

const resources = [
  {
    fieldName: 'ownerId',
    title: 'Owners',
    instances: owners,
  },
];
const CalendarView = ({
  availableDates,
  selectedDay,
  isInteractable,
  isMinimized,
  onDayClick,
  containerStyle,
  onUpdateAvailableDays,
  isEditable,
}) => {
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
    <Paper id={'calendar-view'} className={containerStyle}>
      <Scheduler data={isInteractable ? [] : availableDates}>
        <ViewState defaultCurrentDate={Date.now()} />
        <MonthView
          timeTableCellComponent={(props) => (
            <TimeTableCell
              {...props}
              availableDates={availableDates}
              selectedDay={selectedDay}
              isInteractable={isInteractable}
              onDayClick={onDayClick}
            />
          )}
          dayScaleCellComponent={DayScaleCell}
          dayScaleLayoutComponent={DayScaleLayout}
          timeTableLayoutComponent={TimeTableLayout}
        />
        <Appointments
          appointmentComponent={(props) => (
            <Appointment {...props} isMinimized={isMinimized} />
          )}
          appointmentContentComponent={(props) => (
            <AppointmentContent data-date={props.data.startDate} {...props} isMinimized={isMinimized} />
          )}
        />
        <AllDayPanel />
        <Resources data={resources} />
        <EditingState onCommitChanges={onEditEvent} />
        <IntegratedEditing />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        {isEditable && (
          <AppointmentTooltip headerComponent={Header} showCloseButton />
        )}
        {!isEditable && <AppointmentTooltip showCloseButton />}
        <AppointmentForm
          textEditorComponent={TextEditor}
          booleanEditorComponent={BooleanEditor}
          resourceEditorComponent={ResourceEditor}
          labelComponent={LabelEditor}
        />
      </Scheduler>
    </Paper>
  );
};

export default CalendarView;
