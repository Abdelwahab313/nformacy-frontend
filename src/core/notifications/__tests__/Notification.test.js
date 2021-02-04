import { RoutesPaths } from 'constants/routesPath';
import UserFactorySetup from '__test__/factory/userFactory';
import getPathForNotification from '../notificationPathResolver';

describe('Notifications menu', () => {
  it('should return path for notification of type QuestionNotification with required param for the path', () => {
    UserFactorySetup.generateAdviser();
    const notification = { targetId: 1, type: 'QuestionNotification' };

    const redirectionPath = getPathForNotification(notification);

    const expectedPath = {
      pathname: RoutesPaths.Admin.QuestionsDetails,
      state: { questionId: notification.targetId },
    };
    expect(JSON.stringify(redirectionPath)).toEqual(
      JSON.stringify(expectedPath),
    );
  });
});
