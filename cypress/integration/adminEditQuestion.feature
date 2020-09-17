Feature: Admin Edit Question
  As an admin i should be able to edit a question

  Scenario: Admin edit a question
    Given i am an admin and Logged in
    And i am in question roaster dashboard.
    When i chose second question.
    And  i edit question title
    And  i assign an adviser
    And  i click apply changes
    Then the edit should be saved successfull to second question
