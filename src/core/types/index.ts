export type User = {
  firstName: string;
  lastName: string;
  freeDates: AvailableDateSlot[];
  completedProfile: boolean;
  hasFullProfile: boolean;
};

export type AvailableDateSlot = {
  id: string;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
};

export type AvailableDays = {
  [x: string]: AvailableDateSlot[];
};
