import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../defualtTestValues';

When(/^i chose second question\.$/, function() {
  cy.get('*[data-testid="MuiDataTableBodyCell-2-1"] a')
  .parent().parent()
    .click();
});

Then(/^the edit should be saved successfull to second question$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
  cy.get('.MuiTableBody-root')
    .first()
    .find('[data-testid="MuiDataTableBodyCell-2-1"]').should(
    'have.text',
    'updatedTitle',
  );
});
When(/^i assign an adviser$/, function() {
  cy.get('#assignAdviser').click();
  cy.get('#assignAdviser-option-0').click();
  cy.get('#hoursToReviewAndEdit').type(5);
  cy.get('#hoursToCloseAnswers').type(7);
});