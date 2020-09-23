import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  clearLocalStorage,
  createQuestionWithAnswers,
  getFromLocalStorage,
} from '../../helperFunctions';

Given(/^There is a question with answers$/, function() {
  createQuestionWithAnswers();
});
When(/^Click on created question\.$/, function() {
  cy.wait(1000);
  cy.get('#pagination-rows').click();
  cy.get('#pagination-menu-list')
    .children()
    .last()
    .click();
  cy.get(
    `a[data-reference='${
      getFromLocalStorage('createdQuestion').referenceNumber
    }']`,
  )
    .parent()
    .parent()
    .click();
});
Then(/^I should be able to see all answers$/, function() {
  cy.get(`#${getFromLocalStorage('pendingAnswer').referenceNumber}`);
  cy.get(`#${getFromLocalStorage('acceptedAnswer').referenceNumber}`);
  cy.get(`#${getFromLocalStorage('rejectedAnswer').referenceNumber}`);
});
Given(/^Created question and answer are removed from storage$/, function() {
  clearLocalStorage();
});
Then(/^I should be able to see all accepted answers$/, function() {
  cy.get(`#${getFromLocalStorage('pendingAnswer').referenceNumber}`).should(
    'not.exist',
  );
  cy.get(`#${getFromLocalStorage('acceptedAnswer').referenceNumber}`).should(
    'not.exist',
  );
  cy.get(
    `#${getFromLocalStorage('rejectedAnswer').referenceNumber}`,
  ).should('not.exist');
});
