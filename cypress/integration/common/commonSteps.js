import { Then, Given, When } from 'cypress-cucumber-preprocessor/steps';
import {
  loginAsAdmin,
  loginAsAnAdvisor,
  signUpAndSetTokens,
} from '../../helperFunctions';
import faker from 'faker';
import { BASE_URL } from '../../defualtTestValues';

Given(/^I am a freelancer$/, function() {});

Given(/^I am on questions dashboard\.$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
});

Given(/^I am an admin and Logged in$/, function() {
  loginAsAdmin();
});

Given(/^I login in as an advisor$/, function() {
  loginAsAnAdvisor();
});

Given(/^I log in as a freelancer$/, function() {
  signUpAndSetTokens();
  cy.wrap(faker.name.findName()).as('updatedFirstName');
});

Given(/^visit home page$/, function() {
  cy.visit(BASE_URL);
});

When(/^I go to question roaster$/, function() {
  cy.visit(BASE_URL + '/questions');
});
Given(/^I am on the dashboard$/, function() {
  cy.visit(BASE_URL + '/admin/dashboard');
});

Given(/^I am on the questions dashboard$/, function() {
  cy.visit(BASE_URL + '/admin/questions');
});
