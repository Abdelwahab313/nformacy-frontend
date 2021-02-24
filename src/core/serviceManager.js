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
}

export default ServiceManager;
