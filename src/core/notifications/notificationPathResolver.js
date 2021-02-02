import { RoutesPaths } from '../../constants/routesPath';
import authManager from '../../services/authManager';

const getPathForNotification = (notification) => {
  let questionDetailsPath;
  if (notification.type === 'QuestionNotification') {
    if (authManager.isNormalUser()) {
      questionDetailsPath = {
        path: RoutesPaths.App.Questions,
      };
    } else {
      questionDetailsPath = {
        path: RoutesPaths.Admin.QuestionsDetails,
        params: { questionId: notification.targetId },
      };
    }
  } else if (notification.type === 'AnswerNotification') {
    questionDetailsPath = {
      path: RoutesPaths.Admin.QuestionsDetails,
      params: { questionId: notification.targetId },
    };
  }
  return questionDetailsPath;
};

export default getPathForNotification;
