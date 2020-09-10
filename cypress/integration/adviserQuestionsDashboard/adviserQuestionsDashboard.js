import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given(/^I have questions assigned to me$/, function() {
  //TODO creat question from database (for now test will pass if you run adminAddQuestion TEST BEFORE IT)
});

And(/^I am on adviser question list$/, function() {
  cy.contains('Adviser Questions List');
});

And(/^I should see the questions assigned to me$/, function() {
  cy.get('#MUIDataTableBodyRow-0');
});

And(/^I click on question title$/, function() {
  cy.get("td[data-testid='MuiDataTableBodyCell-2-0']").click();
});

And(/^I should see question details$/, function() {
  cy.contains('Edit Question');
});
