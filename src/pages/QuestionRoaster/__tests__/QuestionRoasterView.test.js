import React from 'react';
import { render, waitFor } from '@testing-library/react';
import QuestionRoasterView from '../QuestionRoasterView';
import { fetchOpenedQuestions } from 'apis/questionsAPI';
import { AuthProvider } from '../../auth/context/auth';
import { LocaleProvider } from '../../../hooks/localization/context';

jest.mock('react-i18next', () => {
  return {
    ...require.requireActual('react-i18next'),
    useTranslation: jest.fn().mockReturnValue({
      i18n: {
        getFixedT: () => (() => {
        }),
      },
    }),
  };
});

jest.mock('apis/questionsAPI', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  fetchOpenedQuestions: jest.fn().mockResolvedValue({
    data: [
      {
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
      },
    ],
  }),
}));

describe('Question Roaster View', () => {
  it('should match snapshot', async () => {
    const { asFragment } = render(
      <AuthProvider>
        <LocaleProvider initialLocale={'en'}>
          <QuestionRoasterView/>
        </LocaleProvider>
      </AuthProvider>)
      ;
    await waitFor(() => expect(fetchOpenedQuestions).toHaveBeenCalledTimes(1));
    expect(asFragment()).toMatchSnapshot();
  });
});
