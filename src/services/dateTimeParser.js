import moment from 'moment';
import LOCALES from '../constants/locale';

export const isSameDate = (date1, date2) => {
  const startOfDay1 = moment(date1).startOf('day');
  const startOfDay2 = moment(date2).startOf('day');
  return startOfDay1.isSame(startOfDay2);
};

export const formattedDate = (date) => {
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
  });
  const formattedParts = dateTimeFormat.formatToParts(date);
  return `${formattedParts[0].value}, ${formattedParts[2].value}`;
};

export const formatDayAsKey = (day) => moment(day).format('YYYYMMDD');

export const formatTime = (time) => moment(time).format('HH:mm');

export const getTimeAtTimeZone = (formattedTime, timeZone) =>
  moment
    .utc(formattedTime, 'HH:mm')
    .tz(timeZone)
    .toDate()
    .toLocaleString('en-US', { timeZone: timeZone });
export const getDateTimeAtTimeZone = (formattedTime, timeZone) =>
  moment.utc(formattedTime).tz(timeZone);

export const convertTimeToUTC = (formattedTime, timeZone) =>
  moment
    .tz(formattedTime, 'HH:mm', timeZone)
    .utc()
    .format('HH:mm');

export const formattedDateTime = (date) => {
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return dateTimeFormat.format(date);
};

export const getRemainingHoursFromDate = (dateInUTC) => {
  const timeDiff = moment.utc(dateInUTC).diff(moment());
  const hours = moment.duration(timeDiff).asHours();
  return hours;
};

export const formattedDateTimeNoSeconds = (date) => {
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return dateTimeFormat.format(date);
};

export const formattedDateMonthAndDay = (date, locale = LOCALES.en) => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: '2-digit',
  });
  if (isNaN(date.getTime())) {
    return '';
  }
  return dateTimeFormat.format(date);
};

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD")
}

export const getTimeDiffInHoursFromNow = (remainingTime) => {
  return moment.duration(moment(remainingTime).diff(moment())).asHours();
};
export const getTimeDiffInMinutesFromNow = (remainingTime) => {
  return moment.duration(moment(remainingTime).diff(moment())).asMinutes();
};
