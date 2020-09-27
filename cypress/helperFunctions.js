import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  ADVISER_PASSWORD,
  ADVISER_USERNAME,
  BACKEND_WEB_URL,
  BASE_URL,
  FREELANCER_PASSWORD,
  FREELANCER_USERNAME,
  PASSWORD,
  USER_NAME,
} from './defualtTestValues';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { getFakeQuestion } from './factories/questionFactory';
import { getFakeAnswer } from './factories/answerFactory';

export const login = (email = USER_NAME, password = PASSWORD) => {
  cy.visit(BASE_URL);
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#login').click();
  cy.get('#header');
};

export const logout = () => {
  cy.clearLocalStorage();
};

export const requestWithTokenAsAdmin = (callbackFunction) => {
  const existingAdminToken = Cypress.env('adminTokens');
  if (!!existingAdminToken) {
    return callbackFunction(existingAdminToken);
  } else {
    return cy
      .request('POST', `${BACKEND_WEB_URL}/auth/login`, {
        email: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      })
      .then((response) => {
        Cypress.env('adminTokens', response.body.token);
        callbackFunction(response.body.token);
      });
  }
};

export const signUpAndSetTokens = () => {
  cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
    email: FREELANCER_USERNAME,
    password: FREELANCER_PASSWORD,
  })
    .then((response) => camelizeKeys(response))
    .then((response) => {
      cy.setLocalStorage('tokens', JSON.stringify(response.body.token));
      cy.setLocalStorage('user', JSON.stringify(response.body.user));
      cy.wrap(response.body.user).as('user');
    });
};

export const loginAsAnAdvisor = () => {
  cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
    email: ADVISER_USERNAME,
    password: ADVISER_PASSWORD,
  })
    .then((response) => camelizeKeys(response))
    .then((response) => {
      cy.setLocalStorage('tokens', JSON.stringify(response.body.token));
      cy.setLocalStorage('user', JSON.stringify(response.body.user));
      cy.wrap(response.body.user).as('user');
    });
};

export const loginAsAdmin = () => {
  cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
    email: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
  })
    .then((response) => camelizeKeys(response))
    .then((response) => {
      cy.setLocalStorage('tokens', JSON.stringify(response.body.token));
      cy.setLocalStorage('user', JSON.stringify(response.body.user));
      cy.wrap(response.body.user).as('user');
    });
};

export const createQuestion = (question = {}) => {
  const newQuestionParams = getFakeQuestion(question);
  delete newQuestionParams.id;
  requestWithTokenAsAdmin((token) => {
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
  });
};

export const createQuestionWithState = (question = {}) => {
  const newQuestionParams = getFakeQuestion(question);
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

export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const clearLocalStorage = () => {
  localStorage.clear();
};

const createAnswer = (questionId, answer = {}) => {
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
  const newQuestionParams  = getFakeQuestion({ state: 'freelancer_answers' });
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

export const createDayAvailableForUser = (dayFormatted, startDate, endDate) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('tokens'));
  cy.request({
    method: 'PUT',
    url: `${BACKEND_WEB_URL}/users/${currentUser.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      free_dates: [
        { id: 0, title: dayFormatted, startDate: startDate, endDate: endDate },
      ],
    },
  }).then((response) => {
    cy.setLocalStorage('user', JSON.stringify(camelizeKeys(response.body)));

    cy.wrap(response.body.user).as('user');
  });
};

export const getDateAfterHours = (hours) => {
  let d = new Date();
  d.setHours(d.getHours() + hours);
  return d.toGMTString();
};
