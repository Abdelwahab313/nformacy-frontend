import { When } from 'cypress-cucumber-preprocessor/steps';

When(/^I select ask the expert option$/, function () {
  cy.get('#service-question-btn').click();
});

When(/^I should be navigated to question service form$/, function () {
  cy.get('#create-service-request-header').contains('Ask the Expert');
});

Given(
  /^I have a call service request with shortlisted consultants$/,
  function () {
    cy.wrap('4000107').as('serviceId');
  },
);

Given(/^I click on the service action$/, function () {
  cy.get(`tr[reference-number="${this.serviceId}"] .action`).click();
});

Given(/^I should navigate to question details$/, function () {
  cy.location('pathname').should('match', /\/questions\/view$/);
});

When(/^I fill the service form$/, function () {
  const givenTitle = 'test question title';
  cy.wrap(givenTitle).as('questionTitle');
  cy.get('#title').type(givenTitle);
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#majorFieldsOfExperienceSelect-option-2').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#specificFieldsOfExperienceSelect-option-2').click();
  cy.get('#industry').click();
  cy.get('#industry-option-0').click();
  cy.get('#questionLanguage').click();
  cy.get('#questionLanguage-option-0').click();
  cy.get('#richContent_ifr');
  cy.wait(1000);
  cy.window().then((win) => {
    const editor = win.tinymce.editors['richContent'];
    editor.setContent(
      '<p>People are different. here is what we I mean. People choose different criteria. But if there is a better way among many alternatives, I want to encourage that way by making it comfortable. So thats what Ive tried to do.</p>',
    );
  });
});

When(/^I click on submit service button$/, function () {
  cy.get('#submitQuestionButtonButton').click();
});
