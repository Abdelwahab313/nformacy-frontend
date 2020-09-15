import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';

Given(/^I am on Post question page$/, function() {
  cy.contains('Post Question').click();
  cy.get('#post-question-page-header').should('have.text', 'Add Question');
  // cy.get('#send-to-adviser-button');
});
When(/^I fill all the question details$/, function() {
  cy.get('#title').type('test question title');
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#majorFieldsOfExperienceSelect-option-2').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#specificFieldsOfExperienceSelect-option-2').click();
  cy.get('#industry').click();
  cy.get('#industry-option-0').click();
  cy.get('#assignmentType').click();
  cy.get('#assignmentType-option-0').click();
  cy.get('#hoursToCloseAnswers').type('13');
  cy.get('#hoursToReviewAndEdit').type('10');
  cy.get('#assignAdviser').click();
  cy.get('#assignAdviser-option-0').click();
  cy.get('#richContent_ifr');
  cy.wait(1000);
  cy.window().then((win) => {
    const editor = win.tinymce.editors['richContent'];
    editor.setContent('<p>Test content</p>');
  });
});
When(/^i click "Send to adviser"$/, function() {
  cy.get('#applyChangesButton').click();
});
Then(
  /^I should see snackbar with message "Question Sent to Adviser"$/,
  function() {
    cy.contains('Dashboard');
    cy.contains('Question Sent to Adviser');
  },
);
When(/^I click "([^"]*)"$/, function() {
  cy.get('#saveAndCompleteLaterButton').click();
});
Then(
  /^I should be redirected to questions page and see snackbar with message "([^"]*)"$/,
  function() {
    cy.contains('Your question is saved successfully');
    cy.get('#questionsList');
  },
);
When(/^i chose a question with status draft\.$/, function() {
  cy.wait(1000);
  cy.get('#pagination-rows').click();
  cy.get('#pagination-menu-list')
    .children()
    .last()
    .click();
  cy.get("a[data-status='draft']")
    .last()
    .click();
});
Then(/^i should be in the saved question post form\.$/, function() {});
Then(/^all saved information should be visible$/, function() {});
Then(/^the question status should be pending adviser acceptance$/, function() {
  cy.get('#pagination-rows').click();
  cy.get('#pagination-menu-list')
    .children()
    .last()
    .click();
  cy.get("a[data-status='draft']")
    .last()
    .click();
});
When(/^I fill question details with specific data$/, function() {
  const givenTitle = faker.name.findName();
  cy.wrap(givenTitle).as('questionTitle');
  cy.get('#title').type(givenTitle);
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#majorFieldsOfExperienceSelect-option-2').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#specificFieldsOfExperienceSelect-option-2').click();
  cy.get('#industry').click();
  cy.get('#industry-option-0').click();
  cy.get('#assignmentType').click();
  cy.get('#assignmentType-option-0').click();
  cy.get('#hoursToCloseAnswers').type('13');
  cy.get('#hoursToReviewAndEdit').type('10');
  cy.get('#assignAdviser').click();
  cy.get('#assignAdviser-option-0').click();
  cy.get('#richContent_ifr');
  cy.wait(1000);
  cy.window().then((win) => {
    const editor = win.tinymce.editors['richContent'];
    editor.setContent('<p>Test content</p>');
  });
});
Then(/^i should not see the draft question i posted as admin$/, function() {
  cy.wait(1000);
  cy.get('#pagination-rows').click();
  cy.get('#pagination-menu-list')
    .children()
    .last()
    .click();
  cy.contains(this.questionTitle).should('not.exist');
});
