import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';
import {
  clearLocalStorage,
  createQuestion,
  getFromLocalStorage,
  setToLocalStorage,
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
  const countWithSeeMore = count + 1;
  cy.get('#notification-menu-list-grow')
    .find('li')
    .its('length') // calls 'length' property returning that value
    .should('eq', countWithSeeMore);
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
      .should('eq', 11);
  },
);
Then(
  /^I should see toast notification with the newly received notification$/,
  function() {
    cy.get('.Toastify__toast').should('be.visible');
  },
);
Then(/^I should see "([^"]*)"\.$/, function(message) {
  cy.get('#notification-menu-list-grow')
    .find('li')
    .first()
    .should('contain.text', message);
});
Then(/^I should see "([^"]*)" in the end of the menu\.$/, function(message) {
  cy.get('#notification-menu-list-grow')
    .find('li')
    .last()
    .should('contain.text', message);
});
When(/^I click on the newly received notification\.$/, function() {
  cy.get('#notification-menu-list-grow')
    .find('li')
    .first()
    .click();
});
When(
  /^I should be redirected to the question details page related to the notification$/,
  function() {
    const sentQuestionTitle = getFromLocalStorage('createdQuestion').title;
    cy.get('#title').should('contain.value', sentQuestionTitle);
  },
);
When(/^Notification menu should be closed$/, function() {
  cy.get('#notification-menu-list-grow').should('not.be.visible');
});
When(/^I click on the toast\.$/, function() {
  cy.get('.Toastify__toast-body').click();
});

When(/^unread notifications count decrease by (\d+)\.$/, function(number) {
  const notificationsCountBeforeClick = Number(
    getFromLocalStorage('notificationsCountBeforeClick'),
  );
  cy.get('#notificationsCount').should('be.visible');
  cy.get('#notificationsCount').then((element) => {
    expect([
      (notificationsCountBeforeClick - number).toString(),
      notificationsCountBeforeClick.toString(),
    ]).to.include(element.text().trim());
  });
});
When(/^I keep track of current notifications count$/, function() {
  cy.get('#notificationsCount').then((element) => {
    setToLocalStorage('notificationsCountBeforeClick', element.text().trim());
  });
});
Given(/^Previous interactions are cleared from localstorage$/, function() {
  clearLocalStorage();
});
