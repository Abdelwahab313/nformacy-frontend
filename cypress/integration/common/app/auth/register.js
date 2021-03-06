import { BASE_URL } from '../../../../defualtTestValues';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';

Given(/^I am at register page$/, function() {
  cy.visit(BASE_URL + '/signup');
});
When(/^I fill my data$/, function() {
  cy.get('#firstName').type(faker.name.findName());
  cy.get('#lastName').type(faker.name.findName());
  cy.get('#email').type(faker.internet.email());
  cy.get('#password').type('testtest');
  cy.get('#confirmPassword').type('testtest');
});
When(/^press signup$/, function() {
  cy.get('#register').click();
});
Then(/^then should be redirected to profile completion$/, function() {
  cy.get('#userTypeSelection');
});
