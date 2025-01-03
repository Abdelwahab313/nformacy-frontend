import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../../auth/context/auth';
import { fetchQuestionDetails } from 'apis/questionsAPI';
import QuestionDetails from '../index';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { RoutesPaths } from 'constants/routesPath';
import UserFactorySetup from '__test__/factory/userFactory';
import * as constants from 'settings';

jest.mock('components/calendar/CalendarView.js', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
}));

jest.mock('apis/questionsAPI', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  fetchQuestionDetails: jest.fn().mockResolvedValue({
    data: {
      assignedAdviserId: 2,
      assignmentType: 'project',
      content:
        'From the viewpoint of what you can do, therefore, languages do differ - but the differences are limited. For example, Python and Ruby provide almost the same power to the programmer.',
      createdAt: '2021-1-14T09:25:55.689Z',
      currentActionTime: '2021-1-14T22:02:28.411Z',
      field: [{ value: 'marketingAndPR', label: 'Marketing and PR' }],
      hoursToCloseAnswers: null,
      hoursToReviewAndEdit: null,
      id: 1,
      industry: { value: 'consulting', label: 'Consulting' },
      isApproved: true,
      mediaId: null,
      referenceNumber: 2000100,
      state: 'freelancer_answers',
      subfield: [{ value: 'marketResearch', label: 'Market Research' }],
      title: 'Elmer',
      answers: [
        {
          content: 'test content',
          createdAt: '2021-1-14T09:25:55.689Z',
          user: {
            firstName: 'ali',
            lastName: 'ahmed',
            referenceNumber: '123',
          },
        },
      ],
    },
  }),
}));

jest.mock('hooks/localization/useLocale', () =>
  jest.fn().mockReturnValue({
    locale: 'en',
  }),
);
jest.mock('context/SnackBarContext', () => ({
  useSnackBar: jest.fn().mockResolvedValue({
    showErrorMessage: jest.fn(),
  }),
}));

it('should match snapshot', async () => {
  UserFactorySetup.generateAdmin();
  constants.IS_Nformacy_APP = true;
  const history = createMemoryHistory();
  history.push(RoutesPaths.App.Dashboard, { questionId: 1 });
  const { asFragment } = render(
    <Router history={history}>
      <AuthProvider>
        <QuestionDetails />
      </AuthProvider>
    </Router>,
  );
  await waitFor(() => expect(fetchQuestionDetails).toHaveBeenCalledTimes(1));
  expect(asFragment()).toMatchSnapshot();
});
