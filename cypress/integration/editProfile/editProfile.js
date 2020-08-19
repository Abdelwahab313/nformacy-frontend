import { BASE_URL } from '../../defualtTestValues';

import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When(/^I fill my updated data$/, function() {
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
  cy.get('#saveResume').click();
  cy.get('#savePersonalInfo').click();
  cy.get('#saveFieldsOfSpecialization').click();

});
When(/^I Upload an image$/, function() {
  cy.get('.chooseFileButton ').click();
  const profilePicturePath = 'download.png';
  cy.get('input[type="file"]').attachFile(profilePicturePath);
});
Then(/^I should see the image i uploaded$/, function() {
});

Then(/^I should see edit basic info dialog$/, function() {

});
When(/^i edit basic info$/, function() {

});
When(/^click save$/, function() {

});
Then(/^i should see edited basic info$/, function() {

});
Then(/^I should see basic info section$/, function() {
  cy.get('#basicInfo ');
  cy.get('#profilePicture ');
  cy.get('#firstName ');
  cy.get('#lastName ');
  cy.get('#email ');
});
Then(/^I should see personal info section$/, function() {
  cy.get('#personalInfo ');
});
When(/^I click on edit personal info$/, function() {
  cy.get('#editPersonalInfo ').click();
});
When(/^I fill my updated personal Info data$/, function() {
  cy.get('#personalInfoDialog').should('be.visible');
  cy.get('#maleRadio').click();
  cy.get('#country-select').click();
  cy.get('#react-select-2-option-0').click();
  cy.get('#mobile_number').clear();
  cy.get('#mobile_number').type('201069942659');
  cy.get('#employmentStatus').click();
  cy.get('#react-select-3-option-0').click();
});
When(/^press save personal info$/, function() {
  cy.get('#savePersonalInfo').click();
  cy.get('#editPersonalInfo').should('be.visible');
});
Then(/^then should see my updated personal$/, function() {
  cy.get('#genderValue').contains('Male');
});
When(/^I click on edit fields of specializations$/, function() {
  cy.get('#editFieldsOfSpecializations ').click();
});
When(/^I fill my updated fields of specializations data$/, function() {
  cy.get('#fieldsOfSpecializationDialog').should('be.visible');
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#majorFieldsOfExperienceSelect-option-3').click();
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#specificFieldsOfExperienceSelect-option-2').click();
  cy.get('#fieldsOfSpecializationTitle').click();
  cy.get('#react-select-2-input').clear();
  cy.get('#react-select-2-option-29').click();
  cy.get('#react-select-3-input').clear();
  cy.get('#react-select-3-option-3').click();
  cy.get('[name="moreThanOneMonth"]').click();
});
When(/^press save fields of specializations$/, function() {
  cy.get('#saveFieldsOfSpecialization').click();
  cy.get('#editFieldsOfSpecializations').should('be.visible');
});
Then(/^then should see my updatedfields of specializations$/, function() {
  cy.get('#industriesOfExperience').contains('Utilities');
});
When(/^I click on edit summary info$/, function() {
  cy.get('#editSummary ').click();

});
When(/^I fill my summary$/, function() {
  cy.get('#summaryField').clear();
  cy.get('#summaryField').type('test summary');
});
When(/^press save summary info$/, function() {
  cy.get('#saveSummary').click();
  cy.get('#editSummary').should('be.visible');
});
Then(/^then should see my updated summary$/, function() {
  cy.get('#summaryValue').contains('test summary');
});
When(/^I click on update cv$/, function() {
  cy.get('#editCV ').click();
});

When(/^I upload my cv$/, function() {
  cy.get('.chooseFileButton ').click();
  const profilePicturePath = 'cv.pdf';
  cy.get('input[type="file"]').attachFile(profilePicturePath, {allowEmpty: true});
});

When(/^press save cv$/, function() {
  cy.get('#saveCV').click();
  cy.get('#editCV').should('be.visible');
});
Then(/^then should see my cv$/, function() {

});
