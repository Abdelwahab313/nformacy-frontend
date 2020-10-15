const messages = {
  pending_adviser_acceptance: 'New Question Assigned to you',
  answer_accepted: 'Answer #{{referenceNumber}} is ready to be Rated',
  admin_deployed_question:
    'Question #{{referenceNumber}} is posted to Question Roaster.',
  question_closed: 'Question #{{referenceNumber}} Closed',
};
export const t = (key, massageParameters) => {
  if (massageParameters) {
    return messages[key]?.replace(/{{.+}}/, massageParameters.referenceNumber);
  }
  return messages[key];
};
