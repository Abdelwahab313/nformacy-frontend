import moment from 'moment';

const isSameDate = (date1, date2) => {
  const startOfDay1 = moment(date1).startOf('day');
  const startOfDay2 = moment(date2).startOf('day');
  return startOfDay1.isSame(startOfDay2);
};

export default { isSameDate };
