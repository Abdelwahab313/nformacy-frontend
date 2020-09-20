import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../defualtTestValues';

When(/^i chose a question with status review_and_edit\.$/, function() {
  cy.wait(1000);
  cy.get('#pagination-rows').click();
  cy.get('#pagination-menu-list')
    .children()
    .last()
    .click();
  cy.get("div[data-status='review_and_edit']").then(function(
    element,
  ) {
    const toBeSendToAdmin = element[0].attributes['data-reference'].value;
    cy.wrap(toBeSendToAdmin).as(
      'toBeSendToAdmin',
    );
    cy.get(`a[data-reference='${toBeSendToAdmin}']`).parent().parent().click();
  });
});
When(/^i click send to admin for deployment$/, function() {
  cy.get('#sendToAdminButton').click()
});
Then(/^the question i sent should not be visible in questions dashboard$/, function() {
  cy.wait(1000);
  cy.get('#pagination-rows').click();
  cy.get('#pagination-menu-list')
    .children()
    .last()
    .click();
  cy.get(`a[data-reference='${this.toBeSendToAdmin}']`).should('not.exist')
});
Then(/^the edit should be saved successful to selected question$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
  cy.wait(1000);
  cy.get('#pagination-rows').click();
  cy.get('#pagination-menu-list')
    .children()
    .last()
    .click();
  cy.get(`a[data-reference='${this.toBeSendToAdmin}']`).should('exist')
});

When(/^i click save and complete later$/, function() {
  cy.get('#saveAndCompleteLaterButton').click();
});
