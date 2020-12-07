Feature: Client schedule call
  Scenario: client select consultant
    Given I login as a client
    And   I have a call service request with shortlisted consultants
    When  visit home page
    And   I click on the service action
    Then  I should navigate to question details
    And   I should see shortlisted consultants
    When  I click on first shortlisted
    Then  A calendar should be displayed
    When  I fill meeting time
    And   I click submit meeting time
    Then  Meeting will be scheduled

