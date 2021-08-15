import { ASSIGNEMNT_TYPES } from 'constants/questionStatus';
import authManager from 'services/authManager';

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
}

export default ServiceManager;
