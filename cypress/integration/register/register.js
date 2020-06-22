import { BASE_URL } from '../../defualtTestValues';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am at register page$/, function() {
  cy.visit(BASE_URL + '/signup');
});
When(/^I fill my data$/, function() {
  cy.get('#firstName').type('First name');
  cy.get('#lastName').type('last name');
  cy.get('#email').type('new@new.te');
  cy.get('#password').type('testtest');
  cy.get('#confirmPassword').type('testtest');
});
When(/^press signup$/, function() {
  cy.get('#register').click();
});
