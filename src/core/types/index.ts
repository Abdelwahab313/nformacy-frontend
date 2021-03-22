export type User = {
  firstName: string;
  lastName: string;
  freeDates: AvailableDateSlot[];
};

export type AvailableDateSlot = {
  startDate: string;
  endDate: string;
};

export type AvailableDays = {
  [x: string]: TimeSlot[];
};


export type TimeSlot = {
    from: string;
    to: string;
};


