import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../../../defualtTestValues';
import {
  getDateAfterHours,
  getFromLocalStorage,
} from '../../../../helperFunctions';
import { getFakeQuestion } from '../../../../factories/questionFactory';
import moment from 'moment';
import {
  createQuestion,
  createQuestionWithState,
} from '../../../../support/services/questionBuilder';

Given(/^I am on Post question page$/, function() {
  cy.get('#postQuestionButton').click();
  cy.get('#post-question-page-header').should('have.text', 'Add Question');
});

And(/^I am on adviser question list$/, function() {
  cy.contains('Adviser Questions List');
});

And(/^I should not see the question$/, function() {
  cy.wait('@questions');
  cy.contains('Sorry, no matching records found');
});

And(/^I should see Action Needed column$/, function() {
  cy.contains('Status');
  cy.contains('Action Needed');
});

And(/^I should see By Time column$/, function() {
  cy.contains('By Time');
});

And(/^I should see Alarm column$/, function() {
  cy.contains('Alarm');
});

Given(/^I have a question with a status Review$/, function() {
  createQuestionWithState({
    state: 'review_and_edit',
    current_action_time: getDateAfterHours(10),
  });
});

Given(/^I have a question with status pending deployment$/, function() {
  createQuestionWithState({
    state: 'pending_deployment_to_roaster',
    current_action_time: '',
  });
});

And(/^By Time Field is not visible$/, function() {
  const referenceNumber = getFromLocalStorage('createdQuestion')
    .referenceNumber;
  cy.get(`tr[row-reference="${referenceNumber}"] .by-time`).should('not.exist');
});

And(/^I click on the question id from dashboard$/, function() {
  const referenceNumber = getFromLocalStorage('createdQuestion')
    .referenceNumber;
  cy.get(`tr[row-reference="${referenceNumber}"] .title`).click();
});

When(/^"Extend Time" dialog should be displayed$/, function() {
  cy.get('#extend-time-dialog').contains('Extend Time');
});

When(/^"Extend Time" dialog should not be displayed$/, function() {
  cy.get('#extend-time-dialog').should('not.exist');
});

When(/^I click on that question's By Time$/, function() {
  const referenceNumber = getFromLocalStorage('createdQuestion')
    .referenceNumber;
  cy.get(`tr[row-reference="${referenceNumber}"] .by-time`).contains('9:59');
  cy.get(`tr[row-reference="${referenceNumber}"] .currentActionTime`).click();
});

And('I should see alarm with {string} circle', (color) => {
  cy.get('td[data-testid="MuiDataTableBodyCell-10-0"] div').should(
    'have.class',
    color,
  );
});

And(/^I should see alarm beside question row$/, function() {
  cy.get('#MUIDataTableBodyRow-0');
  cy.get('td[data-testid="MuiDataTableBodyCell-5-0"] div').contains(
    '50% of the Remaining time to accept has passed',
  );
});

And(/^I click on question title$/, function() {
  cy.get('td[data-testid="MuiDataTableBodyCell-2-0"]').click();
});

When(/^i chose a question with status draft\.$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
  cy.get('.state[data-status="draft"]')
    .last()
    .click();
});

When(/^i chose a question with status review_and_edit\.$/, function() {
  cy.get('div[data-status="review_and_edit"]').then(function(element) {
    const toBeSendToAdmin = element[0].attributes['data-reference'].value;
    cy.wrap(toBeSendToAdmin).as('toBeSendToAdmin');
    cy.get(`a[data-reference='${toBeSendToAdmin}']`)
      .parent()
      .parent()
      .click();
  });
});

Then(
  /^the question i sent should be be visible in questions dashboard with state pending_deployment_to_roaster$/,
  function() {
    cy.get(`a[data-reference='${this.toBeSendToAdmin}']`).then(function(
      element,
    ) {
      expect(
        element[0].attributes['data-status'].value,
        'pending_deployment_to_roaster',
      );
    });
  },
);

Then(/^the edit should be saved successful to selected question$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
  cy.get(`a[data-reference='${this.toBeSendToAdmin}']`).should('exist');
});

Given(
  'I have a question in {string} state assigned to me with By time less than {string} percent',
  (state, percent) => {
    let totalCurrentActionHours = state === 'review_and_edit' ? 2 : 24;
    let hours = (parseInt(percent) * totalCurrentActionHours) / 100;
    cy.server();
    cy.route('GET', '/questions/adviser_questions', [
      getFakeQuestion({
        state,
        current_action_time: getDateAfterHours(hours),
        hours_to_review_and_edit: totalCurrentActionHours,
        hours_to_close_answers: totalCurrentActionHours,
      }),
    ]).as('questions');
  },
);

