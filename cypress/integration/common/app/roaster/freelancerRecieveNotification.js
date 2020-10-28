import { And, Then } from 'cypress-cucumber-preprocessor/steps';
import { createDeployedQuestion } from '../../../../support/services/questionBuilder';

And(/^Admin deploy a question to question roaster$/, function() {
  createDeployedQuestion();
});
Then(/^I should recieve a notification about the deployed question$/, function() {
  cy.get('#notificationButton').click();
});