import { ASSIGNEMNT_TYPES } from 'constants/questionStatus';
import authManager from 'services/authManager';
import { IS_Nformacy_APP } from 'settings';

class ServiceManager {
  static getServiceTime(service) {
    let serviceTime;
    if (authManager.isAdmin()) {
      serviceTime =
        service.activityType === 'meeting'
          ? service?.meetingTime
          : service?.currentActionTime;
    } else {
      serviceTime = service?.meetingTime;
    }
    return serviceTime;
  }

  static isMentoringService(service) {
    return service.assignmentType === ASSIGNEMNT_TYPES.mentoring;
  }

  static shouldDeployQuestionDirectly(service) {
    return (
      !IS_Nformacy_APP && service.assignmentType === ASSIGNEMNT_TYPES.question
    );
  }
}

export default ServiceManager;
