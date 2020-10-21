import { BACKEND_WEB_URL } from '../../defualtTestValues';
import { getFromLocalStorage, setToLocalStorage } from '../../helperFunctions';

import { getFakeQuestion } from '../../factories/questionFactory';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { getFakeAnswer } from '../../factories/answerFactory';
import { requestAsAdmin } from './requestHelper';

export const createQuestion = (question = {}) => {
  const newQuestionParams = getFakeQuestion(question);
  delete newQuestionParams.id;
  return requestAsAdmin({
    method: 'POST',
    url: `${BACKEND_WEB_URL}/questions/`,
    body: decamelizeKeys(newQuestionParams),
  }).then((response) => {
    setToLocalStorage('createdQuestion', camelizeKeys(response.body));
  });
};

export const createMultipleQuestion = (count) => {
  for (let i = 0; i < count; i++) {
    const newQuestionParams = getFakeQuestion();
    delete newQuestionParams.id;
    requestAsAdmin({
      method: 'POST',
      url: `${BACKEND_WEB_URL}/questions/`,
      body: decamelizeKeys(newQuestionParams),
    }).then((response) => {
      setToLocalStorage('createdQuestion', camelizeKeys(response.body));
    });
  }
};

export const createQuestionWithAccepttedAnswer = () => {
  createQuestionWithState({
    state: 'freelancer_answers',
    current_action_time: '',
  }).then(() => {
    const createdQuestion = getFromLocalStorage('createdQuestion');
    createAnswer(createdQuestion.id).then((body) => {
      requestAsAdmin({
        method: 'POST',
        url: `${BACKEND_WEB_URL}/answers/${body.id}/accept`,
      });
    });
  });
};

export const createQuestionWithState = (question = {}) => {
  const newQuestionParams = getFakeQuestion(question);
  delete newQuestionParams.id;
  return requestAsAdmin({
    method: 'POST',
    url: `${BACKEND_WEB_URL}/questions/save`,
    body: decamelizeKeys(newQuestionParams),
  }).then((response) => {
    const createdQuestion = camelizeKeys(response.body);
    requestAsAdmin({
      method: 'PUT',
      url: `${BACKEND_WEB_URL}/questions/${createdQuestion.id}`,
      body: decamelizeKeys(newQuestionParams),
    }).then((response) => {
      setToLocalStorage('createdQuestion', camelizeKeys(response.body));
    });
  });
};

export const createAnswer = (questionId, answer = {}) => {
  const newAnswerParams = getFakeAnswer(answer);
  delete newAnswerParams.id;
  return requestAsAdmin({
    method: 'POST',
    url: `${BACKEND_WEB_URL}/questions/${questionId}/answer`,
    body: decamelizeKeys(newAnswerParams),
  }).then((response) => {
    return response.body;
  });
};

export const createQuestionWithAnswers = () => {
  const newQuestionParams = getFakeQuestion({ state: 'freelancer_answers' });
  delete newQuestionParams.id;
  requestAsAdmin({
    method: 'POST',
    url: `${BACKEND_WEB_URL}/questions/save`,
    body: decamelizeKeys(newQuestionParams),
  }).then((response) => {
    setToLocalStorage('createdQuestion', camelizeKeys(response.body));
    createAnswer(response.body.id).then((answer) =>
      setToLocalStorage('pendingAnswer', camelizeKeys(answer)),
    );
    createAnswer(response.body.id, { state: 'accepted' }).then((answer) =>
      setToLocalStorage('acceptedAnswer', camelizeKeys(answer)),
    );
    createAnswer(response.body.id, { state: 'rejected' }).then((answer) =>
      setToLocalStorage('rejectedAnswer', camelizeKeys(answer)),
    );
  });
};

export const createDeployedQuestion = () => {
  createQuestionWithState({
    state: 'pending_deployment_to_roaster',
    current_action_time: '',
  }).then(() => {
    const createdQuestion = getFromLocalStorage('createdQuestion');
    requestAsAdmin({
      method: 'POST',
      url: `${BACKEND_WEB_URL}/questions/${createdQuestion.id}/deploy`,
    });
  });
};

export const createDraftQuestion = (question = {}) => {
  const newQuestionParams = getFakeQuestion({
    ...question,
    id: null,
    state: 'draft',
    assigned_adviser_id: null,
  });
  return requestAsAdmin({
    method: 'POST',
    url: `${BACKEND_WEB_URL}/questions/save`,
    body: decamelizeKeys(newQuestionParams),
  }).then((response) => {
    setToLocalStorage('createdQuestion', camelizeKeys(response.body));
  });
};

export const assignAdviserToQuestion = (questionId, adviserId) => {
  requestAsAdmin({
    method: 'PUT',
    url: `${BACKEND_WEB_URL}/questions/${questionId}`,
    body: decamelizeKeys({ assigned_adviser_id: adviserId }),
  }).then((response) => {
    setToLocalStorage('createdQuestion', camelizeKeys(response.body));
  });
};
