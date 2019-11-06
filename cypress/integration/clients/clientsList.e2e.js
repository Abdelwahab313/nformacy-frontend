/// <reference types="Cypress" />

context('Home Page', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });
  describe('Home page elements', () => {
    it('should have all clients table', () => {
      cy.get('#all-clients');
    });
  });
});
