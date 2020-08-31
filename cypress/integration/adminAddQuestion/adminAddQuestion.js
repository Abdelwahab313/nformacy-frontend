import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^on Post question page$/, function() {
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
  cy.get('#closeIn').type('13');
  cy.get('#reviewAndEditTime').type('10');
});
When(/^Press send to adviser$/, function() {
  cy.get('#submitButton').click();
});
Then(/^I should see snackbar with message$/, function() {
  cy.contains('Dashboard');
  cy.contains('Question Sent to Adviser');
});