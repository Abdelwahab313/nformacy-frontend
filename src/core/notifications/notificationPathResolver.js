import { getQuestionDetails } from 'services/navigation';

// const NOTIFICATIONS_TYPES = {
//   QuestionNotification: 'QuestionNotification',
//   AnswerNotification: 'AnswerNotification',
//   ServiceRequestNotification: 'ServiceRequestNotification',
// };

// const MESSAGE_KEYS = {
//   // question messages
//   pendingAdviserAcceptance: 'pending_adviser_acceptance',
//   adminDeployedQuestion: 'admin_deployed_question',
//   questionClosed: 'question_closed',

//   // services messages
//   submittedToAdmin: 'submitted_to_admin',
//   returnedToClient: 'returned_back_to_client',
//   questionStarted: 'question_started',

//   // answers messages
// };

// const notificationsRedirectPaths = {
//   [MESSAGE_KEYS.pendingAdviserAcceptance]: (targetId) =>
//     getQuestionDetailsLink(targetId),
//   [MESSAGE_KEYS.pendingAdviserAcceptance]: (targetId) =>
//     getQuestionDetailsLink(targetId),
// };

const getPathForNotification = (notification) => {
  let questionDetailsPath;
  questionDetailsPath = getQuestionDetails(notification.targetId);
  return questionDetailsPath;
};

export default getPathForNotification;
