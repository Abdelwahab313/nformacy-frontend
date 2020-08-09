import { Then, Given, When } from 'cypress-cucumber-preprocessor/steps';
import { signUpAndSetTokens } from '../../helperFunctions';
import faker from 'faker';
import { BASE_URL } from '../../defualtTestValues';


Then(/^then should be redirected to homepage$/, function() {
  cy.get('#header');
});


Given(/^I am a freelancer$/, function() {

});


Given(/^i am an admin and Logged in$/, function() {
  signUpAndSetTokens();
});
Given(/^i am in question roaster dashboard\.$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
});
Given(/^I log in$/, function() {
  signUpAndSetTokens();
  cy.wrap(faker.name.findName()).as('updatedFirstName');
});

Given(/^visit home page$/, function() {
  cy.visit(BASE_URL);
});

When(/^I go to question roaster$/, function() {
  cy.visit(BASE_URL + '/questions');
});