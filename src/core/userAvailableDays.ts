import moment, { Moment } from 'moment';
import { formatDayAsKey, getDateTimeAtTimeZone } from 'services/dateTimeParser';
import { AvailableDateSlot, AvailableDays } from './types';

type SelectedRange = {
  startDate: string | Moment | Date;
  endDate: string | Moment | Date;
  startTime: string | Moment | Date;
  endTime: string | Moment | Date;
};

export const addSelectedRangeToAvailableDays = (
  availableDays: AvailableDays,
  selectedRange: SelectedRange,
) => {
  let { startDate, endDate } = selectedRange;

  startDate = moment(startDate);
  endDate = moment(endDate);

  while (startDate.format('YYYY-MM-DD') <= endDate.format('YYYY-MM-DD')) {
    let parsedDayKey = formatDayAsKey(startDate);
    let timeSlot = formatDaySlot(parsedDayKey, selectedRange);

    if (!!availableDays[parsedDayKey]) {
      handleOverlappedSlots(availableDays[parsedDayKey], timeSlot);
    } else {
      availableDays[parsedDayKey] = [timeSlot];
    }
    startDate = startDate.add(1, 'days');
  }

  return availableDays;
};

type SelectedTimeRange = {
  startTime: string | Moment | Date;
  endTime: string | Moment | Date;
};
export const formatDaySlot = (
  parsedDayKey: string,
  selectedRange: SelectedTimeRange,
): AvailableDateSlot => {
  let { startTime, endTime } = selectedRange;
  const startTimeString = moment(startTime).format('HH:mm');
  const endTimeString = moment(endTime).format('HH:mm');
  let day = moment(parsedDayKey);
  startTime = moment(startTime);
  endTime = moment(endTime);

  return {
    id: `${parsedDayKey} ${startTimeString}`,
    title: `${startTimeString} - ${endTimeString}`,
    startDate: new Date(
      day.year(),
      day.month(),
      day.date(),
      startTime.hour(),
      startTime.minutes(),
    ),
    endDate: new Date(
      day.year(),
      day.month(),
      day.date(),
      endTime.hour(),
      endTime.minutes(),
    ),
  };
};

// TODO handle same date
// TODO handle overlapped with merge
// TODO maybe we should add day slots as
const handleOverlappedSlots = (
  existingSlots: AvailableDateSlot[],
  timeSlotToAdd: AvailableDateSlot,
) => {
  let isRangeAdded = false;
  const startRange = moment(timeSlotToAdd.startDate);
  const endRange = moment(timeSlotToAdd.endDate);

  for (var i = 0; i < existingSlots.length; i++) {
    const currentSlotStartDate = moment(existingSlots[i].startDate);
    const currentSlotEndDate = moment(existingSlots[i].endDate);
    // there are multiple cases
    // 1) extend end date,       when start range is between slot      and endRange after end date
    // 2) extend start date,     when start range is before startDate  and endRange between
    // 3) extend both start end  when start range is before start date and endRange after end date
    // 4) include whole date,    when start range is between slot      and endRange between
    // 5) add extra slot
    const shouldExtendStartDate =
      startRange.isBefore(currentSlotStartDate) &&
      endRange.isBetween(currentSlotStartDate, currentSlotEndDate);

    const shouldExtendEndDate =
      startRange.isBetween(currentSlotStartDate, currentSlotEndDate) &&
      endRange.isAfter(currentSlotEndDate);

    const shouldExtendBothStartAndEnd =
      startRange.isBefore(currentSlotStartDate) &&
      endRange.isAfter(currentSlotEndDate);

    const shouldDismissRange =
      (startRange.isBetween(currentSlotStartDate, currentSlotEndDate) &&
        endRange.isBetween(currentSlotStartDate, currentSlotEndDate)) ||
      (startRange.isSame(currentSlotStartDate) &&
        endRange.isSame(currentSlotEndDate));

    if (shouldExtendBothStartAndEnd) {
      existingSlots[i] = timeSlotToAdd;
      isRangeAdded = true;
      break;
    } else if (shouldExtendStartDate) {
      existingSlots[i] = reformatPrecedingSlot(timeSlotToAdd, existingSlots[i]);
      isRangeAdded = true;
      break;
    } else if (shouldExtendEndDate) {
      existingSlots[i] = reformatFollowingSlot(timeSlotToAdd, existingSlots[i]);
      isRangeAdded = true;
      break;
    } else if (shouldDismissRange) {
      isRangeAdded = true;
      break;
    }
  }
  if (!isRangeAdded) {
    existingSlots.push(timeSlotToAdd);
  }

  return existingSlots;
};

const reformatPrecedingSlot = (
  timeSlotToAdd: AvailableDateSlot,
  currentSlot: AvailableDateSlot,
) => {
  return formatDaySlot(formatDayAsKey(timeSlotToAdd.startDate), {
    startTime: timeSlotToAdd.startDate,
    endTime: currentSlot.endDate,
  });
};

const reformatFollowingSlot = (
  timeSlotToAdd: AvailableDateSlot,
  currentSlot: AvailableDateSlot,
) => {
  return formatDaySlot(formatDayAsKey(timeSlotToAdd.startDate), {
    startTime: currentSlot.startDate,
    endTime: timeSlotToAdd.endDate,
  });
};

export const getTimeSlotAtTimeZone = (
  availableDaySlot: AvailableDateSlot,
  timezone: string,
) => {
  const startDate = moment(availableDaySlot.startDate);
  const endDate = moment(availableDaySlot.endDate);

  const convertedStartDateTime = getDateTimeAtTimeZone(startDate, timezone);
  const convertedEndDateTime = getDateTimeAtTimeZone(endDate, timezone);
  const startTimeString = convertedStartDateTime.format('HH:mm');
  const endTimeString = convertedEndDateTime.format('HH:mm');

  return {
    id: availableDaySlot.id,
    title: `${startTimeString} - ${endTimeString}`,
    startDate: new Date(
      convertedStartDateTime.year(),
      convertedStartDateTime.month(),
      convertedStartDateTime.date(),
      convertedStartDateTime.hour(),
      convertedStartDateTime.minutes(),
    ),
    endDate: new Date(
      convertedEndDateTime.year(),
      convertedEndDateTime.month(),
      convertedEndDateTime.date(),
      convertedEndDateTime.hour(),
      convertedEndDateTime.minutes(),
    ),
  };
};
