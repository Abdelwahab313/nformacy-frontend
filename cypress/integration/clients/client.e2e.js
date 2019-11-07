/// <reference types="Cypress" />

context.skip('Client Page', () => {
  before(() => {
    cy.visit('http://localhost:3000/clients/1/');
  });
  describe('Home page elements', () => {
    it('should have all clients table', () => {
      cy.get('#title');
    });
    it('should have client information section', () => {
      cy.get('#client-info');
    });
    it('should have client image section', () => {
      cy.get('#client-image');
    });
    it('should have client map section', () => {
      cy.get('#client-location');
    });
  });
});
