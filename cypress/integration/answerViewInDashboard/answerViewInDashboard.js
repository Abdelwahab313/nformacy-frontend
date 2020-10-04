import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  clearLocalStorage,
  createQuestionWithAnswers,
  getFromLocalStorage,
} from '../../helperFunctions';
import { BASE_URL } from '../../defualtTestValues';

Given(/^There is a question with answers$/, function() {
  createQuestionWithAnswers();
});
When(/^Click on created question\.$/, function() {
  cy.wait(1000);
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
  cy.wait(1000);
  cy.get(`#${getFromLocalStorage('pendingAnswer').referenceNumber}`).should(
    'not.exist',
  );
  cy.get(
    `#${getFromLocalStorage('rejectedAnswer').referenceNumber}`,
  ).should('not.exist',
  );
  cy.get(`#${getFromLocalStorage('acceptedAnswer').referenceNumber}`).should(
    'exist',
  );
});
Then(/^I rate accepted answer$/, function() {
  cy.get('label[for="rateAnswer-0-3"]').click();
});
Then(/^The rate i chose should be applied$/, function() {
  cy.visit(BASE_URL + '/admin/questions');
  cy.wait(1000);
  cy.get(
    `a[data-reference='${
      getFromLocalStorage('createdQuestion').referenceNumber
    }']`,
  )
    .parent()
    .parent()
    .click();
  cy.get('#rateAnswer-0-3').should('have.attr', 'checked');
});
Then(/^The rating should be read only$/, function() {
  cy.get('#rateAnswer-1-3').should('not.exist');
});
