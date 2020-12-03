export const getUserName = (user) => {
  return `${user?.firstName[0]}. ${user?.lastName}`;
};
