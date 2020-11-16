Feature: Admin Edit Question
  As an admin i should be able to edit a question

  Scenario: Admin edit a question
    Given I am an admin and Logged in
    And I have a question with pending assignment state
    And I am on the questions dashboard
    When I click on the question id from dashboard
    And  i edit question title
    And  i assign an adviser
    And  i click apply changes
    Then the edit should be saved successfully
