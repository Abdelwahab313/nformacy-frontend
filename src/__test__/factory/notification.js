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
