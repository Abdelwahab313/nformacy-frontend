import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../../../defualtTestValues';

Then(
  /^I should see search bar And a filtering menu for the fields$/,
  function() {
    cy.get('#search');
    cy.get('#filters');
  },
);
Then(
  /^All the questions that are open with the following fields: Question title, Reference \#, post date, field, subfield, industry, Question content, assignment type, close date\.$/,
  function() {
    cy.get('#question-2000101-title', { timeout: 50000 })
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000101-referenceNumber')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000101-postDate')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000101 #questionMajorFields-0')
      .trigger('mouseover')
      .get('#questionSubFields-0')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#questionSubFields-0')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000101-content')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000101-currentActionTime')
      .invoke('text')
      .should('not.be.empty');
  },
);
Then(/^Each question should have answer button beneath it\.$/, function() {
  cy.get('#question-2000101-title')
    .invoke('text')
    .should('not.be.empty');
  cy.get('#question-2000101-submit');
});
When(/^I click on a field from the filtering menu\.$/, function() {
  cy.get('#question-2000101-title', { timeout: 50000 })
    .invoke('text')
    .should('not.be.empty');
  cy.get('#filters-0').click();
});
Then(/^I should only see questions that belongs to that field\.$/, function() {
  cy.get('#question-2000101 #questionMajorFields-0').should(
    'have.text',
    'Finance',
  );
});
Then(/^I should see a banner with Nformacy primary color$/, function() {
  cy.get('#question-roaster-banner', { timeout: 50000 });
});
Then(/^Question Roaster title in bold white large font$/, function() {
  cy.get('#question-roaster-header');
});
Then(/^Search bar$/, function() {
  cy.get('#question-roaster-search-bar');
});
Then(/^Breadcrumbs including path to question roaster from home$/, function() {
  cy.get('#question-roaster-breadcrumbs');
  cy.get('#home-breadcrumb');
  cy.get('#home-breadcrumb').click();
  cy.location().should((loc) => {
    expect(loc.toString()).to.eq('http://localhost:5001/dashboard');
  });
  cy.visit(BASE_URL + '/questions');
});
Then(/^filters row with highlighted selected filter$/, function() {
  cy.get('#questions-roaster-filters-container', { timeout: 50000 });
});
Then(
  /^More icon that opens dropdown with filters that are not showing$/,
  function() {
    cy.get('#more-options-menu');
  },
);
Then(/^Language filter as dropdown$/, function() {
  cy.get('#question-language-filter');
});
Then(
  /^I should see first picture in the question content as thumbnail on the left$/,
  function() {
    cy.get('#question-2000101-title', { timeout: 50000 }).should('exist');
  },
);
Then(
  /^question reference number in primary color followed by post date$/,
  function() {
    cy.get('#question-2000101-referenceNumber')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000101-postDate')
      .invoke('text')
      .should('not.be.empty');
  },
);
Then(
  /^question title in bold large font followed by time to close question$/,
  function() {
    cy.get('#question-2000101-title')
      .invoke('text')
      .should('not.be.empty');
    cy.get('#question-2000101-currentActionTime')
      .invoke('text')
      .should('not.be.empty');
  },
);
Then(
  /^question fields as chips with tooltip specifying minor fields$/,
  function() {
    cy.get('#question-2000101 #questionMajorFields-0')
      .trigger('mouseover')
      .get('#questionSubFields-0')
      .invoke('text')
      .should('not.be.empty');
  },
);
Then(/^Question content in normal font size$/, function() {
  cy.get('#question-2000101-content')
    .invoke('text')
    .should('not.be.empty');
});
Then(/^assignment type icon on the left$/, function() {
  cy.get('#question-2000101-assignment').should('exist');
});
Then(/^answer button on the right$/, function() {
  cy.get('#question-2000101-submit').should('exist');
});
