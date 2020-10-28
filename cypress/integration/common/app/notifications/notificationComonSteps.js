import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then(
  /^I should see the newly received notification with message "([^"]*)"$/,
  function(message) {
    cy.get('#notification-menu-list-grow')
      .find('button')
      .first()
      .contains(message);
  },
);

When(/^I click on notifications menu$/, function() {
  cy.get('#notificationsButton').click();
});