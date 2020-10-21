import React from 'react';
import { render } from '@testing-library/react';
import QuestionForm from 'pages/Admin/Questions/QuestionDetails/subComponents/QuestionForm';
import { AuthProvider } from 'pages/auth/context/auth';
import moment from 'moment';
import { QuestionProvider } from 'pages/Admin/Questions/QuestionDetails/context';

const testQuestion = {
  id: 2,
  referenceNumber: 2000131,
  title: 'Test mocked question',
  content:
    "<p>People are different. People choose different criteria. But if there is a better way among many alternatives, I want to encourage that way by making it comfortable. So that's what I've tried to do.</p>",
  field: [{ value: 'marketingAndPR', label: 'Marketing and PR' }],
  subfield: [{ value: 'marketResearch', label: 'Market Research' }],
  industry: { value: 'consulting', label: 'Consulting' },
  mediaId: null,
  assignmentType: 'call',
  currentActionTime: moment().add(5, 'days'),
  createdAt: '2020-09-14T09:25:55.704Z',
  hoursToCloseAnswers: 100,
  hoursToReviewAndEdit: 24,
  assignedAdviserId: 2,
  state: 'pending_adviser_acceptance',
};

describe('Question Form', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <AuthProvider>
        <QuestionProvider>
          <QuestionForm questionDetails={testQuestion} />
        </QuestionProvider>
      </AuthProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
