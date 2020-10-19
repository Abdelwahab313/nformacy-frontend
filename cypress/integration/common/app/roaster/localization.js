import { Then, Given, When } from 'cypress-cucumber-preprocessor/steps';
//
// const LANGUAGES_BUTTON_TEXT = {
//   Arabic: 'English',
//   English: 'العربية',
// };

Given(/^I should see a language button with "([^"]*)" text$/, function(
  languageButtonText,
) {
  cy.get('#switchLang').should('have.text', languageButtonText);
});

When(/^i click on the language button$/, function() {
  cy.get('#switchLang').click();
});

Then(/^The page content should be translated to "([^"]*)"$/, function() {
  // cy.get('#switchLang').should(
  //   'have.text',
  //   LANGUAGES_BUTTON_TEXT[currentLanguage],
  // );
});

Then(/^The page direction should be "([^"]*)"$/, function() {
  // cy.get('#questionRoasterMainContainer').should('have.attr', 'direction', dir);
});
