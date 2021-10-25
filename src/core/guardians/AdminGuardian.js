import authManager from 'services/authManager';
import { IS_Nformacy_APP } from 'settings';
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
    return !IS_Nformacy_APP && this.isSuperAdmin();
  }

  showProjectManagersPanel() {
    return !IS_Nformacy_APP && this.isSuperAdmin();
  }

  showClientsPanel() {
    return this.isSuperAdmin() || this.hasClientsManagementsRole();
  }

  showConsultantsPanel() {
    return this.isSuperAdmin() || this.hasConsultantsManagementsRole();
  }

  showConsultantsVerificationsPanel() {
    return (
      IS_Nformacy_APP &&
      (this.isSuperAdmin() || this.hasConsultantsManagementsRole())
    );
  }

  showAdvisersPanel() {
    // TODO return this temporariy after show how will the product will be
    return (
      IS_Nformacy_APP &&
      (this.isSuperAdmin() || this.hasAdvisorsManagementsRole())
    );
  }
}

const user = authManager.retrieveCurrentUser();
const AdminGuardian = new AdminGuardianClass(user);
export default AdminGuardian;
