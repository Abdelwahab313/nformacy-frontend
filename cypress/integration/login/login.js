import { BASE_URL } from '../../defualtTestValues';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am at login page$/, () => {
  cy.visit(BASE_URL);
});

When(/^I type my email and password$/, () => {
  cy.get('#email').type('client@test.com');
  cy.get('#password').type('test1234');
});

When(/^press login$/, function() {
  cy.get('#login').click();
});
