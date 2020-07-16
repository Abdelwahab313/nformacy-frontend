import { BASE_URL } from '../../defualtTestValues';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';


When(/^I click on calendar summary cards' button$/, function() {
  cy.get('#open-update-calendar-dialog-btn').click();
});

Then(/^I should see a modal with calendar on the left$/, function() {
  cy.get('#update-calendar-dialog').should('be.visible');
  cy.get('#calendar-view').should('be.visible');
});

Then(/^field to select the displayed time zones$/, function() {
  cy.get('#time-zone-picker').should('be.visible')
  cy.get('#time-zone-picker').should('have.value', 'Africa/Cairo (GMT+02:00)')
});

Then(/^selected by default the timezone of the user$/, function() {

});

Then(/^button for cancel$/, function() {

});