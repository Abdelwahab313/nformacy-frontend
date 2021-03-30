import { QUESTION_STATUS } from "constants/questionStatus";

export const HOURS_FOR_ACTION = 12;

class QuestionManager {
  static getTotalActionTime(state, reviewAndEditHours, hoursToCloseAnswers) {
    if (state === QUESTION_STATUS.reviewAndEdit) {
      return reviewAndEditHours;
    } else if (
      state === QUESTION_STATUS.freelancerAnswers ||
      state === QUESTION_STATUS.answersRating
    ) {
      return hoursToCloseAnswers;
    } else if (state === QUESTION_STATUS.pendingAdviserAcceptance) {
      return HOURS_FOR_ACTION;
    } else {
      return '';
    }
  }
}

export default QuestionManager;
