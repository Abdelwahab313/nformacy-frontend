import { When, Then } from 'cypress-cucumber-preprocessor/steps';


And(/^I should see question details$/, function() {
  cy.contains('Edit Question');
});

When(/^i edit question title$/, function() {
  cy.get('#title').clear();
  cy.get('#title').type('updatedTitle');
});
When(/^i click apply changes$/, function() {
  cy.get('#applyChangesButton').click();
});

When(/^I fill all the question details$/, function() {
  const givenTitle = 'test question title';
  cy.wrap(givenTitle).as('questionTitle');
  cy.get('#title').type(givenTitle);
  cy.get('#majorFieldsOfExperienceSelect').click();
  cy.get('#majorFieldsOfExperienceSelect-option-2').click();
  cy.get('#specificFieldsOfExperienceSelect').click();
  cy.get('#specificFieldsOfExperienceSelect-option-2').click();
  cy.get('#industry').click();
  cy.get('#industry-option-0').click();
  cy.get('#questionLanguage').click();
  cy.get('#questionLanguage-option-0').click();
  cy.get('#assignmentType').click();
  cy.get('#assignmentType-option-0').click();
  cy.get('#hoursToCloseAnswers').type('13');
  cy.get('#hoursToReviewAndEdit').type('10');
  cy.get('#assignAdviser').click();
  cy.get('#assignAdviser-option-0').click();
  cy.get('#richContent_ifr');
  cy.wait(1000);
  cy.window().then((win) => {
    const editor = win.tinymce.editors['richContent'];
    editor.setContent('<p>Test content</p>');
  });
});

When(/^I click deploy to question roaster$/, function() {
  cy.get('#approveQuestion').click();
});

When(/^i click "Send to adviser"$/, function() {
  cy.get('#applyChangesButton').click();
});

When(/^I click "Save and complete later"$/, function() {
  cy.get('#saveAndCompleteLaterButton').click();
});

Then(
  /^I should be redirected to questions page and see snackbar with message "([^"]*)"$/,
  function(term) {
    cy.contains(term);
    cy.get('#questionsList');
  },
);

Then(
  /^I should see snackbar with message "Question Sent to Adviser"$/,
  function() {
    cy.contains('Dashboard');
    cy.contains('Question Sent to Adviser');
  },
);

When(/^i click accept$/, function() {
  cy.get('#acceptButton').click();
});

When(/^i assign an adviser$/, function() {
  cy.get('#assignAdviser').click();
  cy.get('#assignAdviser-option-0').click();
  cy.get('#hoursToReviewAndEdit').type(5);
  cy.get('#hoursToCloseAnswers').type(7);
});

Then(
  /^I should see send to admin button, save and complete later button and attachment button appear$/,
  function() {
    cy.get('#sendToAdminButton').should('exist');
    cy.get('.chooseFileButton').should('exist');
    cy.get('#saveAndCompleteLaterButton').should('exist');
  },
);

When(/^i click reject$/, function() {
  cy.get('#rejectButton').click();
});

Then(/^I should see what is the time of review and edit assigned$/, function() {
  cy.get('#reviewAndEditTime').should('exist');
});

When(/^i click send to admin for deployment$/, function() {
  cy.get('#sendToAdminButton').click();
});

When(/^i click save and complete later$/, function() {
  cy.get('#saveAndCompleteLaterButton').click();
});
Then(/^I should see the question form with no action buttons$/, function() {
  cy.wait(1000);
  cy.get('#saveAndCompleteLaterButton').should('not.exist');
  cy.get('#sendToAdminButton').should('not.exist');
  cy.get('#applyChangesButton').should('not.exist');
  cy.get('#acceptButton').should('not.exist');
  cy.get('#rejectButton').should('not.exist');
  cy.get('#approveQuestion').should('not.exist');
});

When(/^I upload an image for the question thumbnail$/, function() {
  cy.get('#thumbnail-uploader').click();
  const thunbnailPath = 'download.png';
  cy.get('input[type="file"]').attachFile(thunbnailPath);
});