import { BASE_URL } from '../../defualtTestValues';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am at login page$/, () => {
  cy.visit(BASE_URL);
});

When(/^I type my email and password$/, function() {});
Then(/^then should be redirected to homepage$/, function() {});
