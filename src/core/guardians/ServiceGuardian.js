import { SERVICE_STATUS } from 'constants/questionStatus';
import authManager from 'services/authManager';
import GuardianBase from './GuardianBase';

const clientEditServiceStates = [SERVICE_STATUS.draft, SERVICE_STATUS.returned];
class ServiceGuardianClass extends GuardianBase {
  constructor(user) {
    super(user);
  }

  isNewServiceRequest(serviceRequest) {
    return !serviceRequest.id;
  }

  showApplyChangesButton(serviceRequest) {
    if (this.isClient()) {
      return (
        clientEditServiceStates.includes(serviceRequest.state) ||
        this.isNewServiceRequest(serviceRequest)
      );
    }
  }
}

const user = authManager.retrieveCurrentUser();
const ServiceGuardian = new ServiceGuardianClass(user);
export default ServiceGuardian;
