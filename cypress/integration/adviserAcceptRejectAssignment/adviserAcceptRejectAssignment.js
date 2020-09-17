import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When(
  /^i select a question with status pending assigment acceptance$/,
  function() {
    cy.get("div[data-status='pending_adviser_acceptance']").then(function(
      element,
    ) {
      const toBeAcceptedOrRejectedReference = element[0].attributes['data-reference'].value;
      cy.wrap(toBeAcceptedOrRejectedReference).as(
        'toBeAcceptedOrRejected',
      );
      cy.get(`a[data-link='${toBeAcceptedOrRejectedReference}']`).parent().parent().click();

    });
  },
);
When(/^i click accept$/, function() {
  cy.get('#acceptButton').click()
});
Then(/^I should see apply changes button and attachment button appear$/, function() {
  cy.get('#applyChangesButton').should('exist')
  cy.get('.chooseFileButton').should('exist')
});
Then(
  /^i should see accepted question status to be review and edit$/,
  function() {
    cy.get(`.state[data-reference='${this.toBeAcceptedOrRejected}']`).then((element => {
      expect(element[0].innerText, 'review_and_edit')
    }))
  },
);
When(/^i click reject$/, function() {
  cy.get('#rejectButton').click()
});

Then(/^i should not see rejected question question status to be review and edit$/, function() {
  cy.get(`.state[data-reference='${this.toBeAcceptedOrRejected}']`).should('not.exist')
});

Then(/^I should see accepted question with by time around review and edit time assigned in question$/, function() {
  cy.get(`.currentActionTime[data-reference='${this.toBeAcceptedOrRejected}']`).contains('0:23:59');
});

Then(/^I should see what is the time of review and edit assigned$/, function() {
  cy.get('#reviewAndEditTime').should('exist');
});
