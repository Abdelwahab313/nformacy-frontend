import moment from 'moment';

const isSameDate = (date1, date2) => {
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

export default { isSameDate };
