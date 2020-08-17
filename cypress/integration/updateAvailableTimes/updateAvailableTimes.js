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
  const isCairoTime =
    Intl.DateTimeFormat().resolvedOptions().timeZone === 'Africa/Cairo';
  const defaultTimeZoneLabel = isCairoTime
    ? 'Africa/Cairo (GMT+02:00)'
    : 'UTC (GMT+00:00)';
  cy.get('#time-zone-picker').should('have.value', defaultTimeZoneLabel);
});

Then(/^button for close dialog$/, function() {
  cy.get('#update-calendar-dialog').should('have.descendants', '#close-dialog');
  cy.get('#close-dialog').click();
  cy.get('#update-calendar-dialog').should('not.be.visible');
});

When(/^I click on a free day$/, function() {
  // should get dynamic day
  cy.get("#update-calendar-dialog td[data-day='30-08']").click();
});

Then(
  /^I should see on the left of the calendar a field with the start\/end date and start\/end time fields$/,
  function() {
    cy.get('#start-date-range-picker').should('be.visible');
    cy.get('#end-date-range-picker').should('be.visible');
    cy.get('#start-time-range-picker').should('be.visible');
    cy.get('#end-time-range-picker').should('be.visible');
  },
);

Then(
  /^The start Day and end will both have the same day with the day selected$/,
  function() {
    cy.get('#start-date-range-picker').should('have.value', '30/08/2020');
    cy.get('#end-date-range-picker').should('have.value', '30/08/2020');
  },
);

When(/^I fill the available time$/, function() {
  cy.get('#start-time-range-picker').should('have.value', '08:00 AM');
  cy.get('#end-time-range-picker').should('have.value', '05:00 PM');
});

When(/^click submit time$/, function() {
  cy.get('#confirm').click();
  cy.wait(500);
});

Then(
  /^I should see the selected day labeled as available day in the calendar$/,
  function() {
    cy.get('.AppointmentsContainer-container-98').last().contains('08:00 - 17:00');
    cy.get('.AppointmentsContainer-container-98')
      .last()
      .click({ force: true });
  },
);

When(/^I click on a day that already set as available$/, function() {
  cy.contains('08:00 - 17:00');
  cy.get("#update-calendar-dialog [data-date='Tue Aug 04 2020 08:00:00 GMT+0200 (Eastern European Standard Time)']");
  cy.get("#update-calendar-dialog td[data-day='04-08']").click();
});

Then(
  /^I should see the time range populated with the available time range$/,
  function() {
    cy.get('#start-date-range-picker').should('have.value', '04/08/2020');
    const isCairoTime =
      Intl.DateTimeFormat().resolvedOptions().timeZone === 'Africa/Cairo';
    const startTime = isCairoTime ? '12:00 PM' : '10:00 AM';
    const endTime = isCairoTime ? '06:00 PM' : '04:00 PM';
    cy.get('#start-time-range-picker').should('have.value', startTime);
    cy.get('#end-time-range-picker').should('have.value', endTime);
  },
);

When(/^I update the time range$/, function() {
  cy.wrap('12:00 PM').as('updatedStartTime');
  cy.wrap('06:00 PM').as('updatedEndTime');
  cy.get('#start-time-range-picker').clear();
  cy.get('#start-time-range-picker').type('12:00 PM');
  cy.get('#end-time-range-picker').clear();
  cy.get('#end-time-range-picker').type('06:00 PM');
});

Then(
  /^I should see the selected day as available day with the updated time$/,
  function() {
    cy.get("#update-calendar-dialog [data-date='Sun Aug 30 2020 12:00:00 GMT+0200 (Eastern European Standard Time)']");
  },
);

Given(/^I have day selected as available on my calendar$/, function() {
  createDayAvailableForUser(
    '10:00 : 16:00',
    '2020-08-28 10:00',
    '2020-08-28 16:00',
  );
});

When(
  /^I click on a day that is already available$/,
  function() {
    cy.get("#update-calendar-dialog td[data-day='30-08']").click();
  },
);

Then(/^I should see the time 12:00 PM and 06:00 PM$/, function() {
  cy.get('value=["12:00 PM"]');
  cy.get('#end-time-range-picker').should('have.value', '06:00 PM');
});

When(/^I change time zone to be America\/New_York$/, function() {
  cy.get('button[title="Open"]').click();
  cy.get('#time-zone-picker-option-168').click();
  cy.get('#time-zone-picker').should(
    'have.value',
    'America/New_York (GMT-04:00)',
  );
});

Then(/^I should see the time 06:00 AM and 12:00 PM$/, function() {
  cy.get("#update-calendar-dialog td[data-day='28-08']")
    .should('have.class', 'availableCell')
    .click();
  cy.get('#start-time-range-picker').should('have.value', '06:00 AM');
  cy.get('#end-time-range-picker').should('have.value', '12:00 PM');
});

When(/^update the time range to be 09:00 to 15:00$/, function() {
  cy.get('#start-time-range-picker').clear();
  cy.get('#start-time-range-picker').type('09:00 AM');
  cy.get('#end-time-range-picker').clear();
  cy.get('#end-time-range-picker').type('03:00 PM');
});

When(/^click on the change time zone button to be Africa\/Cairo$/, function() {
  cy.get('button[title="Open"]').click();
  cy.get('#time-zone-picker-option-13').click();
  cy.get('#time-zone-picker').should('have.value', 'Africa/Cairo (GMT+02:00)');
});

Then(/^I should see the time 03:00 PM and 09:00 PM$/, function() {
  cy.get("#update-calendar-dialog td[data-day='28-08']")
    .should('have.class', 'availableCell')
    .click();
  cy.get('#start-time-range-picker').should('have.value', '03:00 PM');
  cy.get('#end-time-range-picker').should('have.value', '09:00 PM');
});
When(/^Click add available time$/, function() {
  cy.get('#addAvailableTime').click();
});
When(/^When I click on a day that not available$/, function() {
  cy.get("#update-calendar-dialog td[data-day='20-08']").click();
});
When(/^fill the available date range to be after a week$/, function() {
  cy.get('#end-date-range-picker').clear();
  cy.get('#end-date-range-picker').type('27/08/2020');
});