import moment from 'moment';
import { ADVISER_ID } from '../defualtTestValues';

export const getFakeQuestion = (question = {}) => {
  const defaultQuestion = {
    id: 2,
    reference_number: 2000131,
    title: 'Test mocked question',
    content:
      '<p>People are different. People choose different criteria. But if there is a better way among many alternatives, I want to encourage that way by making it comfortable. So that\'s what I\'ve tried to do.</p>',
    fields: [{ 'id': 1, 'major_field_id': 1, 'label': 'Audit' }],
    industry: { value: 'consulting', label: 'Consulting' },
    language: 'en',
    media_id: null,
    assignment_type: 'call',
    current_action_time: moment().add(5, 'days'),
    created_at: '2020-09-14T09:25:55.704Z',
    hours_to_close_answers: 100,
    hours_to_review_and_edit: 24,
    assigned_adviser_id: ADVISER_ID,
    state: 'pending_adviser_acceptance',
  };

  return {
    ...defaultQuestion,
    ...question,
  };
};
