import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then(
  /^I should see search bar And a filtering menu for the fields$/,
  function() {
    cy.get('#search');
    cy.get('#filters');
  },
);
Then(
  /^All the questions that are open with the following fields: Question title, Reference \#, post date, field, subfield, industry, Question content, assignment type, close date\.$/,
  function() {
    cy.get('#question-2000100-title')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000100-referenceNumber')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000100-postDate')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#questionMajorFields-0')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#questionSubFields-0')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000100-content')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000100-closeDate')
      .invoke('text')
      .should('not.be.empty');
  },
);
Then(/^Each question should have answer button beneath it\.$/, function() {
  cy.get('#question-2000100-title')
    .invoke('text')
    .should('not.be.empty');
  cy.get('#question-2000100-submit');
});
When(/^I click on a field from the filtering menu\.$/, function() {
  cy.get('#question-2000100-title')
    .invoke('text')
    .should('not.be.empty');
  cy.get('#filters-0').click();
});
Then(/^I should only see questions that belongs to that field\.$/, function() {
  cy.get('#questionMajorFields-0')
    .should('have.text', 'Finance:');
});
When(/^I fill all the question details$/, function() {
  cy.get('#question-title-field').type('test question title')
});