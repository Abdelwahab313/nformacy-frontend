import { BASE_URL } from '../../defualtTestValues';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am a client$/, () => {});

Given(/^have already requested a call with freelancer$/, () => {});

Given(/^logged in$/, () => {
  cy.visit(BASE_URL);
  cy.get('#email').type('b@gmail.com');
  cy.get('#password').type('12345678');
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
