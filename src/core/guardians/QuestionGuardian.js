import { QUESTION_STATUS } from 'constants/questionStatus';
import authManager from 'services/authManager';
import GuardianBase from './GuardianBase';

const editQuestionStates = [
  QUESTION_STATUS.draft,
  QUESTION_STATUS.pendingAssignment,
  QUESTION_STATUS.pendingAdviserAcceptance,
  QUESTION_STATUS.reviewAndEdit,
];

const isEditiableQuestion = (questionDetails) =>
  editQuestionStates.includes(questionDetails.state) || !questionDetails?.id;

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

  isQuestionEditDisabled () {
    
  }

  canDeployQuestion(questionDetails) {
    if (questionDetails.state === QUESTION_STATUS.pendingDeploymentToRoaster) {
      return this.canManageQuestion() && !this.isAdviser();
    }
  }

  canUploadAttachment(questionDetails) {
    if (isEditiableQuestion(questionDetails)) {
      return this.canManageQuestion();
    }
  }

  canUploadThumbnail(questionDetails) {
    if (isEditiableQuestion(questionDetails)) {
      return this.canManageQuestion();
    }
  }

  canCreateNewQuestion() {
    return this.canManageQuestion() && !this.isAdviser();
  }
}

const user = authManager.retrieveCurrentUser();
const QuestionGuardian = new QuestionGuardianClass(user);
export default QuestionGuardian;
