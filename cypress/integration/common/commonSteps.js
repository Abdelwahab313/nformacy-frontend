import { Then, Given, When } from 'cypress-cucumber-preprocessor/steps';
import {
  loginAsAdmin,
  loginAsAnAdvisor,
  signUpAndSetTokens,
} from '../../helperFunctions';
import faker from 'faker';
import { BASE_URL } from '../../defualtTestValues';

Then(/^then should be redirected to homepage$/, function() {
  cy.get('#header');
});

Given(/^I am a freelancer$/, function() {});

Given(/^i am an admin and Logged in$/, function() {
  loginAsAdmin();
});
Given(/^i am in question roaster dashboard\.$/, function() {
  cy.visit(`${BASE_URL}/admin/questions`);
});
Given(/^I log in as a freelancer$/, function() {
  signUpAndSetTokens();
  cy.wrap(faker.name.findName()).as('updatedFirstName');
});
Given(/^I login in as an advisor$/, function() {
  loginAsAnAdvisor();
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
Then(/^i click on answer button of specific question$/, function() {
  cy.get('#question-2000100-submit').click();
});

Then(/^I should see rich Text box for the answer content\.$/, function() {
  cy.get('#richContent');
});
When(/^I go to profile page$/, function() {
  cy.visit(BASE_URL + '/user/edit');
});
When(/^I click on edit basic info$/, function() {
  cy.get('#editBasicInfo ').click();
});
When(/^I fill my updated basic Info data$/, function() {
  cy.get('#editBasicInfoForm').should('be.visible');
  cy.get('input[name="firstName"]').clear();
  cy.get('input[name="firstName"]').type('test first name');
  cy.get('input[name="lastName"]').clear();
  cy.get('input[name="lastName"]').type('test last name');
  cy.get('input[name="email"]').clear();
  cy.get('input[name="email"]').type('test@test.com');
  cy.get('input[name="linkedInProfileUrl"]').clear();
  cy.get('input[name="linkedInProfileUrl"]').type('linkedin.com');
});
When(/^press save basic info$/, function() {
  cy.get('#saveBasicInfo').click();
  cy.get('#editBasicInfoForm').should('not.be.visible');
});
Then(/^then should see my updated basic info$/, function() {
  cy.get('#firstNameValue').contains('test first name');
  cy.get('#linkedInProfileUrlValue').contains('linkedin.com');
});

When(/^i edit question title$/, function() {
  cy.get('#title').clear();
  cy.get('#title').type('updatedTitle');
});
When(/^i click update question$/, function() {
  cy.get('#updateQuestion').click();
});

When(/^i fill answer content\.$/, function() {
  cy.get('#richContent_ifr');
  cy.wait(1000);
  cy.window()
    .then(win => {
      const editor = win.tinymce.editors['richContent'];
      editor.setContent('<p>Test content</p>');
    });
});
