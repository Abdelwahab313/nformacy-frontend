Given(/^I should see shortlisted consultants$/, function () {
  cy.get('.shortlistedConsultants').should('have.length', 3);
});

Given(/^I click on first shortlisted$/, function () {
  cy.get('.shortlistedConsultants').first().trigger('mouseover');
  cy.get('.shortlistedConsultants button').first().click();
});

Given(/^A calendar should be displayed$/, function () {
  cy.get('#calendar-dialog').contains('Please Pick a time to Schedule the Call');
});

Given(/^I fill meeting time$/, function () {
  cy.get('.availableCell').first().click();
  cy.get('.availableCell').first().click();
  cy.get('#meetingTimePickerContainer').contains('Your call will be in');
  cy.get('#available-time').click().first();
  cy.get('#available-time').click()
  cy.get('#react-select-2-option-0').click();
  cy.get('#meetingTimePickerContainer').contains('8:00 AM');
});

Given(/^I click submit meeting time$/, function () {
  cy.get('#confirmBtnCalendar').click();
});

Given(/^Meeting will be scheduled$/, function () {
  cy.contains('Meeting has been scheduled successfully with');
});