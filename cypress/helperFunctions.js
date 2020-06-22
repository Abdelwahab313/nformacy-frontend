import {
  PASSWORD,
  USER_NAME,
  BASE_URL,
  BACKEND_WEB_URL,
} from './defualtTestValues';

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
