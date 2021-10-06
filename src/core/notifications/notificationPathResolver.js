import authManager from 'services/authManager';
import {
  getEditServiceDetailsLink,
  getConsultantVerificationMeetingDetails,
  getQuestionDetails,
  getServiceDetailsLink,
} from 'services/navigation';

const NOTIFICATIONS_TYPES = {
  Question: 'QuestionNotification',
  Answers: 'AnswerNotification',
  ServiceRequest: 'ServiceRequestNotification',
  MentorshipServiceRequest: 'MentorshipServiceNotification',
  Meeting: 'MeetingNotification'
};

const MESSAGE_KEYS = {
  // question messages
  pendingAdviserAcceptance: 'pending_adviser_acceptance',
  adminDeployedQuestion: 'admin_deployed_question',
  questionClosed: 'question_closed',

  // services messages
  submittedToAdmin: 'submitted_to_admin',
  returnedToClient: 'returned_back_to_client',
  questionStarted: 'question_started',

  // answers messages
};

const NotificationsPathCallback = {
  [MESSAGE_KEYS.pendingAdviserAcceptance]: getQuestionDetails,
  [MESSAGE_KEYS.adminDeployedQuestion]: getQuestionDetails,
  [MESSAGE_KEYS.returnedToClient]: getEditServiceDetailsLink,
  [MESSAGE_KEYS.submittedToAdmin]: getEditServiceDetailsLink,
};

const getPathForNotification = (notification) => {
  const { type: notificationType, messageKey, targetId, payload } = notification;
  const serviceId = payload?.serviceId;

  const redirectCallback = NotificationsPathCallback[messageKey];
  if (!!redirectCallback) {
    return redirectCallback(targetId);
  }

  if (notificationType === NOTIFICATIONS_TYPES.Question) {
    return getQuestionDetails(targetId);
  } else if (notificationType === NOTIFICATIONS_TYPES.ServiceRequest || notificationType === NOTIFICATIONS_TYPES.MentorshipServiceRequest) {
    return getServiceDetailsLink(targetId);
  } else if (notificationType === NOTIFICATIONS_TYPES.Meeting) {
    if (!!serviceId) {
      return getServiceDetailsLink(serviceId);
    }
    return getConsultantVerificationMeetingDetails(targetId);
  }
  else if (notificationType === NOTIFICATIONS_TYPES.Answers) {
    if (authManager.isNormalUser()) {
      return getQuestionDetails(targetId);
    } else {
      return getServiceDetailsLink(targetId);
    }
  }
};

export default getPathForNotification;
