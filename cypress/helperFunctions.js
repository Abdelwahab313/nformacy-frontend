import {
  PASSWORD,
  USER_NAME,
  BASE_URL,
  BACKEND_WEB_URL,
} from './defualtTestValues';

export const login = (userName = USER_NAME, password = PASSWORD) => {
  cy.visit(BASE_URL);
  cy.get('#username').type(userName);
  cy.get('#password').type(password);
  cy.get('#login').click();
  cy.get('#side-menu');
};
export const logout = () => {
  cy.clearLocalStorage();
};

export const generateRandomString = (length = 10, isNumber = false) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  for (let i = 0; i < length; i++) {
    result += isNumber
      ? numbers.charAt(Math.floor(Math.random() * numbers.length))
      : characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateRandomDecimal = (min = 1, max = 100) => {
  return Math.round((Math.random() * max + min) * 100) / 100;
};

export const searchForItemInTable = (itemName) => {
  const searchBtnCss =
    'div.MuiPaper-root >div.MuiToolbar-root.MuiToolbar-gutters>  div > button:nth-child(1)';
  cy.get(searchBtnCss).click();
  const searchInputCss =
    'div.MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters>div> div > div > div > input';
  cy.get(searchInputCss).type(itemName);
};

export const createRequestWithToke = (callbackFunction) => {
  cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
    username: USER_NAME,
    password: PASSWORD,
  }).then((response) => {
    callbackFunction(response.body.token.access_token);
  });
};
