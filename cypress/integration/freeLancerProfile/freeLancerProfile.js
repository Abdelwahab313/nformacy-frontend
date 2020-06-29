import { BASE_URL } from '../../defualtTestValues';

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am a freelancer and registered$/, function() {
  cy.visit(BASE_URL + '/signup');
  cy.get('#firstName').type('First name');
  cy.get('#lastName').type('last name');
  cy.get('#email').type('new2@new.new');
  cy.get('#password').type('testtest');
  cy.get('#confirmPassword').type('testtest');
  cy.get('#register').click();
});

Then(/^I am on the freelancer profile completion form$/, function() {
  cy.get('#stepsPercentage');
});
Then(/^I should see multistep form\.$/, function() {
  cy.get('#multiStepForm');
});
Then(/^I should see step one form$/, function() {
  cy.get('#stepOneForm');
});

When(/^I fill personal info data$/, function() {
  cy.get('#maleRadio').click();
  cy.get('#country-select').click();
  cy.get('#react-select-2-option-0').click();
  cy.get('#mobile_number').type('+20106994259');
  cy.get('#currentEmploymentStatus').click();
  cy.get('#react-select-3-option-0').click();
});

When(/^click next$/, function() {});
Then(/^I should see step two form$/, function() {});
Then(/^percentage should be 30%$/, function() {});
When(/^I fill step two data$/, function() {});
Then(/^percentage should be 60%$/, function() {});
When(/^I fill step three data$/, function() {});
When(/^click submit$/, function() {});
Then(/^I should see welcome message$/, function() {});
