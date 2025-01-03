import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';
import {
  clearLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../../helperFunctions';
import { ADVISER_ID } from '../../../../defualtTestValues';
import {
  assignAdviserToQuestion,
  createDeployedQuestion,
  createDraftQuestion,
  createMultipleQuestion,
  createQuestion,
  createQuestionWithAccepttedAnswer,
} from '../../../../support/services/questionBuilder';

Given(/^I have zero notification$/, function() {
  cy.get('#notificationsButton').click();
  cy.get('#notificationsButton').click();
  cy.get('#notificationsCount').should('not.be.visible');
});

When(/^Admin send a question to me to review$/, function() {
  const questionTitle = faker.name.findName();
  createQuestion({
    title: questionTitle,
  });
});

Then(
  /^I should receive a notification about the assignment in the notifications section in the navbar and the notification counter increase by (\d+)$/,
  function() {
    const notificationsCountBeforeClick = Number(
      getFromLocalStorage('notificationsCountBeforeClick'),
    );
    cy.get('#notificationsCount')
      .should('be.visible')
      .should('contain.text', notificationsCountBeforeClick + 1);
  },
);

Then(/^A toast should be displayed with the notification "([^"]*)"$/, function(
  message,
) {
  cy.get('.Toastify__toast-body').contains(message);
});

Given(/^I have (\d+) notifications$/, function(counts) {
  createMultipleQuestion(counts);
});
Then(/^I should see the recent (\d+) notifications$/, function(count) {
  cy.get('#notification-menu-list-grow')
    .find('button')
    .its('length') // calls 'length' property returning that value
    .should('eq', count);
});
Then(/^The newly sent notification should replace the oldest one$/, function() {
  const sentQuestionId = getFromLocalStorage('createdQuestion').id;
  cy.get('#notification-menu-list-grow')
    .find('button')
    .first()
    .should('have.attr', 'data-target-id', sentQuestionId.toString());
  cy.get('#notification-menu-list-grow')
    .find('button')
    .its('length')
    .should('eq', 10);
  cy.get('#notification-menu-list-grow')
    .find('li')
    .first()
    .should('have.text', 'See more...');
});
Then(/^I should see "([^"]*)"$/, function(message) {
  cy.get('#notification-menu-list-grow')
    .find('li')
    .first()
    .should('contain.text', message);
});
Then(/^I should see "([^"]*)" in the end of the menu$/, function(message) {
  cy.wait(1000);
  cy.get('#notification-menu-list-grow')
    .find('li')
    .first()
    .should('contain.text', message);
});
When(/^I click on the newly received notification$/, function() {
  cy.get('#notification-menu-list-grow')
    .find('button')
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
When(/^I click on the toast$/, function() {
  cy.get('.Toastify__toast-body').click();
});

When(/^unread notifications count decrease by (\d+)$/, function(number) {
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
  createDeployedQuestion();
});

When(/^Admin accept an answer in a question i am assigned to$/, function() {
  createQuestionWithAccepttedAnswer();
});

When(/^I click on "([^"]*)" in the end of the menu$/, function() {
  cy.wait(1000);
  cy.get('#notification-menu-list-grow')
    .find('li')
    .first()
    .should('contain.text', 'See more...');
  cy.get('#notification-menu-list-grow')
    .find('li')
    .first()
    .click();
});
Then(/^I should be redirected to all notifications page$/, function() {
  cy.get('#allNotifications');
});
Then(/^I should see (\d+) notifications$/, function(notificationsCount) {
  cy.get('#allNotifications')
    .children()
    .its('length')
    .should('be.gte', notificationsCount);
});
Given(/^Admin assign a draft question to me to review$/, function() {
  createDraftQuestion().then(() => {
    const question = getFromLocalStorage('createdQuestion');
    assignAdviserToQuestion(question.id, ADVISER_ID);
  });
  cy.wait(1000);
});
Then(
  /^A toast should be displayed with the notification about question deployment$/,
  function() {
    cy.get('.Toastify__toast-body').contains(
      /Question #\d+ is posted on Q Roaster/,
    );
  },
);
Then(
  /^I should see the newly received notification with the notification about question deployment$/,
  function() {
    cy.get('#notification-menu-list-grow')
      .find('button')
      .first()
      .contains(/Question #\d+ is posted on Q Roaster/);
  },
);
Then(
  /^A toast should be displayed with notification to rate answer$/,
  function() {
    cy.get('.Toastify__toast-body').contains(
      /Answer #\d+ is ready to be Rated/,
    );
  },
);
Then(
  /^I should see the newly received notification to rate answer$/,
  function() {
    cy.get('#notification-menu-list-grow')
      .find('button')
      .first()
      .contains(/Answer #\d+ is ready to be Rated/);
  },
);

Then(/^I should be navigated to question details$/, function() {
  // should assert reference id
  cy.contains('Edit Question').should('be.visible');
  cy.location('pathname').should('match', /\/questions\/edit$/);
});
