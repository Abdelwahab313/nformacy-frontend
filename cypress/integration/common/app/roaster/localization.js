import { Then, Given, When } from 'cypress-cucumber-preprocessor/steps';
import { signUpAndSetTokens } from '../../../../helperFunctions';

const LANGUAGES_BUTTON_TEXT = {
  Arabic: 'English',
  English: 'العربية',
};

Given(/^I should see a language button with "([^"]*)" text$/, function(
  languageButtonText,
) {
  cy.get('#switchLang').should('have.text', languageButtonText);
});

When(/^i click on the language button$/, function() {
  cy.get('#switchLang').click();
});

Then(/^The page content should be translated to "([^"]*)"$/, function(
  currentLanguage,
) {
  cy.get('#switchLang').should(
    'have.text',
    LANGUAGES_BUTTON_TEXT[currentLanguage],
  );
});

Then(/^The page direction should be "([^"]*)"$/, function(dir) {
  cy.wait(3000);
  cy.get('#questionRoasterMainContainer').should('have.attr', 'dir', dir);
});
Given(/^I login in with an account with "([^"]*)" saved as language$/, function(
  language,
) {
  const LOCALES_SHORT = {
    english: 'en',
    arabic: 'ar',
  };
  signUpAndSetTokens({ locale: LOCALES_SHORT[language] });
});
