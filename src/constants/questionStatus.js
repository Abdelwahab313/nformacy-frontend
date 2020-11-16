const questionStatus = {
  draft: 'draft',
  pendingAssignment: 'pending_assignment',
  pendingAdviserAcceptance: 'pending_adviser_acceptance',
  reviewAndEdit: 'review_and_edit',
  pendingDeploymentToRoaster: 'pending_deployment_to_roaster',
  freelancerAnswers: 'freelancer_answers',
  answersRating: 'answers_rating',
  closed: 'closed',
};

const serviceStatus = {
  draft: 'draft',
  pending: 'pending',
  returned: 'returned_to_client',
  questionStarted: 'question_started',
  answersCollected: 'answers_collected',
};

const serviceActions = {
  client: {
    [serviceStatus.draft]: {
      action: 'client_draft_action',
      status: 'client_draft_status',
    },
    [serviceStatus.pending]: {
      action: '',
      status: 'client_pending_status',
    },
    [serviceStatus.returned]: {
      action: 'client_returned_action',
      status: 'client_returned_status',
    },
    [serviceStatus.questionStarted]: {
      action: '',
      status: 'client_questionStarted_status',
    },
    [serviceStatus.answersCollected]: {
      action: 'client_answersCollected_action',
      status: 'client_answersCollected_status',
    },
  },
  admin: {
    [serviceStatus.pending]: {
      action: 'admin_pending_action',
      status: 'admin_pending_status',
    },
    [serviceStatus.returned]: {
      action: '',
      status: 'admin_returned_status',
    },
    [serviceStatus.answersCollected]: {
      action: 'admin_questionStarted_action',
      status: 'admin_questionStarted_status',
    },
  },
};

const questionStatusActions = {
  [questionStatus.draft]: {
    admin: 'Complete Question Form',
    adviser: '',
    displayString: 'Draft',
  },
  [questionStatus.pendingAssignment]: {
    admin: 'Assign adviser',
    adviser: '',
    displayString: 'Adviser Assignment',
  },
  [questionStatus.pendingAdviserAcceptance]: {
    admin: '',
    adviser: 'Accept Question',
    displayString: 'Adviser Acceptance',
  },
  [questionStatus.reviewAndEdit]: {
    admin: '',
    adviser: 'Review',
    displayString: 'Advisor Review',
  },
  [questionStatus.pendingDeploymentToRoaster]: {
    admin: 'Post Q to Roaster',
    adviser: '',
    displayString: 'Posting to Roaster',
  },
  [questionStatus.freelancerAnswers]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
    displayString: 'Answering',
  },
  [questionStatus.answersRating]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
    displayString: 'Rating Answers',
  },
  [questionStatus.closed]: {
    admin: '',
    adviser: '',
    displayString: 'Closed',
  },
};

export { questionStatusActions, questionStatus, serviceActions };
