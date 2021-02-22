import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { createDayAvailableForUser } from '../../../../helperFunctions';
import moment from 'moment';

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
  cy.get(
    `#update-calendar-dialog td[data-day='25-${moment().format('MM')}']`,
  ).click({ force: true });
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
    cy.get('#start-date-range-picker').should(
      'have.value',
      `25/${moment().format('MM')}/${moment().format('Y')}`,
    );
    cy.get('#end-date-range-picker').should(
      'have.value',
      `25/${moment().format('MM')}/${moment().format('Y')}`,
    );
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
    const thirteenthOfCurrentMonth = new Date(
      `${moment().format('Y')}-${moment().format('MM')}-25 8:000`,
    ).toISOString();
    cy.get(`div[data-title='08:00 - 17:00']`).should('exist');
    cy.get(`div[data-date='${thirteenthOfCurrentMonth}'`);
  },
);

When(/^I click on a day that already set as available$/, function() {
  cy.contains('08:00 - 17:00');
  cy.get(
    `#update-calendar-dialog [data-date='Tue ${moment().format(
      'MMM',
    )} 04 ${moment().format(
      'Y',
    )} 08:00:00 GMT+0200 (Eastern European Standard Time)']`,
  );
  cy.get(
    `#update-calendar-dialog td[data-day='04-${moment().format('MM')}']`,
  ).click();
});

Then(
  /^I should see the time range populated with the available time range$/,
  function() {
    cy.get('#start-date-range-picker').should(
      'have.value',
      `04/${moment().format('MM')}/${moment().format('Y')}`,
    );
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
    const thirteenthOfCurrentMonth = new Date(
      `${moment().format('Y')}-${moment().format('MM')}-25 8:000`,
    ).toISOString();
    cy.get(`div[data-date='${thirteenthOfCurrentMonth}']`);
  },
);

Given(/^I have day selected as available on my calendar$/, function() {
  createDayAvailableForUser(
    '10:00 : 16:00',
    `${moment().format('Y')}-${moment().format('MM')}-28 10:00`,
    `${moment().format('Y')}-${moment().format('MM')}-28 16:00`,
  );
});

When(/^I click on a day that is already available$/, function() {
  cy.get(
    `#update-calendar-dialog td[data-day='25-${moment().format('MM')}']`,
  ).click();
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
    'America/New_York (GMT-05:00)',
  );
});

Then(/^I should see the time 06:00 AM and 12:00 PM$/, function() {
  cy.get(`#update-calendar-dialog td[data-day='28-${moment().format('MM')}']`)
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
  /^I should see the time of that event to be changed to 01:00 PM and 10:00 PM$/,
  function() {
    cy.get('div[data-title="01:00 - 10:00"]')
      .first()
      .should('exist');
  },
);
When(/^Click add available time$/, function() {
  cy.get('#addAvailableTime').click({ force: true });
});
When(/^When I click on a day that not available$/, function() {
  cy.get(
    `#update-calendar-dialog td[data-day='20-${moment().format('MM')}']`,
  ).click({ force: true });
});
When(/^fill the available date range to be after a week$/, function() {
  cy.get('#end-date-range-picker').clear({ force: true });
  cy.get('#end-date-range-picker').type(
    `27/${moment().format('MM')}/${moment().format('Y')}`,
  );
});
Then(
  /^click on the free date slot and edit the available date range$/,
  function() {
    cy.get('#update-calendar-dialog div[data-title="08:00 - 17:00"]')
      .first()
      .click();
    cy.contains(`20-27 ${moment().format('MMMM')}`);
    cy.get('#edit-1').click();
    cy.get(
      `[value="${moment().format('Y')}-${moment().format('MM')}-20 08:00"]`,
    ).clear();
    cy.get('.MuiInputBase-input.MuiOutlinedInput-input')
      .first()
      .type(`${moment().format('Y')}-${moment().format('MM')}-22 08:00`);
    cy.get('#saveButton').click();
    cy.wait(500);
  },
);
Then(
  /^I should see the available date slot range with the updated range$/,
  function() {
    const updateDateString = new Date(
      `${moment().format('Y')}-${moment().format('MM')}-22 8:00:00`,
    ).toISOString();
    cy.get(`#update-calendar-dialog [data-date="${updateDateString}"]`)
      .first()
      .click();
    cy.contains(`22-27 ${moment().format('MMMM')}`);
  },
);
When(/^I click on a available day$/, function() {
  const thirteenthOfCurrentMonth = new Date(
    `${moment().format('Y')}-${moment().format('MM')}-25 8:00:00`,
  ).toISOString();
  cy.get(`#update-calendar-dialog div[data-date='${thirteenthOfCurrentMonth}']`)
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
    cy.get(
      `#update-calendar-dialog td[data-day='25-${moment().format('MM')}']`,
    ).click();
    cy.get('#addAvailableTime').click();
    cy.get('#start-date-range-picker').type(
      `22/${moment().format('MM')}/${moment().format('Y')}`,
    );
    cy.get('#end-date-range-picker').type(
      `22/${moment().format('MM')}/${moment().format('Y')}`,
    );
    cy.get('#confirm').click();
    cy.wait(500);
    cy.get('div[data-title="08:00 - 17:00"]')
      .first()
      .should('exist');
  },
);

Then(/^I should see the time 12:00 PM and 06:00 PM$/, function() {
  cy.get('#start-time-range-picker').should('have.value', '12:00 PM');
  cy.get('#end-time-range-picker').should('have.value', '06:00 PM');
});

Then(/^I should see the time 06:00 AM and 12:00 PM$/, function() {
  cy.get(`#update-calendar-dialog td[data-day='28-${moment().format('MM')}']`)
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
    'Pacific/Chatham (GMT+13:45)',
  );
});
Then(
  /^I should see the time of that event to be changed to 18:45 and 03:45 25-26 in the current month$/,
  function() {
    cy.get('#update-calendar-dialog [data-title="19:45 - 04:45"]')
      .first()
      .click();
    cy.contains(`25-26 ${moment().format('MMMM')}`);
  },
);
