import {
  PASSWORD,
  USER_NAME,
  BASE_URL,
  BACKEND_WEB_URL,
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
    username: USER_NAME,
    password: PASSWORD,
  }).then((response) => {
    callbackFunction(response.body.token.access_token);
  });
};

export const signUpAndSetTokens = (role = 'freelancer') => {
  cy.request('POST', BACKEND_WEB_URL + '/users', {
    first_name: faker.name.findName(),
    last_name: faker.name.findName(),
    email: faker.internet.email(),
    password: 'testtest',
    role: role,
  }).then((response) => {
    cy.setLocalStorage('tokens', JSON.stringify(response.body.token));
    cy.setLocalStorage('user', JSON.stringify(response.body.user));
    cy.wrap(response.body.user).as('user');
  });
};

export const createDayAvailableForUser = (dayFormatted, startTime, endTime) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('tokens'));
  cy.request({
      method: 'PUT',
      url: `${BACKEND_WEB_URL}/users/${currentUser.id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: {
        'free_dates': {
          [dayFormatted]: {
            intervals: {
              from: startTime,
              to: endTime,
            },
          },
        },
      },
    },
  ).then((response) => {
    cy.setLocalStorage('user', JSON.stringify(camelizeKeys(response.body)));

    cy.wrap(response.body.user).as('user');
  });
};