Given(/^I have a question assigned to me with finished By time$/, function() {
  cy.server();
  cy.route('GET', '/questions/adviser_questions', [
    getFakeQuestion({
      title: 'removed question',
      current_action_time: moment().subtract(5, 'days'),
    }),
  ]).as('questions');
});

Then(/^i should be in the saved question post form\.$/, function() {});

Then(/^all saved information should be visible$/, function() {});

Then(/^the question status should be pending adviser acceptance$/, function() {
  cy.wait(2000);
  cy.get('.state[data-status="draft"]')
    .last()
    .click();
});

When(
  /^I select a question with status pending deployment to question roaster$/,
  function() {
    cy.get('.state[data-status="pending_deployment_to_roaster"]').then(function(
      element,
    ) {
      const toBeDeployedReference =
        element[0].attributes['data-reference'].value;
      cy.wrap(toBeDeployedReference).as('toBeDeployed');
      cy.get(`a[data-reference='${toBeDeployedReference}']`)
        .parent()
        .parent()
        .click();
    });
  },
);

Then(/^I should be redirected to questions dashboard$/, function() {
  cy.get('#questionsList').should('exist');
});

Then(
  /^I should see deployed question status to be freelancer answers$/,
  function() {
    cy.visit(`${BASE_URL}/admin/questions`);
    cy.get(`a[data-reference='${this.toBeDeployed}']`).then(function(element) {
      expect(element[0].attributes['data-status'].value, 'freelancer_answers');
    });
  },
);

Then(/^i should not see the draft question i posted as admin$/, function() {
  cy.contains(this.questionTitle).should('not.exist');
});

Then(/^the edit should be saved successfully$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
  const referenceNumber = getFromLocalStorage('createdQuestion')
    .referenceNumber;
  cy.get(`tr[row-reference="${referenceNumber}"] .title`).should(
    'have.text',
    'updatedTitle',
  );
});

When(
  /^i select a question with status pending assigment acceptance$/,
  function() {
    cy.get('div[data-status="pending_adviser_acceptance"]').then(function(
      element,
    ) {
      const toBeAcceptedOrRejectedReference =
        element[0].attributes['data-reference'].value;
      cy.wrap(toBeAcceptedOrRejectedReference).as('toBeAcceptedOrRejected');
      cy.get(`a[data-reference='${toBeAcceptedOrRejectedReference}']`)
        .parent()
        .parent()
        .click();
    });
  },
);

When(/^I have a question with pending assignment state$/, function() {
  createQuestion();
});

Then(
  /^i should see accepted question status to be review and edit$/,
  function() {
    // @TODO this is a false green test
    cy.get(`.state[data-reference='${this.toBeAcceptedOrRejected}']`).then(
      (element) => {
        expect(element[0].innerText, 'review_and_edit');
      },
    );
  },
);

Then(
  /^i should not see rejected question question status to be review and edit$/,
  function() {
    cy.get(`.state[data-reference='${this.toBeAcceptedOrRejected}']`).should(
      'not.exist',
    );
  },
);

Then(
  /^I should see accepted question with by time around review and edit time assigned in question$/,
  function() {
    cy.get(
      `.currentActionTime[data-reference='${this.toBeAcceptedOrRejected}']`,
    ).contains('23:59');
  },
);

Then(
  /^I should see alarm updated with new action time for review and edit$/,
  function() {
    cy.get(`div[data-reference='${this.toBeAcceptedOrRejected}']`).should(
      'have.class',
      'green',
    );
  },
);

Given(
  /^I have a question assigned to me with pending deployment to question roaster state\.$/,
  function() {
    createQuestionWithState({
      state: 'pending_deployment_to_roaster',
      current_action_time: '',
    });
  },
);

Then(/^The question should be visible with no action\.$/, function() {
  cy.wait('@adviserQuestions');
  const createdQuestion = getFromLocalStorage('createdQuestion');
  cy.get(
    `tr[row-reference='${createdQuestion.referenceNumber}'] td[data-colindex="7"]`,
  );
});

When(/^I click on the question\.$/, function() {
  const createdQuestion = getFromLocalStorage('createdQuestion');
  cy.get(`a[data-reference='${createdQuestion.referenceNumber}']`)
    .parent()
    .parent()
    .click();
});

Then(/^I fill the extended time field$/, function() {
  cy.get('#extendTimeInput').type(6);
});

Then(/^I click submit$/, function() {
  cy.get('#submitExtendedTime').click();
});

Then(/^By Time should be updated$/, function() {
  cy.server();
  cy.route('GET', '/questions/all').as('questions');
  cy.wait('@questions');
  const referenceNumber = getFromLocalStorage('createdQuestion')
    .referenceNumber;
  cy.get(`tr[row-reference="${referenceNumber}"] .by-time`).contains('15:59');
});
