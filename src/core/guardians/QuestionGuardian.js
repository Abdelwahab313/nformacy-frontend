import { QUESTION_STATUS } from 'constants/questionStatus';
import authManager from 'services/authManager';
import GuardianBase from './GuardianBase';

const editQuestionStates = [
  QUESTION_STATUS.draft,
  QUESTION_STATUS.pendingAssignment,
  QUESTION_STATUS.pendingAdviserAcceptance,
  QUESTION_STATUS.reviewAndEdit,
];

const noActionQuestionStates = [QUESTION_STATUS.closed];

const adviserEditQuestionStates = [
  QUESTION_STATUS.pendingAdviserAcceptance,
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
      return this.canManageQuestion() && !this.isAdviser();
    }
  }

  canUploadAttachment(questionDetails) {
    if (this.isEditiableQuestion(questionDetails) || questionDetails.state === QUESTION_STATUS.pendingDeploymentToRoaster) {
      return this.canManageQuestion();
    }
  }

  canUploadThumbnail(questionDetails) {
    if (this.isEditiableQuestion(questionDetails) || questionDetails.state === QUESTION_STATUS.pendingDeploymentToRoaster) {
      return this.canManageQuestion();
    }
  }

  isEditiableQuestion = (questionDetails) => {
    return (
      editQuestionStates.includes(questionDetails.state) || !questionDetails?.id
    );
  };

  canCreateNewQuestion() {
    return this.canManageQuestion() && !this.isAdviser();
  }

  showApplyChangesButton(questionDetails) {
    if (authManager.isAdviser()) {
      return adviserEditQuestionStates.includes(questionDetails?.state);
    } else {
      return !noActionQuestionStates.includes(questionDetails?.state);
    }
  }
}

const user = authManager.retrieveCurrentUser();
const QuestionGuardian = new QuestionGuardianClass(user);
export default QuestionGuardian;
