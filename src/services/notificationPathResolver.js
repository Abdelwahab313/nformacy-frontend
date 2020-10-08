import { RoutesPaths } from '../constants/routesPath';

const getPathForNotification = (notification) => {
  if (notification.type === 'QuestionNotification')
    return {
      path: RoutesPaths.Admin.QuestionsDetails,
      params: { questionId: notification.targetId },
    };
};

export default getPathForNotification;
