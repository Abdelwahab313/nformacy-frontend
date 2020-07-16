import { Then, Given } from 'cypress-cucumber-preprocessor/steps';
import { signUpAndSetTokens } from '../../helperFunctions';
import faker from 'faker';
import { BASE_URL } from '../../defualtTestValues';


Then(/^then should be redirected to homepage$/, function() {
  cy.get('#header');
});


Given(/^I am a freelancer$/, function() {

});

Given(/^I log in$/, function() {
  signUpAndSetTokens();
  cy.wrap(faker.name.findName()).as('updatedFirstName');
});

Given(/^visit home page$/, function() {
  cy.visit(BASE_URL);
});