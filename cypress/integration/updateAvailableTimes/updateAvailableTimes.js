
import {  When, Then } from 'cypress-cucumber-preprocessor/steps';


When(/^I click on calendar summary cards' button$/, function() {
  cy.get('#open-update-calendar-dialog-btn').click();
});

Then(/^I should see a modal with calendar on the left$/, function() {
  cy.get('#update-calendar-dialog').should('be.visible');
  cy.get('#calendar-view').should('be.visible');
});

Then(/^field to select the displayed time zones$/, function() {
  cy.get('#time-zone-picker').should('be.visible');
});

Then(/^selected by default the timezone of the user$/, function() {
  cy.get('#time-zone-picker').should('have.value', 'Africa/Cairo (GMT+02:00)');
});

Then(/^button for close dialog$/, function() {
  cy.get('#update-calendar-dialog').should('have.descendants', '#close-dialog');
  cy.get('#close-dialog').click();
  cy.get('#update-calendar-dialog').should('not.be.visible');
});


When(/^I click on a free day$/, function() {
  // should get dynamic day
  cy.get("#update-calendar-dialog div.dayText[data-day='04-07']").click();
});

Then(/^I should see on the left of the calendar a field with the start\/end date and start\/end time fields$/, function() {
  cy.get('#start-date-range-picker').should('be.visible');
  cy.get('#start-date-range-picker').should('have.value', '04/07/2020');
  cy.get('#end-date-range-picker').should('have.value', '04/07/2020');

  // cy.get('')
});

Then(/^The start Day and end will both have the same day with the day selected$/, function() {

});
When(/^I fill the available time$/, function() {

});
When(/^click submit time$/, function() {

});
Then(/^I should see the selected day labeled as available day in the calendar$/, function() {

});