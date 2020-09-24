Feature: Admin Extend time for question
As an Admin I should be able to extend the remaining time for a question to complete an action

  Background:
    Given I am an admin and Logged in
  
  Scenario: Admin extend time for a question with a status in review and edit.
    Given I have a question with a status Review
    And I am on the questions dashboard
    And I click on that question's By Time
    Then "Extend Time" dialog should be displayed
    # When I fill the time field
    # And Click submit
    # Then Success message with "Successfully updated question time" should be displayed
    # And By Time should be updated