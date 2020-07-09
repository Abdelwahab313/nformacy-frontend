import { BASE_URL } from '../../defualtTestValues';

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { signUpAndSetTokens } from '../../helperFunctions';
import faker from 'faker';

Given(/^I log in$/, function() {
  signUpAndSetTokens();
  cy.wrap(faker.name.findName()).as('updatedFirstName');
});
When(/^I go to edit profile page$/, function() {
  cy.visit(BASE_URL + '/user/edit');
});
When(/^I fill my updated data$/, function() {
  cy.get('#firstName').clear();
  cy.get('#firstName').type(this.updatedFirstName);
  cy.get('#lastName').clear();
  cy.get('#lastName').type(faker.name.findName());
  cy.get('#email').clear();
  cy.get('#email').type(this.user.email);
  cy.get('#maleRadio').click();
  cy.get('#country-select').click();
  cy.get('#react-select-2-option-0').click();
  cy.get('#mobile_number').clear();
  cy.get('#mobile_number').type('201069942659');
  cy.get('#currentEmploymentStatus').click();
  cy.get('#react-select-3-option-0').click();

  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#majorFieldsOfExperienceSelect .optionContainer .option:nth-child(3)').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#specificFieldsOfExperienceSelect .optionContainer .option:nth-child(3)').click();
  cy.get('#industriesOfExperience').click();
  cy.get('#react-select-4-option-0').click();
  cy.get('#assignmentLanguage').click();
  cy.get('#react-select-5-option-6').click();
  cy.get('[name="moreThanOneMonth"]').click();
  cy.get('#add-work-experience').click();
  cy.get('#work-experience-title-0').clear();
  cy.get('#work-experience-title-0').type('test job title');
  cy.get('#work-experience-company-0').clear();
  cy.get('#work-experience-company-0').type('test company name');
  cy.get('#work-experience-startDate-0').click();
  cy.get('.MuiPickersYearSelection-container').first().click();
  cy.get('.MuiPickersMonthSelection-container').first().click();
  cy.get('#experiences-toDate-0').click();
  cy.get('#add-education').click();
  cy.get('#educations-degree-0').clear();
  cy.get('#educations-degree-0').type('test degree');
  cy.get('#educations-fieldOfStudy-0').clear();
  cy.get('#educations-fieldOfStudy-0').type('test fieldOfStudy');
  cy.get('#educations-school-0').clear();
  cy.get('#educations-school-0').type('test school');
  cy.get('#educations-endYear-0').click();
  cy.get('.MuiPickersYearSelection-container').first().click();
  cy.get('.MuiPickersMonthSelection-container').first().click();
});
When(/^press submit$/, function() {
  cy.get('#save').click();
  cy.wait(500);
});
Then(/^then should see my updated data when i open edit profile$/, function() {
  cy.visit(BASE_URL + '/user/edit');
  cy.get('#firstName').should('have.value', this.updatedFirstName);
});
When(/^I Upload an image$/, function() {
  cy.get('.chooseFileButton ').click();
  const profilePicturePath = 'download.png';
  cy.get('input[type="file"]').attachFile(profilePicturePath);
});
Then(/^I should see the image i uploaded$/, function() {
});
