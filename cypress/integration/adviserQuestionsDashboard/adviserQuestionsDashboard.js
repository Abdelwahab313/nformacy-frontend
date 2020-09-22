import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { getFakeQuestion } from '../../factories/questionFactory';

const getDateAfterHours = (hours) => {
  let d = new Date();
  d.setHours(d.getHours() + hours);
  console.log(d.toGMTString());
  return d.toGMTString();
};

Given(
  `I have a question assigned to me with By time less than {string} percent`,
  (percent) => {
    let hours = (parseInt(percent) * 12) / 100;
    cy.server();
    cy.route('GET', '/questions/adviser_questions', [
      getFakeQuestion({ current_action_time: getDateAfterHours(hours) }),
    ]).as('questions');
  },
);

Given (/^I have a question assigned to me with finished By time$/, function() {
  cy.server();
  cy.route('GET', '/questions/adviser_questions', [
    getFakeQuestion({ title: "removed question"}),
  ]).as('questions');
});

And(/^I am on adviser question list$/, function() {
  cy.contains('Adviser Questions List');
});

And(/^I should not see the question$/, function() {
  cy.wait('@questions');
  cy.contains('Sorry, no matching records found');
});

And(/^I should see the questions assigned to me$/, function() {
  cy.get('#MUIDataTableBodyRow-0');
  cy.get('td[data-testid="MuiDataTableBodyCell-3-0"] span').contains(
    'pending adviser acceptance',
  );
  cy.get('td[data-testid="MuiDataTableBodyCell-4-0"] p').contains('0:11:59');
});

And(`I should see alarm with {string} circle`, (color) => {
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
  cy.get("td[data-testid='MuiDataTableBodyCell-2-0']").click();
});

And(/^I should see question details$/, function() {
  cy.contains('Edit Question');
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
