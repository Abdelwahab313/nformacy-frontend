import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import {
  loginAsAdmin,
  loginAsAnAdvisor,
  signUpAndSetTokens,
} from '../../helperFunctions';
import faker from 'faker';
import {
  ADVISER_WITH_NO_NOTIFICATION,
  ADVISER_WITH_OLD_NOTIFICATION,
  BASE_URL,
} from '../../defualtTestValues';

Given(/^I am a freelancer$/, function() {});

Given(/^I am on the questions dashboard$/, function() {
  cy.visit(BASE_URL + '/admin/questions');
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

Given(/^I Logout from admin dashboard$/, function() {
  cy.visit(BASE_URL + '/admin/logout');
});
Given(/^I Login with adviser that does not have notifications$/, function() {
  loginAsAnAdvisor(ADVISER_WITH_NO_NOTIFICATION);
});

Given(/^I Login with adviser that have old unread notifications$/, function() {
  loginAsAnAdvisor(ADVISER_WITH_OLD_NOTIFICATION);
});
