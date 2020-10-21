import faker from 'faker';

const UserFactory = (user) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...user,
  };
};

export default UserFactory;
