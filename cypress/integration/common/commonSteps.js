import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(/^then should be redirected to homepage$/, function() {
  cy.get('#header');
});
