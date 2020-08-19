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
Then(/^I should be redirected success page that contais thank you note and two buttons to redirect to home or roaster$/, function() {
  cy.get('#thankYouNote').should('have.text', 'Thank you for your answer');
  cy.get('#redirectToQuestionRoaster');
  cy.get('#redirectToHome');
});
