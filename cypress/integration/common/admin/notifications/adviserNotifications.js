import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';
import {
  clearLocalStorage,
  createQuestion,
  createQuestionWithState,
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../../helperFunctions';
import {
  ADVISER_PASSWORD,
  ADVISER_USERNAME,
  BACKEND_WEB_URL,
} from '../../../../defualtTestValues';

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

Then(
  /^A toast should be displayed with the notification "([^"]*)"\.$/,
  function(message) {
    cy.get('.Toastify__toast-body').contains(message);
  },
);

When(/^I click on notifications menu\.$/, function() {
  cy.get('#notificationsButton').click();
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
  cy.wait(1000);
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
  cy.wait(1000);
  cy.get('#notificationsCount').then((element) => {
    expect((notificationsCountBeforeClick - number).toString()).to.include(
      element.text().trim(),
    );
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
When(/^I visit the sent question from question dashboard$/, function() {
  const createdQuestion = getFromLocalStorage('createdQuestion');
  cy.get(`a[data-reference='${createdQuestion.referenceNumber}']`)
    .parent()
    .parent()
    .click();
  cy.wait(1000);
});

When(/^Admin deploy a question i am assigned to$/, function() {
  cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
    email: ADVISER_USERNAME,
    password: ADVISER_PASSWORD,
  }).then(() => {
    createQuestionWithState({
      state: 'pending_deployment_to_roaster',
      current_action_time: '',
    }).then(() => {
      const createdQuestion = getFromLocalStorage('createdQuestion');
      const existingAdminToken = Cypress.env('adminTokens');
      cy.request({
        method: 'POST',
        url: `${BACKEND_WEB_URL}/questions/${createdQuestion.id}/deploy`,
        headers: {
          Authorization: `Bearer ${existingAdminToken}`,
        },
      });
    });
  });
});
Then(
  /^I should see the newly received notification with message "([^"]*)"\.$/,
  function(message) {
    cy.get('#notification-menu-list-grow')
      .find('li')
      .first()
      .contains(message);
  },
);
