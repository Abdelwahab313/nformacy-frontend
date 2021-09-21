import authManager from 'services/authManager';
import GuardianBase from './GuardianBase';

class AdminGuardianClass extends GuardianBase {
  constructor(user) {
    super(user);
  }

  showDashboardPanel() {
    return this.isSuperAdmin() || this.hasRequestsManagementsRole();
  }

  showRequestsPanel() {
    return this.isSuperAdmin() || this.hasRequestsManagementsRole();
  }

  showQuestionsPanel() {
    return (
      this.isSuperAdmin() ||
      this.hasQuestionsManagementsRole() ||
      this.isAdviser()
    );
  }

  showProjectsPanel() {
    return this.isSuperAdmin();
  }

  showProjectManagersPanel() {
    return this.isSuperAdmin();
  }

  showClientsPanel() {
    return this.isSuperAdmin() || this.hasClientsManagementsRole();
  }

  showConsultantsPanel() {
    return this.isSuperAdmin() || this.hasConsultantsManagementsRole();
  }

  showAdvisersPanel() {
    // TODO return this temporariy after show how will the product will be
    return false;
    // return this.isSuperAdmin() || this.hasAdvisorsManagementsRole();
  }
}

const user = authManager.retrieveCurrentUser();
const AdminGuardian = new AdminGuardianClass(user);
export default AdminGuardian;
