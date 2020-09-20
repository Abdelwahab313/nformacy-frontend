import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When(/^I select a question with status pending deployment to question roaster$/, function() {
  cy.wait(1000);
  cy.get('#pagination-rows').click();
  cy.get('#pagination-menu-list')
    .children()
    .last()
    .click();
  cy.get(".state[data-status='pending_deployment_to_roaster']").then(function(
    element,
  ) {
    const toBeDeployedReference = element[0].attributes['data-reference'].value;
    cy.wrap(toBeDeployedReference).as(
      'toBeDeployed',
    );
    cy.get(`a[data-reference='${toBeDeployedReference}']`).parent().parent().click();
  });
});
When(/^I click deploy to question roaster$/, function() {
  cy.get('#approveQuestion').click()
});
Then(/^I should be redirected to questions dashboard$/, function() {
  cy.get('#questionsList').should('exist');
});
Then(/^I should see deployed question status to be freelancer answers$/, function() {
  cy.wait(1000);
  cy.get('#pagination-rows').click();
  cy.get('#pagination-menu-list')
    .children()
    .last()
    .click();
  cy.get(`a[data-reference='${this.toBeDeployed}']`).then(function (element){
    expect(element[0].attributes['data-status'].value, 'freelancer_answers')
  })
});
