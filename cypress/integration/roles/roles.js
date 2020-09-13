import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../defualtTestValues';

Then(/^I can only see questions in navbar$/, function() {
  cy.get('#adminSidebar').contains('Questions')
  cy.get('#adminSidebar').should('not.contain', 'Dashboard')
  cy.get('#adminSidebar').should('not.contain', 'Freelancers')
  cy.get('#adminSidebar').should('not.contain', 'Clients')
  cy.get('#adminSidebar').should('not.contain', 'Meetings')
  cy.get('#adminSidebar').should('not.contain', 'Calls')
});
When(/^i chose first question\.$/, function() {
  cy.get("td[data-testid='MuiDataTableBodyCell-2-0']").click();
});

Then(/^the edit should be saved successfully to first question$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
  cy.get('.MuiTableBody-root')
    .first()
    .find('[data-testid="MuiDataTableBodyCell-2-0"]').should(
    'have.text',
    'updatedTitle',
  );
});
