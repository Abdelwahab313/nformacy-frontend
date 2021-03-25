import { User } from './types';

export const getUserName = (user: User) => {
  return `${user?.firstName[0]}. ${user?.lastName}`;
};
