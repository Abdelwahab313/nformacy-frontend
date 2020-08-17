import { Given, When } from 'cypress-cucumber-preprocessor/steps';

Given(/^on Post question page$/, function() {
  cy.contains('Post Question').click();
  cy.get('#post-question-page-header');
});
When(/^I fill all the question details$/, function() {
  cy.get('#question-title-field').type('test question title');
});