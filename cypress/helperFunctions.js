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
import { camelizeKeys } from 'humps';
import UserFactory from './factories/userFactory';
import moment from 'moment';

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

const extractUserAndTokenFromResponse = (response) => {
  const camelizeKeysResponse = camelizeKeys(response);
  const { user, token } = camelizeKeysResponse.body;
  cy.setLocalStorage('tokens', JSON.stringify(token));
  cy.setLocalStorage('user', JSON.stringify(user));
  cy.wrap(response.body.user).as('user');
};

export const signUpAndSetTokens = (user = {}) => {
  cy.request('POST', `${BACKEND_WEB_URL}/users`, UserFactory(user)).then(
    (response) => {
      extractUserAndTokenFromResponse(response);
    },
  );
};

export const loginInAsFreelancer = () => {
  cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
    email: FREELANCER_USERNAME,
    password: FREELANCER_PASSWORD,
  }).then((response) => {
    extractUserAndTokenFromResponse(response);
  });
};

export const loginAsAnAdvisor = (adviser = ADVISER_USERNAME) => {
  cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
    email: adviser,
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

export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const clearLocalStorage = () => {
  localStorage.clear();
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
  return moment()
    .add(hours, 'hours')
    .toString();
};
