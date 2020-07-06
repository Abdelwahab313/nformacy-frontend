import {
  PASSWORD,
  USER_NAME,
  BASE_URL,
  BACKEND_WEB_URL,
} from './defualtTestValues';
import faker from 'faker';

export const login = (email = USER_NAME, password = PASSWORD) => {
  cy.visit(BASE_URL);
  cy.get('#email').type(userName);
  cy.get('#password').type(password);
  cy.get('#login').click();
  cy.get('#side-menu');
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
