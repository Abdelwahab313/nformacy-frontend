/// <reference types="Cypress" />

context.skip('Home Page', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });
  describe('Home page elements', () => {
    it('should have all client table', () => {
      cy.get('#all-client');
    });
    it('should have three client id', () => {
      cy.get('#client-1');
      cy.get('#client-2');
      cy.get('#client-3');
    });
    it('should have 7 cells in the table', () => {
      cy.get('#client-1 > th:nth-child(1)');
      cy.get('#client-1 > th:nth-child(2)');
      cy.get('#client-1 > th:nth-child(3)');
      cy.get('#client-1 > th:nth-child(4)');
      cy.get('#client-1 > th:nth-child(5)');
      cy.get('#client-1 > th:nth-child(6)');
      cy.get('#client-1 > th:nth-child(7)');
    });
    it('should click details link', () => {
      cy.get('#details').click();
    });
  });
});
