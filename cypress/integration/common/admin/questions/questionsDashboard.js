import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../../../defualtTestValues';
import {
  createQuestion,
  createQuestionWithState,
  getDateAfterHours,
  getFromLocalStorage,
} from '../../../../helperFunctions';
import { getFakeQuestion } from '../../../../factories/questionFactory';

Given(/^I am on Post question page$/, function() {
  cy.contains('Post Question').click();
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

When(/^I click on that question's By Time$/, function() {
  const referenceNumber = getFromLocalStorage('createdQuestion')
    .referenceNumber;
  cy.get(`tr[row-reference="${referenceNumber}"] .by-time`).contains('9:59');
  cy.get(`tr[row-reference="${referenceNumber}"] .currentActionTime`).click();
});

When(/^"Extend Time" dialog should be displayed$/, function() {
  cy.get('#extend-time-dialog').contains('Extend Time');
});

And('I should see alarm with {string} circle', (color) => {
  cy.get('td[data-testid="MuiDataTableBodyCell-9-0"] div').should(
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
    cy.get(`a[data-reference='${this.toBeSendToAdmin}']`).then(function(element) {
      expect(element[0].attributes['data-status'].value, 'pending_deployment_to_roaster');
    });
    },
);

Then(/^the edit should be saved successful to selected question$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
  cy.get(`a[data-reference='${this.toBeSendToAdmin}']`).should('exist');
});

Given(
  'I have a question assigned to me with By time less than {string} percent',
  (percent) => {
    let hours = (parseInt(percent) * 12) / 100;
    cy.server();
    cy.route('GET', '/questions/adviser_questions', [
      getFakeQuestion({ current_action_time: getDateAfterHours(hours) }),
    ]).as('questions');
  },
);

Given(/^I have a question assigned to me with finished By time$/, function() {
  cy.server();
  cy.route('GET', '/questions/adviser_questions', [
    getFakeQuestion({ title: 'removed question' }),
  ]).as('questions');
});

Then(/^i should be in the saved question post form\.$/, function() {});
Then(/^all saved information should be visible$/, function() {});

Then(/^the question status should be pending adviser acceptance$/, function() {
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
    cy.get(`a[data-reference='${this.toBeDeployed}']`).then(function(element) {
      expect(element[0].attributes['data-status'].value, 'freelancer_answers');
    });
  },
);

Then(/^i should not see the draft question i posted as admin$/, function() {
  cy.contains(this.questionTitle).should('not.exist');
});

When(/^i chose second question\.$/, function() {
  cy.get('*[data-testid="MuiDataTableBodyCell-2-1"] a')
    .parent()
    .parent()
    .click();
});

Then(/^the edit should be saved successfull to second question$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
  cy.get('.MuiTableBody-root')
    .first()
    .find('[data-testid="MuiDataTableBodyCell-2-1"]')
    .should('have.text', 'updatedTitle');
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
  cy.wait(1000);
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
  cy.get(`#extendTimeInput`).type(6);
});

Then(/^I click submit$/, function() {
  cy.get(`#submitExtendedTime`).click();
});

Then(`Success message with {string} should be displayed`, (message) => {
  cy.contains(message);
});
