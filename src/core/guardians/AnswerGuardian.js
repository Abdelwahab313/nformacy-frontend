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

  canApproveAnswer(answer) {
    if (answer?.state === ANSWER_STATUS.pending) {
      return this.canManageAnswers();
    }
  }

  canRollbackAnswer(answer, question) {
    const rollbackableStates = [ANSWER_STATUS.accepted, ANSWER_STATUS.rejected];
    const canAnswerBeRollbacked =
      rollbackableStates.includes(answer.state) &&
      reviewAnswersQuestionStates.includes(question?.state);

    if (canAnswerBeRollbacked) {
      return this.canManageAnswers();
    }
  }

  canRateAnswer(answer) {
    if (
      answer.state === ANSWER_STATUS.accepted ||
      answer.state === ANSWER_STATUS.rated
    ) {
      return this.isAdviser();
    }
  }

  canViewConsultantData() {}
}

const user = authManager.retrieveCurrentUser();
const AnswerGuardian = new AnswerGuardianClass(user);
export default AnswerGuardian;
