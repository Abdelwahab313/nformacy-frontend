import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { createDayAvailableForUser } from '../../helperFunctions';


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
  cy.get('#update-calendar-dialog td[data-day=\'04-07\']').click();
});

Then(/^I should see on the left of the calendar a field with the start\/end date and start\/end time fields$/, function() {
  cy.get('#start-date-range-picker').should('be.visible');
  cy.get('#end-date-range-picker').should('be.visible');
  cy.get('#start-time-range-picker').should('be.visible');
  cy.get('#end-time-range-picker').should('be.visible');
});

Then(/^The start Day and end will both have the same day with the day selected$/, function() {
  cy.get('#start-date-range-picker').should('have.value', '04/07/2020');
  cy.get('#end-date-range-picker').should('have.value', '04/07/2020');

});

When(/^I fill the available time$/, function() {
  cy.get('#start-time-range-picker').should('have.value', '08:00 AM');
  cy.get('#end-time-range-picker').should('have.value', '05:00 PM');
});

When(/^click submit time$/, function() {
  cy.get('#confirm').click();
});

Then(/^I should see the selected day labeled as available day in the calendar$/, function() {
  cy.get('#update-calendar-dialog td[data-day=\'04-07\']').should('have.class', 'availableCell');
});

When(/^I click on a day that already set as available$/, function() {
  cy.get('#update-calendar-dialog td[data-day=\'28-07\']')
    .should('have.class', 'availableCell')
    .click();
});

Then(/^I should the time range populated with the available time range$/, function() {
  cy.get('#start-date-range-picker').should('have.value', '28/07/2020');
  cy.get('#start-time-range-picker').should('have.value', '10:00 AM');
  cy.get('#end-time-range-picker').should('have.value', '04:00 PM');
});

When(/^I update the time range$/, function() {
  cy.wrap('12:00 PM').as('updatedStartTime');
  cy.wrap('06:00 PM').as('updatedEndTime');
  cy.get('#start-time-range-picker').clear();
  cy.get('#start-time-range-picker').type('12:00 PM');
  cy.get('#end-time-range-picker').clear();
  cy.get('#end-time-range-picker').type('06:00 PM');
});

Then(/^I should see the selected day as available day with the updated time$/, function() {
  cy.get('#update-calendar-dialog td[data-day=\'28-07\']')
    .should('have.class', 'availableCell')
    .click();
  cy.get('#start-time-range-picker').should('have.value', this.updatedStartTime);
  cy.get('#end-time-range-picker').should('have.value', this.updatedEndTime);
});
Given(/^I have day selected as available on my calendar$/, function() {
  createDayAvailableForUser('20200728', '10:00', '16:00');
});