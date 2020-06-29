import { BASE_URL } from '../../defualtTestValues';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am a client$/, () => {});

Given(/^have already requested a call with freelancer$/, () => {});

Given(/^logged in$/, () => {
  cy.visit(BASE_URL);
  cy.get('#email').type('client@test.com');
  cy.get('#password').type('test1234');
  cy.get('#login').click();
  cy.get('#side-menu');
});

When(/^go to meeting page$/, function() {
  cy.visit(`${BASE_URL}/meeting/list`);
});

Then(
  /^should see the scheduled meeting with status freelancers assigned$/,
  function() {
    cy.get('#meeting-3').should('exist');
    cy.get('#meeting-3 .status').should('have.text', 'Candidates Shortlisted');
  },
);

Then(/^should see meeting details page with proposed freelancers$/, function() {
  cy.get('#meeting-details').should('exist');
  cy.get('#shortlisted-candidates-section').should('exist');
  cy.get('#shortlisted-candidates-section .freelancer-row').should(
    'have.length',
    2,
  );
});

Then(/^freelancers list should be selectable$/, function() {});

When(/^click on the meeting details$/, function() {
  cy.get('#meeting-3 .edit').click();
});

When(/^select a freelancer$/, function() {
  cy.get('#freelancer-2').click();
  cy.get('#freelancer-2-calendar').click();
});

Then(/^I should see calendar dialog opened$/, function() {
  cy.get('#calendar-dialog').should('exist');
  cy.get('#calendar-dialog').should('exist');
});

Then(/^available days are highlighted$/, function() {
  cy.get('.availableCell').should('have.length', 4);
});

Then(/^I click on a date$/, function() {
  cy.get('.availableCell:first-child').click();
  cy.get('#selectedDayIcon').should('have.length', 1);
});

Then(/^I should see available times bar on the right$/, function() {});
