Feature: Client Create Request
  as a client i want to create a request and send it to admin

  Scenario: Client make a question request
    Given I login as a client
    When  visit home page
    And   I select ask the expert option
    Then  I should be navigated to question service form
    When  I fill the service form
    And   I click on submit service button
    Then  I should see snackbar with message "Question Processed"