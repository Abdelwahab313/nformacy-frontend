import authManager from 'services/authManager';
import GuardianBase from './GuardianBase';

class ProjectGuardianClass extends GuardianBase {
  constructor(user) {
    super(user);
  }

  canAddProject() {
    return this.isSuperAdmin();
  }

  canChangeProjectManager() {
    return this.isSuperAdmin();
  }
}

const user = authManager.retrieveCurrentUser();
const ProjectGuardian = new ProjectGuardianClass(user);
export default ProjectGuardian;
