import { BASE_URL, FREELANCER_PASSWORD, FREELANCER_USERNAME } from '../../../../defualtTestValues';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am at login page$/, () => {
  cy.visit(BASE_URL);
});

When(/^I type my email and password$/, () => {
  cy.get('#email').type(FREELANCER_USERNAME);
  cy.get('#password').type(FREELANCER_PASSWORD);
});

When(/^press login$/, function() {
  cy.get('#login').click();
});


Then(/^then should be redirected to homepage$/, function() {
  cy.get('#header');
});
