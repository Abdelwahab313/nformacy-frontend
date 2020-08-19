import {
  PASSWORD,
  USER_NAME,
  BASE_URL,
  BACKEND_WEB_URL,
  ADVISER_USERNAME,
  ADVISER_PASSWORD,
  FREELANCER_USERNAME,
  FREELANCER_PASSWORD,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
} from './defualtTestValues';
import faker from 'faker';
import { camelizeKeys } from 'humps';

export const login = (email = USER_NAME, password = PASSWORD) => {
  cy.visit(BASE_URL);
  cy.get('#email').type(userName);
  cy.get('#password').type(password);
  cy.get('#login').click();
  cy.get('#header');
};
export const logout = () => {
  cy.clearLocalStorage();
};

export const createRequestWithToke = (callbackFunction) => {
  cy.request('POST', `${BACKEND_WEB_URL}/user/login`, {
    email: USER_NAME,
    password: PASSWORD,
  }).then((response) => {
    callbackFunction(response.body.token.access_token);
  });
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
