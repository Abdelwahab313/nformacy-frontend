

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
  
const questionStatusActions = {
  [questionStatus.draft]: {
    admin: 'Complete Question Form',
    adviser: '',
    displayString: 'Draft'
  },
  [questionStatus.pendingAssignment]: {
    admin: 'Assign adviser',
    adviser: '',
    displayString: 'Pending Assignment'
  },
  [questionStatus.pendingAdviserAcceptance]: {
    admin: '',
    adviser: 'Accept Question Assignment',
    displayString: 'Pending Adviser Acceptance'
  },
  [questionStatus.reviewAndEdit]: {
    admin: '',
    adviser: 'Review Question',
    displayString: 'Review and Edit'
  },
  [questionStatus.pendingDeploymentToRoaster]: {
    admin: 'Deploy Question to Roaster',
    adviser: '',
    displayString: 'Pending Deployment to Roaster'
  },
  [questionStatus.freelancerAnswers]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
    displayString: 'Freelancer Answers'
  },
  [questionStatus.answersRating]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
    displayString: 'Answers Rating'
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
}