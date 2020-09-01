import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
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
  cy.get("#update-calendar-dialog td[data-day='30-09']").click();
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
    cy.get('#start-date-range-picker').should('have.value', '30/09/2020');
    cy.get('#end-date-range-picker').should('have.value', '30/09/2020');
  },
);

When(/^I fill the available time$/, function() {
  cy.get('#start-time-range-picker').should('have.value', '08:00');
  cy.get('#end-time-range-picker').should('have.value', '17:00');
});

When(/^click submit time$/, function() {
  cy.get('#confirm').click();
  cy.wait(500);
});

Then(
  /^I should see the selected day labeled as available day in the calendar$/,
  function() {
    cy.get('.AppointmentsContainer-container-98')
      .last()
      .contains('08:00 - 17:00');
    cy.get('.AppointmentsContainer-container-98')
      .last()
      .click({ force: true });
  },
);

When(/^I click on a day that already set as available$/, function() {
  cy.contains('08:00 - 17:00');
  cy.get(
    "#update-calendar-dialog [data-date='Tue Sep 04 2020 08:00:00 GMT+0200 (Eastern European Standard Time)']",
  );
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
  cy.wrap('12:00').as('updatedStartTime');
  cy.wrap('18:00').as('updatedEndTime');
  cy.get('#start-time-range-picker').clear();
  cy.get('#start-time-range-picker').type('12:00');
  cy.get('#end-time-range-picker').clear();
  cy.get('#end-time-range-picker').type('18:00');
});

Then(
  /^I should see the selected day as available day with the updated time$/,
  function() {
    cy.get(
      "#update-calendar-dialog [data-date='Wed Sep 30 2020 12:00:00 GMT+0200 (Eastern European Standard Time)']",
    );
  },
);

Given(/^I have day selected as available on my calendar$/, function() {
  createDayAvailableForUser(
    '10:00 : 16:00',
    '2020-09-28 10:00',
    '2020-09-28 16:00',
  );
});

When(/^I click on a day that is already available$/, function() {
  cy.get("#update-calendar-dialog td[data-day='30-09']").click();
});

Then(/^I should see the time 12:00 PM and 06:00 PM$/, function() {
  cy.get('value=["12:00"]');
  cy.get('#end-time-range-picker').should('have.value', '18:00');
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
  cy.get("#update-calendar-dialog td[data-day='28-09']")
    .should('have.class', 'availableCell')
    .click();
  cy.get('#start-time-range-picker').should('have.value', '06:00');
  cy.get('#end-time-range-picker').should('have.value', '12:00');
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

Then(
  /^I should see the time of that event to be changed to 02:00 PM and 11:00 PM$/,
  function() {
    cy.get('#update-calendar-dialog [data-title="02:00 - 11:00"]')
      .first()
      .should('exist');
  },
);
When(/^Click add available time$/, function() {
  cy.get('#addAvailableTime').click();
});
When(/^When I click on a day that not available$/, function() {
  cy.get("#update-calendar-dialog td[data-day='20-09']").click();
});
When(/^fill the available date range to be after a week$/, function() {
  cy.get('#end-date-range-picker').clear();
  cy.get('#end-date-range-picker').type('27/09/2020');
});
Then(
  /^click on the free date slot and edit the available date range$/,
  function() {
    cy.get('#update-calendar-dialog [data-title="08:00 - 17:00"]')
      .first()
      .click();
    cy.contains('20-27 September');
    cy.get('#edit-1').click();
    cy.get('[value="20/09/2020 08:00"]').clear();
    cy.get(
      '.MuiInputBase-input.MuiFilledInput-input.MuiInputBase-inputHiddenLabel.MuiFilledInput-inputHiddenLabel.MuiInputBase-inputAdornedEnd.MuiFilledInput-inputAdornedEnd',
    )
      .first()
      .type('22/09/2020 08:00');
    cy.get(
      '.MuiButtonBase-root.MuiButton-root.MuiButton-text.memo-button-242',
    ).click();
  },
);
Then(
  /^I should see the available date slot range with the updated range$/,
  function() {
    cy.get(
      '#update-calendar-dialog [data-date="Tue Sep 22 2020 08:00:00 GMT+0200 (Eastern European Standard Time)"]',
    )
      .first()
      .click();
    cy.contains('22-27 September');
  },
);
When(/^I click on a available day$/, function() {
  cy.get(
    "#update-calendar-dialog [data-date='Wed Sep 30 2020 08:00:00 GMT+0200 (Eastern European Standard Time)']",
  )
    .first()
    .click();
});
When(/^I click the delete this day button$/, function() {
  cy.get('#delete-1').click();
});
When(/^time zone is selected to be Africa\/cairo \+02:00$/, function() {
  cy.get('#time-zone-picker').should('have.value', 'Africa/Cairo (GMT+02:00)');
});
When(
  /^I have an event that is already available with hours 08:00 and 17:00$/,
  function() {
    cy.get("#update-calendar-dialog td[data-day='30-09']").click();
    cy.get('#addAvailableTime').click();
    cy.get('#start-date-range-picker').type('22/09/2020');
    cy.get('#end-date-range-picker').type('22/09/2020');
    cy.get('#confirm').click();
    cy.wait(500);
    cy.get('#update-calendar-dialog [data-title="08:00 - 17:00"]')
      .first()
      .should('exist');
  },
);

Then(/^I should see the time 12:00 PM and 06:00 PM$/, function() {
  cy.get('#start-time-range-picker').should('have.value', '12:00 PM');
  cy.get('#end-time-range-picker').should('have.value', '06:00 PM');
});

Then(/^I should see the time 06:00 AM and 12:00 PM$/, function() {
  cy.get("#update-calendar-dialog td[data-day='28-07']")
    .should('have.class', 'availableCell')
    .click();
  cy.get('#start-time-range-picker').should('have.value', '06:00 AM');
  cy.get('#end-time-range-picker').should('have.value', '12:00 PM');
});
When(/^I change time zone to be Pacific\/Chatham$/, function() {
  cy.get('button[title="Open"]').click();
  cy.get('#time-zone-picker-option-529').click();
  cy.get('#time-zone-picker').should(
    'have.value',
    'Pacific/Chatham (GMT+12:45)',
  );
});
Then(/^I should see the time of that event to be changed to 18:45 and 03:45 30-09 31-09$/, function() {

  cy.get('#update-calendar-dialog [data-title="18:45 - 03:45"]')
    .first()
    .click();
  cy.contains('30-31 September');
});
