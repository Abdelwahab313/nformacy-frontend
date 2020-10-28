import { render, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../../auth/context/auth';
import { LocaleProvider } from '../../../../../hooks/localization/context';
import { fetchQuestionDetails } from '../../../../../apis/questionsAPI';
import React from 'react';
import QuestionDetails from '../index';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

jest.mock('apis/questionsAPI', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  fetchQuestionDetails: jest.fn().mockResolvedValue({
    data: {
      assignedAdviserId: 2,
      assignmentType: 'project',
      content:
        'From the viewpoint of what you can do, therefore, languages do differ - but the differences are limited. For example, Python and Ruby provide almost the same power to the programmer.',
      createdAt: '2020-09-14T09:25:55.689Z',
      currentActionTime: '2020-09-14T22:02:28.411Z',
      field: [{ value: 'marketingAndPR', label: 'Marketing and PR' }],
      hoursToCloseAnswers: null,
      hoursToReviewAndEdit: null,
      id: 1,
      industry: { value: 'consulting', label: 'Consulting' },
      isApproved: true,
      mediaId: null,
      referenceNumber: 2000100,
      state: 'pending_adviser_acceptance',
      subfield: [{ value: 'marketResearch', label: 'Market Research' }],
      title: 'Elmer',
      answers: [
        {
          content: 'test content',
        },
      ],
    },
  }),
}));


jest.mock('apis/fieldsAPI', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  fetchFields: jest.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        label: 'Finance',
      },
      {
        id: 2,
        label: 'Marketing',
      },
      {
        id: 3,
        label: 'FinTech',
      },
      {
        id: 4,
        label: 'Accounting',
      },
    ],
  }),
}));

it('should match snapshot', async () => {
  const history = createMemoryHistory();
  history.push('/', { questionId: 1 });
  const { asFragment } = render(
    <Router history={history}>
      <AuthProvider>
        <LocaleProvider initialLocale={'en'}>
          <QuestionDetails />
        </LocaleProvider>
      </AuthProvider>
    </Router>,
  );
  await waitFor(() => expect(fetchQuestionDetails).toHaveBeenCalledTimes(1));
  expect(asFragment()).toMatchSnapshot();
});
