import { BASE_URL } from '../../../../defualtTestValues';

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';

Given(/^I am a freelancer and registered$/, function() {
  cy.visit(BASE_URL + '/signup');
  cy.server();
  cy.route('GET', '/fields?locale=**').as('fields');
  cy.get('#firstName').type(faker.name.findName());
  cy.get('#lastName').type(faker.name.findName());
  cy.get('#email').type(faker.internet.email());
  cy.get('#password').type('testtest');
  cy.get('#confirmPassword').type('testtest');
  cy.get('#register').click();
  cy.get('#freelancerType').click();
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
  cy.get('#react-select-4-option-0').click();
  cy.get('#mobile_number').clear();
  cy.get('#mobile_number').type('201069942509');
  cy.get('#currentEmploymentStatus').click();
  cy.get('#react-select-5-option-0').click();
});

When(/^click next$/, function() {
  cy.get('#nextButton').click();
});

Then(/^I should see step two form$/, function() {
  cy.get('#stepTwoForm');
  cy.route('GET', '/fields?locale=**').as('fields');
});

When(/^I fill step two data$/, function() {
  cy.wait('@fields');
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#majorFieldsOfExperienceSelect-option-2').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#specificFieldsOfExperienceSelect-option-2').click();
  cy.get('#industriesOfExperience').click();
  cy.get('#react-select-6-option-0').click();
  cy.get('#assignmentLanguage').click();
  cy.get('#react-select-7-option-6').click();
  cy.get('[name="moreThanOneMonth"]').click();
});
When(/^click submit$/, function() {
  cy.get('#submitButton').click();
  cy.wait(['@updateUser', '@updateUser']);
  cy.wait(1000);
});
Then(/^I should see welcome message$/, function() {
  cy.get('#welcomeContainer');
});
Then(/^I should see step three form$/, function() {
  cy.get('#stepThreeForm');
});

When(/^I click accept terms and conditions$/, function() {
  cy.get('[name="termsChecked"]').click();
});

When(/^I fill step three data$/, function() {
  cy.get('#add-work-experience').click();
  cy.get('#work-experience-title-0').clear();
  cy.get('#work-experience-title-0').type('test job title');
  cy.get('#work-experience-company-0').clear();
  cy.get('#work-experience-company-0').type('test company name');
  cy.get('#work-experience-startDate-0').click();
  cy.get('.MuiPickersYearSelection-container')
    .first()
    .click();
  cy.get('.MuiPickersMonthSelection-container')
    .first()
    .click();
  cy.get('#experiences-toDate-0').click();
  cy.get('#add-education').click();
  cy.get('#educations-degree-0').clear();
  cy.get('#educations-degree-0').type('test degree');
  cy.get('#educations-fieldOfStudy-0').clear();
  cy.get('#educations-fieldOfStudy-0').type('test fieldOfStudy');
  cy.get('#educations-school-0').clear();
  cy.get('#educations-school-0').type('test school');
  cy.get('#educations-endYear-0').click();
  cy.get('.MuiPickersYearSelection-container')
    .first()
    .click();
  cy.get('.MuiPickersMonthSelection-container')
    .first()
    .click();

  cy.server();
  cy.route('PUT', '/users/**').as('updateUser');
});
When(/^i choose an end date$/, function() {
  cy.get('#work-experience-endDate-0').click();
  cy.get('.MuiPickersYearSelection-container')
    .scrollTo('top')
    .first()
    .click('top');
  cy.get('.MuiPickersMonthSelection-container')
    .first()
    .click();
});
When(/^i click on start date$/, function() {
  cy.get('#work-experience-startDate-0').click();
});
Then(/^Only dates below end date show up$/, function() {
  cy.get('.MuiPickersYearSelection-container > div')
    .last()
    .should('have.text', '1903');
});
When(/^I click back$/, function() {
  cy.get('#backButton').click();
});
Then(/^I should see the dialog box asking for confirmation$/, function() {
  cy.get('#backDialog');
});
When(/^I press cancel$/, function() {
  cy.get('#cancelBack').click();
});
When(/^I press confirm$/, function() {
  cy.get('#confirmBack').click();
});
Then(/^Make end date populated$/, function() {
  cy.get('#add-work-experience').click();
  cy.get('#work-experience-startDate-0').click();
  cy.get('.MuiPickersYearSelection-container')
    .scrollTo('top')
    .first()
    .click();
  cy.get('.MuiPickersMonthSelection-container')
    .first()
    .click();
});
Then(
  /^I should see step two form with fields and specific fields$/,
  function() {
    cy.get('#stepTwoForm');
  },
);
When(/^I select a field$/, function() {
  cy.wait('@fields');
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#majorFieldsOfExperienceSelect-option-2').click();
});
Then(
  /^Specific fields should have select box with options from above field$/,
  function() {
    cy.get('#specificFieldsOfExperienceSelect').click();
    cy.get('#specificFieldsOfExperienceSelect-option-2').should(
      'have.text',
      'Promotion and Advertising',
    );
    cy.get('#specificFieldsOfExperienceSelect-option-2').click();
  },
);

Then(/^I can select multiple options$/, function() {
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#specificFieldsOfExperienceSelect-option-3').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('div[name="fields"]').should('contain', 'Promotion and Advertising');
  cy.get('div[name="fields"]').should('contain', 'Market Research');
});
When(/^I upload my cv$/, function() {
  cy.get('#chooseFileButton ').click();
  const profilePicturePath = 'cv.pdf';
  cy.get('input[type="file"]').attachFile(profilePicturePath, {
    allowEmpty: true,
  });
});
