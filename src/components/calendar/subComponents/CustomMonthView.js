import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import classNames from 'clsx';
import { MonthView } from '@devexpress/dx-react-scheduler-material-ui';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';
import { calendarStyles } from '../styles/calendarStyles';
import { formatDayAsKey, isSameDate } from '../../../services/dateTimeParser';
import { darkBlue } from '../../../styles/colors';
import moment from 'moment';
import CustomTypography from 'components/typography/Typography';
import '../styles/calendar.css'

const useStyles = makeStyles(calendarStyles);

const DayScaleCell = ({ startDate, formatDate, ...props }) => {
  const classes = useStyles(calendarStyles);

  return (
    <TableCell className={classes.dayScaleCell} {...props}>
      <CustomTypography variant={'body2'} fontWeight={'bold'}>
        {formatDate(startDate, { weekday: 'short' })}
      </CustomTypography>
    </TableCell>
  );
};

const TimeTableCell = React.memo(
  ({
    startDate,
    formatDate,
    otherMonth,
    availableDates,
    selectedDay,
    onDayClick,
  }) => {
    const classes = useStyles({ name: 'Cell' });
    const isSelectedDay = !!selectedDay && isSameDate(startDate, selectedDay);

    const isAvailableDay = formatDayAsKey(startDate) in availableDates;

    const dayClicked = () => {
      onDayClick && onDayClick({ selectedDay: startDate, isAvailableDay });
    };

    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: 'numeric', month: 'short' }
      : { day: 'numeric' };

    if (
      (otherMonth &&
        formatDate(startDate, { day: 'numeric' }) > 20 &&
        formatDate(startDate, { weekday: 'short' }) === 'Sat') ||
      (otherMonth &&
        formatDate(startDate, { day: 'numeric' }) <= 9 &&
        formatDate(startDate, { weekday: 'short' }) === 'Sun')
    ) {
      return (
        <TableCell
          className={classNames({
            [classes.removeRow]: true,
            removeRow: true,
          })}>
          5
        </TableCell>
      );
    }
    return (
      <TableCell
        style={isAvailableDay ? { backgroundColor: darkBlue } : {}}
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

const DayScaleLayoutBase = ({ classes, ...props }) => (
  <MonthView.DayScaleLayout {...props} className={classes.table} />
);
const DayScaleLayout = withStyles(calendarStyles, { name: 'TimeTable' })(
  DayScaleLayoutBase,
);

const TimeTableLayoutBase = ({ classes, ...props }) => (
  <MonthView.TimeTableLayout {...props} className={classes.table} />
);
const TimeTableLayout = withStyles(calendarStyles, { name: 'TimeTable' })(
  TimeTableLayoutBase,
);

const CustomMonthView = ({
  availableDates,
  selectedDay,
  isInteractable,
  onDayClick,
}) => {
  return (
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
  );
};
export default CustomMonthView;
