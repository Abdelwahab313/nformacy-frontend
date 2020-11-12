import { When } from 'cypress-cucumber-preprocessor/steps';

When(/^I select ask the expert option$/, function () {
    cy.get('#service-question-btn').click();
});

When(/^I should be navigated to question service form$/, function () {
    cy.get('#create-service-request-header').contains('Ask the Expert');
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
        editor.setContent('<p>Test content</p>');
    });
});

When(/^I click on submit service button$/, function () {
    cy.get('#submitQuestionButtonButton').click();
});