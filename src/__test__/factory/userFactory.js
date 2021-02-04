import authManager from 'services/authManager';
import faker from 'faker';

const baseUserData = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

class UserFactorySetup {
  static generateUser(user = {}) {
    authManager.updateUserInLocalStorage({ ...baseUserData, ...user }, {});
  }

  static generateAdviser(user = {}) {
    const roles = [{ name: 'admin' }, { name: 'adviser' }];

    authManager.updateUserInLocalStorage(
      { ...baseUserData, ...user, roles },
      {},
    );
  }
}

export default UserFactorySetup;
