const { SUPER_ADMIN, ADMIN_ROLES, USER_TYPES } = require('constants/userRoles');

class GuardianBase {
  constructor(user) {
    this._currentUser = user;
  }

  getCurrentUser() {
    return this._currentUser;
  }

  getRoles() {
    if (!!this.getCurrentUser()?.roles) {
      return this.getCurrentUser()?.roles?.map((role) => role.name);
    } else {
      // should throw exception that the page is undefined
      return [];
    }
  }

  isSuperAdmin() {
    return this.getRoles()?.includes(SUPER_ADMIN);
  }

  isAdviser() {
    return this.getRoles()?.includes(USER_TYPES.adviser);
  }

  isClient() {
    return this.getRoles()?.includes(USER_TYPES.client);
  }

  hasRequestsManagementsRole() {
    return this.getRoles().includes(ADMIN_ROLES.requestsManager);
  }

  hasConsultantsManagementsRole() {
    return this.getRoles().includes(ADMIN_ROLES.consultantsManager);
  }

  hasClientsManagementsRole() {
    return this.getRoles().includes(ADMIN_ROLES.clientsManager);
  }

  hasAdvisorsManagementsRole() {
    return this.getRoles().includes(ADMIN_ROLES.advisorsManager);
  }

  hasQuestionsManagementsRole() {
    return this.getRoles().includes(ADMIN_ROLES.questionsManager);
  }
}

export default GuardianBase;
