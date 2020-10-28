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

When(/^I click on the recieved notification$/, function() {
  // change to dynamic id based on msg_key + id
  cy.get('#notification-menu-list-grow button')
    .first()
    .click();
});

When(/^I should navigate to question details page$/, function() {
  cy.get('#questionRoasterMainContainer').should('be.visible');
  cy.location('pathname').should('match', /\/questions$/);
});
