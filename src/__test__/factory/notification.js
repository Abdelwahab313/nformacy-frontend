import faker from 'faker';

export const NotificationMessage = (notification = {}, read = false) => {
  const createdAtInRecentDays = 7;
  const readAtInRecentDays = 1;
  return {
    notification_id: faker.random.uuid(),
    target_id: faker.random.uuid(),
    message_key: faker.lorem.sentence(),
    created_at: faker.date.recent(createdAtInRecentDays),
    read_at: read ? faker.date.recent(readAtInRecentDays) : undefined,
    type: 'QuestionNotification',
    ...notification,
  };
};

export const UserNotification = (notification = {}, read = false) => {
  const createdAtInRecentDays = 7;
  const readAtInRecentDays = 1;
  return {
    id: faker.random.uuid(),
    params: {
      targetId: faker.random.uuid(),
      messageKey: faker.lorem.sentence(),
    },
    createdAt: faker.date.recent(createdAtInRecentDays),
    readAt: read ? faker.date.recent(readAtInRecentDays) : undefined,
    ...notification,
  };
};
