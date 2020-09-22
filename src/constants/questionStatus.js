

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
  },
  [questionStatus.pendingAssignment]: {
    admin: 'Assign adviser',
    adviser: '',
  },
  [questionStatus.pendingAdviserAcceptance]: {
    admin: '',
    adviser: 'Accept Question Assignment',
  },
  [questionStatus.reviewAndEdit]: {
    admin: '',
    adviser: 'Review Question',
  },
  [questionStatus.pendingDeploymentToRoaster]: {
    admin: 'Deploy Question to Roaster',
    adviser: '',
  },
  [questionStatus.freelancerAnswers]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
  },
  [questionStatus.answersRating]: {
    admin: 'Approve Answers',
    adviser: 'Rating Answers',
  },
  [questionStatus.answersRating]: {
    admin: '',
    adviser: '',
  },
};


export {
    questionStatusActions,
    questionStatus
}