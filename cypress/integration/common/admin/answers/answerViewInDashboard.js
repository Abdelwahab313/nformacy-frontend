import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  clearLocalStorage,
  getFromLocalStorage,
  isAdmin,
} from '../../../../helperFunctions';
import { BASE_URL } from '../../../../defualtTestValues';
import { createQuestionWithAnswers } from '../../../../support/services/questionBuilder';

Given(/^There is a question with answers$/, function() {
  createQuestionWithAnswers();
});

When(/^Click on created question$/, function() {
  if (isAdmin()) {
    cy.wait('@allQuestions');
  } else {
    cy.wait('@adviserQuestions');
  }
  cy.get(
    `a[data-reference='${
      getFromLocalStorage('createdQuestion').referenceNumber
    }']`,
    {
      timeout: 50000,
    },
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
  cy.get(`#${getFromLocalStorage('rejectedAnswer').referenceNumber}`).should(
    'not.exist',
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
  cy.wait('@adviserQuestions');
  cy.get(
    `a[data-reference='${
      getFromLocalStorage('createdQuestion').referenceNumber
    }']`,
    {
      timeout: 50000,
    },
  )
    .parent()
    .parent()
    .click();
  cy.get('#rateAnswer-0-3').should('have.attr', 'checked');
});

Then(/^The rating should be read only$/, function() {
  cy.get('#rateAnswer-1-3').should('not.exist');
});

And(/^I select an answer with pending status$/, function() {
  cy.get(`#${getFromLocalStorage('pendingAnswer').referenceNumber}`).should(
    'exist',
  );
});

And(/^I accept the answer$/, function() {
  cy.get(
    `#accept-${getFromLocalStorage('pendingAnswer').referenceNumber}`,
  ).click();
});

And(/^I reject the answer$/, function() {
  cy.get(
    `#reject-${getFromLocalStorage('pendingAnswer').referenceNumber}`,
  ).click();
});

And(/^Accept and reject buttons should not be visible$/, function() {
  cy.get(
    `#accept-${getFromLocalStorage('pendingAnswer').referenceNumber}`,
  ).should('not.exist');
  cy.get(
    `#reject-${getFromLocalStorage('pendingAnswer').referenceNumber}`,
  ).should('not.exist');
});

And(/^I should see rollback button$/, function() {
  cy.get(
    `#rollback-${getFromLocalStorage('pendingAnswer').referenceNumber}`,
  ).should('exist');
});

And(/^I selected an accepted answer$/, function() {
  cy.get(`#${getFromLocalStorage('acceptedAnswer').referenceNumber}`).should(
    'exist',
  );
});

And(/^I click rollback button of accepted answer$/, function() {
  cy.get(
    `#rollback-${getFromLocalStorage('acceptedAnswer').referenceNumber}`,
  ).click();
});

And(
  /^The rollback button of accepted answer should not be visible$/,
  function() {
    cy.get(
      `#rollback-${getFromLocalStorage('acceptedAnswer').referenceNumber}`,
    ).should('not.exist');
  },
);

And(/^I should see Accept and Reject buttons of accepted answer$/, function() {
  cy.get(
    `#accept-${getFromLocalStorage('acceptedAnswer').referenceNumber}`,
  ).should('exist');
  cy.get(
    `#reject-${getFromLocalStorage('acceptedAnswer').referenceNumber}`,
  ).should('exist');
});

And(/^I selected a rejected answer$/, function() {
  cy.get(`#${getFromLocalStorage('rejectedAnswer').referenceNumber}`).should(
    'exist',
  );
});

And(/^I click rollback button of rejected answer$/, function() {
  cy.get(
    `#rollback-${getFromLocalStorage('rejectedAnswer').referenceNumber}`,
  ).click();
});

And(
  /^The rollback button of rejected answer should not be visible$/,
  function() {
    cy.get(
      `#rollback-${getFromLocalStorage('rejectedAnswer').referenceNumber}`,
    ).should('not.exist');
  },
);

And(/^I should see Accept and Reject buttons of rejected answer$/, function() {
  cy.get(
    `#accept-${getFromLocalStorage('rejectedAnswer').referenceNumber}`,
  ).should('exist');
  cy.get(
    `#reject-${getFromLocalStorage('rejectedAnswer').referenceNumber}`,
  ).should('exist');
});
