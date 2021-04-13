
const POINTING_ACTIVITY_TYPES = {
  questionAnswer: 'question_answer',
  screeningAnswer: 'screening_answer',
  runningCall: 'running_call',
  questionAnswerForAssign: 'question_answer_for_assign',
  assignmentDeliver: 'assignment_deliver',
};

const pointingActivityLabels = {
  [POINTING_ACTIVITY_TYPES.questionAnswer]: 'Question Answer',
  [POINTING_ACTIVITY_TYPES.screeningAnswer]: 'Screening Answer',
  [POINTING_ACTIVITY_TYPES.runningCall]: 'Running the Call',
  [POINTING_ACTIVITY_TYPES.questionAnswerForAssign]: 'Question Answer',
  [POINTING_ACTIVITY_TYPES.assignmentDeliver]: 'Assignment Deliver',
};

class PointsLogManager {
  static getPointingActivityString(activityName) {
    return pointingActivityLabels[activityName];
  }
}

export default PointsLogManager;
