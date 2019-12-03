import { PASSWORD, USER_NAME, WEB_URL } from './defualtTestValues';

export const login = (userName = USER_NAME, password = PASSWORD) => {
  cy.visit(WEB_URL);
  cy.get('#username').type(userName);
  cy.get('#password').type(password);
  cy.get('#login').click();
  cy.get('#side-menu');
};
export const logout = () => {
  cy.clearLocalStorage();
};

export const generateRandomString = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};

export const generateRandomNumber = (min = 1, max = 100) => {
  return Math.round((Math.random() * max + min) * 100) / 100;
};

export const searchForItemInTable = (productName) => {
  const searchBtnCss =
    'div.MuiPaper-root >div.MuiToolbar-root.MuiToolbar-gutters>  div > button:nth-child(1)';
  cy.get(searchBtnCss).click();
  const searchInputCss =
    'div.MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters>div> div > div > div > input';
  cy.get(searchInputCss).type(productName);
};
