import authManager from 'services/authManager';
import GuardianBase from './GuardianBase';

class ServiceGuardianClass extends GuardianBase {
  constructor(user) {
    super(user);
  }

  canModifyServiceRequest() {
    return this.isClient();
  }

  canViewServiceRequest() {
    return this.isClient();
  }

  canModifyComment() {
    return this.isClient();
  }

  canUploadThumbnail(questionDetails) {
    if (isEditiableQuestion(questionDetails)) {
      return this.canManageQuestion();
    }
  }
}

const user = authManager.retrieveCurrentUser();
const ServiceGuardian = new ServiceGuardianClass(user);
export default ServiceGuardian;
