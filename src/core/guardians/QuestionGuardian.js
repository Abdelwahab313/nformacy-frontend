import { QUESTION_STATUS } from 'constants/questionStatus';
import authManager from 'services/authManager';
import GuardianBase from './GuardianBase';

const editQuestionStates = [
  QUESTION_STATUS.draft,
  QUESTION_STATUS.pendingAssignment,
  QUESTION_STATUS.reviewAndEdit,
];

class QuestionGuardianClass extends GuardianBase {
  constructor(user) {
    super(user);
  }

  canManageQuestion() {
    return (
      this.isSuperAdmin() ||
      this.hasRequestsManagementsRole() ||
      this.isAdviser() ||
      this.hasQuestionsManagementsRole()
    );
  }

  canDeployQuestion(questionDetails) {
    if (questionDetails.state === QUESTION_STATUS.pendingDeploymentToRoaster) {
      return this.canManageQuestion();
    }
  }

  canUploadAttachment(questionDetails) {
    if (editQuestionStates.includes(questionDetails.state)) {
      return this.canManageQuestion();
    }
  }

  canUploadThumbnail(questionDetails) {
    if (editQuestionStates.includes(questionDetails.state)) {
      return this.canManageQuestion();
    }
  }

  canCreateNewQuestion() {
    return this.canManageQuestion();
  }
}

const user = authManager.retrieveCurrentUser();
const QuestionGuardian = new QuestionGuardianClass(user);
export default QuestionGuardian;
