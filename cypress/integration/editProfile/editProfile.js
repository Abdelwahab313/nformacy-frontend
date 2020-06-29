import { BASE_URL } from '../../defualtTestValues';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^I log in$/, function() {
  cy.visit(BASE_URL);
  cy.get('#email').type('client@test.com');
  cy.get('#password').type('test1234');
  cy.get('#login').click();
  cy.get('#side-menu');
});
When(/^I go to edit profile page$/, function() {
  cy.visit(BASE_URL + '/user/edit');
});
When(/^I fill my updated data$/, function() {
  cy.get('#firstName').clear();
  cy.get('#firstName').type('test first name');
  cy.get('#lastName').clear();
  cy.get('#lastName').type('test last name');
  cy.get('#email').clear();
  cy.get('#email').type('client@test.com');
  cy.get('#mobile_number').clear();
  cy.get('#mobile_number').type('0111111111');
  cy.get('#daily_rate').type('123');
  cy.get('#currentEmploymentStatus').click();
  cy.get('#react-select-3-option-0').click();
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#react-select-4-option-0').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#react-select-5-option-0').click();
  cy.get('#industriesOfExperience').click();
  cy.get('#react-select-6-option-0').click();
  cy.get('#assignmentLanguage').click();
  cy.get('#react-select-7-option-0').click();
  cy.get('#assignmentTypesSelect').click();
  cy.get('#react-select-8-option-1').click();
  cy.get('#locationOfAssignment').click();
  cy.get('#react-select-9-option-0').click();
  cy.get('#add-work-experience').click();
  cy.get('#work-experience-title-0').clear();
  cy.get('#work-experience-title-0').type('test job title');
  cy.get('#work-experience-company-0').clear();
  cy.get('#work-experience-company-0').type('test company name');
});
When(/^press submit$/, function() {
  cy.get('#save').click();
});
Then(/^then should see my updated data when i open edit profile$/, function() {
  cy.visit(BASE_URL + '/user/edit');
  cy.get('#firstName').should('have.value', 'test first name');
});
When(/^I Upload an image$/, function() {
  cy.get('.chooseFileButton ').click();
  const profilePicturePath = 'download.png';
  cy.get('input[type="file"]').attachFile(profilePicturePath);
});
Then(/^I should see the image i uploaded$/, function() {});
