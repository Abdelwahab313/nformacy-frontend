const { RoutesPaths } = require("constants/routesPath");
const { default: getPathForNotification } = require("../notificationPathResolver");

describe('Notifications menu', () => {
  it('should return path for notification of type QuestionNotification with required param for the path', () => {
    const notification = { targetId: 1, type: 'QuestionNotification' };

    const redirectionPath = getPathForNotification(notification);

    const expectedPath = {
      path: RoutesPaths.Admin.QuestionsDetails,
      params: { questionId: notification.targetId },
    };
    expect(JSON.stringify(redirectionPath)).toEqual(
      JSON.stringify(expectedPath),
    );
  });
});
