import {
  ADVISER_PASSWORD,
  ADVISER_USERNAME,
  BACKEND_WEB_URL,
} from '../../defualtTestValues';
import {
  getFromLocalStorage,
  requestWithTokenAsAdmin,
  setToLocalStorage,
} from '../../helperFunctions';
import { getFakeQuestion } from '../../factories/questionFactory';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { getFakeAnswer } from '../../factories/answerFactory';

export const createQuestion = (question = {}, n = 1) => {
  requestWithTokenAsAdmin((token) => {
    for (let i = 0; i < n; i++) {
      const newQuestionParams = getFakeQuestion(question);
      delete newQuestionParams.id;
      cy.request({
        method: 'POST',
        url: `${BACKEND_WEB_URL}/questions/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: decamelizeKeys(newQuestionParams),
      }).then((response) => {
        setToLocalStorage('createdQuestion', camelizeKeys(response.body));
      });
    }
  });
};

export const createQuestionWithState = (question = {}) => {
  const newQuestionParams = getFakeQuestion(question);
  delete newQuestionParams.id;
  return requestWithTokenAsAdmin((token) => {
    return cy
      .request({
        method: 'POST',
        url: `${BACKEND_WEB_URL}/questions/save`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: decamelizeKeys(newQuestionParams),
      })
      .then((response) => {
        const createdQuestion = camelizeKeys(response.body);
        cy.request({
          method: 'PUT',
          url: `${BACKEND_WEB_URL}/questions/${createdQuestion.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: decamelizeKeys(newQuestionParams),
        }).then((response) => {
          setToLocalStorage('createdQuestion', camelizeKeys(response.body));
        });
      });
  });
};

export const createAnswer = (questionId, answer = {}) => {
  const newAnswerParams = getFakeAnswer(answer);
  delete newAnswerParams.id;
  return requestWithTokenAsAdmin((token) => {
    return cy
      .request({
        method: 'POST',
        url: `${BACKEND_WEB_URL}/questions/${questionId}/answer`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: decamelizeKeys(newAnswerParams),
      })
      .then((response) => {
        return response.body;
      });
  });
};

export const createQuestionWithAnswers = () => {
  const newQuestionParams = getFakeQuestion({ state: 'freelancer_answers' });
  delete newQuestionParams.id;
  requestWithTokenAsAdmin((token) => {
    cy.request({
      method: 'POST',
      url: `${BACKEND_WEB_URL}/questions/save`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  });
};

export const createDeployedQuestion = () => {
  cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
    email: ADVISER_USERNAME,
    password: ADVISER_PASSWORD,
  }).then(() => {
    createQuestionWithState({
      state: 'pending_deployment_to_roaster',
      current_action_time: '',
    }).then(() => {
      const createdQuestion = getFromLocalStorage('createdQuestion');
      const existingAdminToken = Cypress.env('adminTokens');
      cy.request({
        method: 'POST',
        url: `${BACKEND_WEB_URL}/questions/${createdQuestion.id}/deploy`,
        headers: {
          Authorization: `Bearer ${existingAdminToken}`,
        },
      });
    });
  });
};

export const createDraftQuestion = (question = {}) => {
  return requestWithTokenAsAdmin((token) => {
    const newQuestionParams = getFakeQuestion({
      ...question,
      id: null,
      state: 'draft',
      assigned_adviser_id: null,
    });
    return cy
      .request({
        method: 'POST',
        url: `${BACKEND_WEB_URL}/questions/save`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: decamelizeKeys(newQuestionParams),
      })
      .then((response) => {
        setToLocalStorage('createdQuestion', camelizeKeys(response.body));
      });
  });
};

export const assignAdviserToQuestion = (questionId, adviserId) => {
  return requestWithTokenAsAdmin((token) => {
    cy.request({
      method: 'PUT',
      url: `${BACKEND_WEB_URL}/questions/${questionId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: decamelizeKeys({ assigned_adviser_id: adviserId }),
    }).then((response) => {
      setToLocalStorage('createdQuestion', camelizeKeys(response.body));
    });
  });
};
