Feature: Admin Extend time for question
As an Admin I should be able to extend the remaining time for a question to complete an action    
  
  Scenario: Admin extend time for a question with a status in review and edit.
    Given I am an admin and Logged in
    And I have a question with a status Review
    And I am on the questions dashboard
    When I click on that question's By Time
    Then "Extend Time" dialog should be displayed
    When I fill the extended time field
    And I click submit
    And By Time should be updated

  Scenario: should not extend time for closed question
    Given I am an admin and Logged in
    Given I have a question with status pending deployment
    And I am on the questions dashboard
    Then By Time Field is not visible
    
  Scenario: Adviser should not extend time
    Given I login in as an advisor
    Given I have a question with a status Review
    And I am on the questions dashboard
    When I click on that question's By Time
    Then "Extend Time" dialog should not be displayed