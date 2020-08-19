import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../defualtTestValues';

When(/^i chose second question\.$/, function() {
  cy.get('#MUIDataTableBodyRow-1')
    .find('#editSummary')
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
