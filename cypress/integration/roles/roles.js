import { Then} from 'cypress-cucumber-preprocessor/steps';

Then(/^I can only see questions in navbar$/, function() {
  cy.get('#adminSidebar').contains('Questions')
  cy.get('#adminSidebar').should('not.contain', 'Dashboard')
  cy.get('#adminSidebar').should('not.contain', 'Freelancers')
  cy.get('#adminSidebar').should('not.contain', 'Clients')
  cy.get('#adminSidebar').should('not.contain', 'Meetings')
  cy.get('#adminSidebar').should('not.contain', 'Calls')
});
