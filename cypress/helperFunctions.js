import {
  PASSWORD,
  USER_NAME,
  BASE_URL,
  BACKEND_WEB_URL,
} from './defualtTestValues';
import faker from 'faker';
import moment from 'moment';

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

export const signUpAndSetTokens = () => {
  cy.request('POST', BACKEND_WEB_URL + '/users', {
    first_name: faker.name.findName(),
    last_name: faker.name.findName(),
    email: faker.internet.email(),
    password: 'testtest',
  }).then((response) => {
    cy.setLocalStorage('tokens', JSON.stringify(response.body.token));
    cy.setLocalStorage('user', JSON.stringify(response.body.user));
    cy.wrap(response.body.user).as('user');
  });
};

export const createDayAvailableForUser = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('tokens'));
  cy.request({
      method: 'PUT',
      url: `${BACKEND_WEB_URL}/users/${currentUser.id}`,
      headers: {
        'Token': `Bearer ${token}`,
      },
      body: {
        'free_dates': {
          '20200728': {
            intervals: {
              from: moment('20200728', 'YYYYMMDD').set('hours', 10).format('x'),
              to: moment('20200728', 'YYYYMMDD').set('hours', 16).format('x'),
            },
          },
        },
      },
    },
  ).then((response) => {
    cy.setLocalStorage('user', JSON.stringify(response.body));

    cy.wrap(response.body.user).as('user');
  });
};
