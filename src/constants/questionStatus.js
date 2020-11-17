const QUESTION_STATUS = {
  draft: 'draft',
  pendingAssignment: 'pending_assignment',
  pendingAdviserAcceptance: 'pending_adviser_acceptance',
  reviewAndEdit: 'review_and_edit',
  pendingDeploymentToRoaster: 'pending_deployment_to_roaster',
  freelancerAnswers: 'freelancer_answers',
  answersRating: 'answers_rating',
  closed: 'closed',
};

const SERVICE_STATUS = {
  draft: 'draft',
  pending: 'pending',
  returned: 'returned_to_client',
  questionStarted: 'question_started',
  answersCollected: 'answers_collected',
};

const serviceActions = {
  client: {
    [SERVICE_STATUS.draft]: {
      action: 'client_draft_action',
      status: 'client_draft_status',
    },
    [SERVICE_STATUS.pending]: {
      action: '',
      status: 'client_pending_status',
    },
    [SERVICE_STATUS.returned]: {
      action: 'client_returned_action',
      status: 'client_returned_status',
    },
    [SERVICE_STATUS.questionStarted]: {
      action: '',
      status: 'client_questionStarted_status',
    },
    [SERVICE_STATUS.answersCollected]: {
      action: 'client_answersCollected_action',
      status: 'client_answersCollected_status',
    },
  },
  admin: {
    [SERVICE_STATUS.pending]: {
      action: 'admin_pending_action',
      status: 'admin_pending_status',
    },
    [SERVICE_STATUS.returned]: {
      action: '',
      status: 'admin_returned_status',
    },
    [SERVICE_STATUS.answersCollected]: {
      action: 'admin_questionStarted_action',
      status: 'admin_questionStarted_status',
    },
  },
};

const questionStatusActions = {
  [QUESTION_STATUS.draft]: {
    admin: 'Complete Question Form',
    adviser: '',
    displayString: 'Draft',
  },
  [QUESTION_STATUS.pendingAssignment]: {
    admin: 'Assign adviser',
    adviser: '',
    displayString: 'Adviser Assignment',
  },
  [QUESTION_STATUS.pendingAdviserAcceptance]: {
    admin: '',
    adviser: 'Accept Question',
    displayString: 'Adviser Acceptance',
  },
  [QUESTION_STATUS.reviewAndEdit]: {
    admin: '',
    adviser: 'Review',
    displayString: 'Advisor Review',
  },
  [QUESTION_STATUS.pendingDeploymentToRoaster]: {
    admin: 'Post Q to Roaster',
    adviser: '',
    displayString: 'Posting to Roaster',
  },
  [QUESTION_STATUS.freelancerAnswers]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
    displayString: 'Answering',
  },
  [QUESTION_STATUS.answersRating]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
    displayString: 'Rating Answers',
  },
  [QUESTION_STATUS.closed]: {
    admin: '',
    adviser: '',
    displayString: 'Closed',
  },
};

export {
  QUESTION_STATUS,
  SERVICE_STATUS,
  questionStatusActions,
  serviceActions,
};
