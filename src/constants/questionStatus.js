

const questionStatus = {
    pending: 'pending',
    draft: 'draft',
    pendingAssignment: 'pending_assignment',
    pendingAdviserAcceptance: 'pending_adviser_acceptance',
    reviewAndEdit: 'review_and_edit',
    pendingDeploymentToRoaster: 'pending_deployment_to_roaster',
    freelancerAnswers: 'freelancer_answers',
    answersRating: 'answers_rating',
    closed: 'closed',
  };
  
const questionStatusActions = {
  [questionStatus.pending]: {
    admin: 'Verify Request',
    adviser: '',
    displayString: 'Pending'
  },
  [questionStatus.draft]: {
    admin: 'Complete Question Form',
    adviser: '',
    displayString: 'Draft'
  },
  [questionStatus.pendingAssignment]: {
    admin: 'Assign adviser',
    adviser: '',
    displayString: 'Adviser Assignment'
  },
  [questionStatus.pendingAdviserAcceptance]: {
    admin: '',
    adviser: 'Accept Question',
    displayString: 'Adviser Acceptance'
  },
  [questionStatus.reviewAndEdit]: {
    admin: '',
    adviser: 'Review',
    displayString: 'Advisor Review'
  },
  [questionStatus.pendingDeploymentToRoaster]: {
    admin: 'Post Q to Roaster',
    adviser: '',
    displayString: 'Posting to Roaster'
  },
  [questionStatus.freelancerAnswers]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
    displayString: 'Answering'
  },
  [questionStatus.answersRating]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
    displayString: 'Rating Answers'
  },
  [questionStatus.closed]: {
    admin: '',
    adviser: '',
    displayString: 'Closed'
  },
};


export {
    questionStatusActions,
    questionStatus
};
