import { When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL } from '../../../../defualtTestValues';
import { getFromLocalStorage } from '../../../../helperFunctions';
import { createServiceRequest } from '../../../../support/services/serviceRequestBuilder';

When(/^I have service request assigned to me$/, function() {
    createServiceRequest();
  });

  And(/^I am on the services dashboard$/, function() {
    cy.visit(BASE_URL + '/admin/services');
    cy.contains('Services');
  });

  And(/^I should see service with pending status$/, function() {
    const requestID = getFromLocalStorage('createdServiceRequest')
    .id;
  cy.get(`tr[row-reference="${requestID}"] .state`).contains('Verify Request');
  });

