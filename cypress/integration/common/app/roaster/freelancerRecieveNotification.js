import { And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { createDeployedQuestion } from '../../../../support/services/questionBuilder';

And(/^Admin deploy a question to question roaster$/, function() {
  createDeployedQuestion();
});

And(/^Admin deploy a question to question roaster with marketing field$/, function() {
  createDeployedQuestion({
      fields: [{ 'id': 27, 'major_field_id': 3, 'label': 'Market Research' }],
    },
  );
});

When(/^Admin deploy a question to question roaster with Arabic Language$/, function() {
  createDeployedQuestion({ language: 'ar' },
  );
});

Then(/^I should recieve a notification about the deployed question$/, function() {
  cy.get('#notificationButton').click();
});