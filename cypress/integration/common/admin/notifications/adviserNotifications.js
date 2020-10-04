import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';
import { createQuestion } from '../../../../helperFunctions';

Given(/^I have zero notification$/, function() {
  cy.get('#notificationsButton').click();
  cy.get('#notificationsButton').click();
  cy.get('#notificationsCount').should('not.be.visible');
});

When(/^Admin send a question to me to review\.$/, function() {
  const questionTitle = faker.name.findName();
  createQuestion({
    title: questionTitle,
  });
});

Then(
  /^I should receive a notification about the assignment in the notifications section in the navbar and the notification counter increase by (\d+)\.$/,
  function() {
    cy.get('#notificationsCount').should('be.visible');
  },
);
Then(/^A toast should be displayed with the notification\.$/, function() {});
