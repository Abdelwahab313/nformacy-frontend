const messages = {
  pending_adviser_acceptance:
    'New Question Assigned to you #{{referenceNumber}}',
  answer_accepted: 'Answer #{{referenceNumber}} is ready to be Rated',
  admin_deployed_question:
    'Question #{{referenceNumber}} is posted on Q Roaster.',
  question_closed: 'Question #{{referenceNumber}} Closed',
};

function getLastThreeDigits(referenceNumber) {
  return referenceNumber?.toString()?.slice(-3);
}

export const t = (key, massageParameters) => {
  if (massageParameters) {
    return messages[key]?.replace(
      /{{.+}}/,
      getLastThreeDigits(massageParameters?.referenceNumber),
    );
  }
  return messages[key];
};
