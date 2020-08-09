import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then(/^i click on answer button of specific question$/, function() {
  cy.get('#question-2000100-submit').click();
});

Then(/^I should see rich Text box for the answer content\.$/, function() {
  cy.get('#richContent');
});
When(/^i fill answer content\.$/, function() {
  cy.get('#richContent_ifr');
  cy.wait(5000);
  cy.window()
    .then(win => {
      const editor = win.tinymce.editors['richContent'];
      editor.setContent('<p>Test content</p>');
    });
});
When(/^i click on post answer$/, function() {
  cy.get('#submitButton').click();
});
Then(/^i should see snackbar shows that says your answer will be reviewed by admin\.$/, function() {
  cy.contains('Your answer has been submitted successfully');
});