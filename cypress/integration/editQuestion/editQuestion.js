import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../defualtTestValues';

When(/^i chose a question\.$/, function() {
  cy.get('.MuiTableBody-root')
    .first()
    .find('#editSummary')
    .click();
});
When(/^i edit question title$/, function() {
  cy.get('#title').clear();
  cy.get('#title').type('updatedTitle');
});
When(/^i click update question$/, function() {
  cy.get('#updateQuestion').click();
});
Then(/^the edit should be saved successfully$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
  cy.get('.MuiTableBody-root')
    .first()
    .find('[data-testid="MuiDataTableBodyCell-2-0"]').should(
    'have.text',
    'updatedTitle',
  );
});
