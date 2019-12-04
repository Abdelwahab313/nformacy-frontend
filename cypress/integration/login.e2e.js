/// <reference types="Cypress" />
const WEB_URL = 'http://localhost:3000/';
context('Main Screen', () => {
  beforeEach(() => {
    cy.visit(WEB_URL);
    // cy.clearLocalStorage('user');
    // cy.clearLocalStorage('tokens');
  });
  describe('Login Scenario', () => {
    it('should login using admin credentials', () => {
      cy.get('#username').type('yahya');
      cy.get('#password').type('adminadmin');
      cy.get('#login').click();
      cy.get('#side-menu');
    });
    it('should not login if  admin credentials are wrong', async () => {
      cy.get('#username').type('root');
      cy.get('#password').type('xxxxx');
      cy.get('#login').click();
      cy.get('#loginFailedMessage');
      // cy.url().eq('http://localhost:3000/login');
    });
    // afterEach(() => {
    //   cy.reload();
    // });
  });
});
