import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When(/^i click on post answer$/, function() {
  cy.get('#submitButton').click();
});

When(/^i click attach file and choose a file.$/, function() {
  cy.get('.chooseFileButton ').click();
  const attachmentPath = 'Cheatsheet.pdf';
  cy.get('input[type="file"]').attachFile(attachmentPath);
});
Then(/^the file i chose should be attached to the answer$/, function() {
  cy.contains('Cheatsheet.pdf');
});
Then(/^the files i chose should be attached to the answer\.$/, function() {
  cy.get('#attachment-0');
  cy.get('#attachment-1');
});
Then(
  /^I should be redirected success page that contais thank you note and two buttons to redirect to home or roaster$/,
  function() {
    cy.get('#thankYouNote').should('have.text', 'Thank you for your answer');
    cy.get('#redirectToQuestionRoaster');
    cy.get('#redirectToHome');
  },
);

Then(/^i click on answer button of specific question$/, function() {
  cy.get('#question-2000100-submit').click();
});

Then(/^I should see rich Text box for the answer content\.$/, function() {
  cy.get('#richContent');
});

When(/^i fill answer content\.$/, function() {
  cy.get('#richContent_ifr');
  cy.wait(1000);
  cy.window().then((win) => {
    const editor = win.tinymce.editors['richContent'];
    editor.setContent('<p>Test content</p>');
  });
});
