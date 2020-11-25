import { AppointmentColors } from 'styles/colors';

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

const calendarResources = [
  {
    fieldName: 'ownerId',
    title: 'Owners',
    instances: owners,
  },
];

export default calendarResources;
