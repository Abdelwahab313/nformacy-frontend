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
  clientSelection: 'client_selection',
  answersCollected: 'answers_collected',
  callScheduled: 'call_scheduled',
  callFinished: 'call_finished',
  closed: 'closed',
};

const MEETING_STATUS = {
  callScheduled: 'call_scheduled',
  callFinished: 'call_finished',
};

const EDITABLE_SERVICE_STATUS = [
  SERVICE_STATUS.draft,
  SERVICE_STATUS.pending,
  SERVICE_STATUS.returned,
];

const ANSWER_STATUS = {
  draft: 'draft',
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  rated: 'rated',
  shortlisted: 'shortlisted',
  clientSelected: 'client_selected',
};

const answerActions = {
  [ANSWER_STATUS.draft]: {
    status: {
      displayString: 'answer_draft_status',
    },
    action: {
      freelancer: 'answer_draft_action',
    },
  },
  [ANSWER_STATUS.pending]: {
    status: {
      displayString: 'answer_pending_status',
    },
    action: {},
  },
  [ANSWER_STATUS.accepted]: {
    status: {
      displayString: 'answer_accepted_status',
    },
    action: {},
  },
  [ANSWER_STATUS.rejected]: {
    status: {
      displayString: 'answer_rejected_status',
    },
    action: {},
  },
  [ANSWER_STATUS.rated]: {
    status: {
      displayString: 'answer_rated_status',
    },
    action: {
      freelancer: 'answer_rated_action',
    },
  },
  [ANSWER_STATUS.shortlisted]: {
    status: {
      displayString: 'answer_shortlisted_status',
    },
    action: {
      freelancer: 'answer_shortlisted_action',
    },
  },
  [ANSWER_STATUS.clientSelected]: {
    status: {
      displayString: 'answer_client_selected_status',
    },
    action: {
      freelancer: 'answer_clientSelected_action',
    },
  },
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
  [SERVICE_STATUS.clientSelection]: {
    status: {
      client: 'client_clientSelection_status',
      admin: 'admin_clientSelection_status',
    },
    action: {
      client: 'client_shortlisting_action',
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

const meetingStatusActions = {
  [MEETING_STATUS.callScheduled]: {
    status: {
      client: 'client_callScheduled_status',
      freelancer: 'client_callScheduled_status',
      admin: 'admin_callScheduled_status',
    },
    action: {
      client: 'client_callScheduled_action',
      freelancer: 'client_callScheduled_action',
    },
  },
  [MEETING_STATUS.callFinished]: {
    status: {
      client: 'client_callFinished_status',
      freelancer: 'client_callFinished_status',
      admin: 'admin_callFinished_status',
    },
    action: {
      client: 'client_callFinished_action',
      freelancer: 'client_callFinished_action',
    },
  },
  [SERVICE_STATUS.closed]: {
    status: {
      client: 'client_evaluationClosed_status',
      freelancer: 'client_evaluationClosed_status',
      admin: 'admin_evaluationClosed_status',
    },
    action: {},
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
  ANSWER_STATUS,
  EDITABLE_SERVICE_STATUS,
  meetingStatusActions,
  questionStatusActions,
  serviceActions,
  answerActions,
};
