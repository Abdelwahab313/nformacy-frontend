import { ANSWER_STATUS, QUESTION_STATUS } from 'constants/questionStatus';
import authManager from 'services/authManager';
import GuardianBase from './GuardianBase';

const reviewAnswersQuestionStates = [
  QUESTION_STATUS.freelancerAnswers,
  QUESTION_STATUS.answersRating,
];
class AnswerGuardianClass extends GuardianBase {
  constructor(user) {
    super(user);
  }

  canManageAnswers() {
    return (
      this.isSuperAdmin() ||
      this.hasRequestsManagementsRole() ||
      this.hasQuestionsManagementsRole()
    );
  }

  canApproveAnswer(answerState) {
    if (answerState === ANSWER_STATUS.pending) {
      return this.canManageAnswers();
    }
  }

  canRollbackAnswer(answerState, questionState) {
    const rollbackableStates = [ANSWER_STATUS.accepted, ANSWER_STATUS.rejected];
    const canAnswerBeRollbacked =
      rollbackableStates.includes(answerState) &&
      reviewAnswersQuestionStates.includes(questionState);

    if (canAnswerBeRollbacked) {
      return this.canManageAnswers();
    }
  }

  canRateAnswer(answerState) {
    if (
      answerState === ANSWER_STATUS.accepted ||
      answerState === ANSWER_STATUS.rated
    ) {
      return this.isAdviser();
    }
  }

  canViewConsultantData() {}
}

const user = authManager.retrieveCurrentUser();
const AnswerGuardian = new AnswerGuardianClass(user);
export default AnswerGuardian;
