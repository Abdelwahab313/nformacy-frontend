import moment from 'moment';
import { AvailableDateSlot, AvailableDays, TimeSlot, User } from './types';

export const getUserName = (user: User) => {
  return `${user?.firstName[0]}. ${user?.lastName}`;
};

export const parseFreeDates = (freeDates: AvailableDateSlot[]) => {
  const parsedDates: AvailableDays = {};
  if (!freeDates) {
    return {};
  }
  freeDates.forEach((freeDateSlot) => {
    let startDate = moment(freeDateSlot.startDate);
    let endDate = moment(freeDateSlot.endDate);
    const timeSlot = {
      from: startDate.format('HH:mm'),
      to: endDate.format('HH:mm'),
    };
    while (startDate.format('YYYY-MM-DD') <= endDate.format('YYYY-MM-DD')) {
      // console.log(startDate.toDate());

      if (!!parsedDates[startDate.format('YYYY-MM-DD')]) {
        addOverLapSlot(parsedDates[startDate.format('YYYY-MM-DD')], timeSlot);
      } else {
        parsedDates[startDate.format('YYYY-MM-DD')] = [timeSlot];
      }
      startDate = startDate.add(1, 'days');
    }

    return freeDateSlot;
  });
  return parsedDates;
};

const addOverLapSlot = (existingSlots: TimeSlot[] , timeSlot: TimeSlot) => {
  if (
    moment(existingSlots[0].to, 'HH:mm').isAfter(moment(timeSlot.from, 'HH:mm'))
  ) {
    existingSlots[0].to = timeSlot.to;
  } else {
    existingSlots.push(timeSlot);
  }

  return existingSlots;
};
