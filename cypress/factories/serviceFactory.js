export const getFakeService = (service = {}) => {
  const defaultService = {
    id: 2,
    reference_number: 2000131,
    title: 'Test mocked service',
    content:
      '<p>People are different. People choose different criteria. But if there is a better way among many alternatives, I want to encourage that way by making it comfortable. So that\'s what I\'ve tried to do.</p>',
    fields: [{ 'id': 1, 'major_field_id': 1, 'label': 'Audit' }],
    industry: { value: 'consulting', label: 'Consulting' },
    language: 'en',
    media_id: null,
    assignment_type: 'call',
    created_at: '2020-09-14T09:25:55.704Z',
    state: 'pending',
  };

  return {
    ...defaultService,
    ...service,
  };
};
