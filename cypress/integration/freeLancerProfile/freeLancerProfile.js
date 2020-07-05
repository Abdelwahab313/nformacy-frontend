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
  cy.get('#multiStepForm');
});

Then(/^I should see step one form$/, function() {
  cy.get('#stepOneForm');
});

When(/^I fill personal info data$/, function() {
  cy.get('#maleRadio').click();
  cy.get('#country-select').click();
  cy.get('#react-select-2-option-0').click();
  cy.get('#mobile_number').clear();
  cy.get('#mobile_number').type('201069942509');
  cy.get('#currentEmploymentStatus').click();
  cy.get('#react-select-3-option-0').click();
});

When(/^click next$/, function() {
  cy.get('#nextButton').click();
});
Then(/^I should see step two form$/, function() {
  cy.get('#stepTwoForm');
});
When(/^I fill step two data$/, function() {
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#react-select-4-option-0').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#react-select-5-option-0').click();
  cy.get('#industriesOfExperience').click();
  cy.get('#react-select-6-option-0').click();
  cy.get('#assignmentLanguage').click();
  cy.get('#react-select-7-option-0').click();
  cy.get('#assignmentTypesSelect').click();
  cy.get('#react-select-8-option-0').click();
  cy.get('#locationOfAssignment').click();
  cy.get('#react-select-9-option-0').click();
});
When(/^click submit$/, function() {});
Then(/^I should see welcome message$/, function() {});
Then(/^I should see step three form$/, function() {
  cy.get('#stepThreeForm');
});
When(/^I fill step three data$/, function() {
  cy.get('#add-work-experience').click();
  cy.get('#work-experience-title-0').clear();
  cy.get('#work-experience-title-0').type('test job title');
  cy.get('#work-experience-company-0').clear();
  cy.get('#work-experience-company-0').type('test company name');
  cy.get('#add-education').click();
  cy.get('#educations-school-0').clear();
  cy.get('#educations-school-0').type('test school');
  cy.get('#add-certification').click();
  cy.get('#certification-name-0').clear();
  cy.get('#certification-name-0').type('test school');
});
