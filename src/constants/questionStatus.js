const QUESTION_STATUS = {
  draft: 'draft',
  pendingAssignment: 'pending_assignment',
  pendingAdviserAcceptance: 'pending_adviser_acceptance',
  reviewAndEdit: 'review_and_edit',
  pendingDeploymentToRoaster: 'pending_deployment_to_roaster',
  freelancerAnswers: 'freelancer_answers',
  answersRating: 'answers_rating',
  shortlisting: 'shortlisting',
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
  [SERVICE_STATUS.draft]: {
    status: {
      client: 'client_draft_status',
    },
    action: {
      client: 'client_draft_action',
    },
  },
  [SERVICE_STATUS.pending]: {
    status: {
      client: 'client_pending_status',
      admin: 'admin_pending_status',
    },
    action: {
      admin: 'admin_pending_action',
    },
  },
  [SERVICE_STATUS.returned]: {
    status: {
      client: 'client_returned_status',
      admin: 'admin_returned_status',
    },
    action: {
      client: 'client_returned_action',
    },
  },
  [SERVICE_STATUS.questionStarted]: {
    status: {
      client: 'client_questionStarted_status',
      admin: 'admin_questionStarted_status',
    },
    action: {
      admin: 'admin_questionStarted_action',
    },
  },
  [SERVICE_STATUS.answersCollected]: {
    status: {
      client: 'client_answersCollected_status',
      admin: 'admin_questionStarted_status',
    },
    action: {
      client: 'client_answersCollected_action',
    },
  },
};

const questionStatusActions = {
  [QUESTION_STATUS.draft]: {
    status: {
      displayString: 'Draft',
    },
    action: {
      admin: 'Complete Question Form',
    },
  },
  [QUESTION_STATUS.pendingAssignment]: {
    status: {
      displayString: 'Adviser Assignment',
    },
    action: {
      admin: 'Assign adviser',
      adviser: '',
    },
  },
  [QUESTION_STATUS.pendingAdviserAcceptance]: {
    status: {
      displayString: 'Adviser Acceptance',
    },
    action: {
      admin: '',
      adviser: 'Accept Question',
    },
  },
  [QUESTION_STATUS.reviewAndEdit]: {
    status: {
      displayString: 'Advisor Review',
    },
    action: {
      admin: '',
      adviser: 'Review',
    },
  },
  [QUESTION_STATUS.pendingDeploymentToRoaster]: {
    status: {
      displayString: 'Posting to Roaster',
    },
    action: {
      admin: 'Post Q to Roaster',
      adviser: '',
    },
  },
  [QUESTION_STATUS.freelancerAnswers]: {
    status: {
      displayString: 'Answering',
    },
    action: {
      admin: 'Approve Answers',
      adviser: 'Rating Answers',
    },
  },
  [QUESTION_STATUS.answersRating]: {
    status: {
      displayString: 'Rating Answers',
    },
    action: {
      admin: 'Approve Answers',
      adviser: 'Rating Answers',
    },
  },
  [QUESTION_STATUS.shortlisting]: {
    status: {
      displayString: 'Short Listing',
    },
    action: {
      admin: 'Short List Candidates',
      adviser: '',
    },
  },
  [QUESTION_STATUS.closed]: {
    status: {
      displayString: 'Closed',
    },
    action: {
      admin: '',
      adviser: '',
    },
  },
};

export {
  QUESTION_STATUS,
  SERVICE_STATUS,
  questionStatusActions,
  serviceActions,
};
