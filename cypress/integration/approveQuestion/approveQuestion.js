import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../defualtTestValues';

When(/^i chose unapproved question\.$/, function() {
  cy.get('.MuiTableBody-root')
    .first()
    .find('[data-testid="MuiDataTableBodyCell-1-0"]')
    .invoke('text')
    .as('unapprovedQuestion');
  cy.get('.MuiTableBody-root')
    .first()
    .find('#editSummary')
    .click();
});
When(/^i click post to question roaster$/, function() {
  cy.get('#approveQuestion').click();
});
Then(
  /^the question i posted should be visible in the question roaster$/,
  function() {
    cy.visit(BASE_URL + '/questions');
    cy.get(`#question-${this.unapprovedQuestion}-referenceNumber`);
  },
);
