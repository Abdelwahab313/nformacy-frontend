import { AppointmentColors } from 'styles/colors';

const calendarResources = [
  {
    fieldName: 'eventType',
    title: 'Event Type',
    instances: [
      {
        id: 'call',
        text: 'Call',
        color: AppointmentColors.call,
      },
      {
        id: 'question',
        text: 'Question',
        color: AppointmentColors.meeting,
      },
      {
        id: 'assignment',
        text: 'Assignment',
        color: AppointmentColors.assignment,
      },
    ],
  },
];

export default calendarResources;
