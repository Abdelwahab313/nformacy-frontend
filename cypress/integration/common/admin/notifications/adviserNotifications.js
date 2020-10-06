import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';
import {
  createQuestion,
  getFromLocalStorage,
} from '../../../../helperFunctions';

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

Then(/^A toast should be displayed with the notification\.$/, function() {
  cy.get('.Toastify__toast-body').contains('pending_adviser_acceptance');
});

When(/^I click on notifications menu\.$/, function() {
  cy.get('#notificationsButton').click();
});

Then(/^I should see the newly received notification\.$/, function() {
  cy.get('#notification-menu-list-grow')
    .find('li')
    .first()
    .contains('pending_adviser_acceptance');
});
Given(/^I have (\d+) notifications\.$/, function(counts) {
  createQuestion({}, counts);
});
Then(/^I should see the recent (\d+)\.$/, function(count) {
  cy.get('#notification-menu-list-grow')
    .find('li')
    .its('length') // calls 'length' property returning that value
    .should('eq', count);
  cy.get('#notification-menu-list-grow')
    .find('li')
    .first()
    .contains('pending_adviser_acceptance');
});
Then(
  /^The newly sent notification should replace the oldest one\.$/,
  function() {
    const sentQuestionId = getFromLocalStorage('createdQuestion').id;
    cy.get('#notification-menu-list-grow')
      .find('li')
      .first()
      .should('have.attr', 'data-target-id', sentQuestionId.toString());
    cy.get('#notification-menu-list-grow')
      .find('li')
      .its('length') // calls 'length' property returning that value
      .should('eq', 10);
  },
);
Then(/^I should see toast notification with the newly received notification$/, function() {
  cy.get('.Toastify__toast').should('be.visible')
});
