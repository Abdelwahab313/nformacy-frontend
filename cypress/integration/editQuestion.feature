Feature: Edit Question
  As an admin or advisor i should be able to edit a question

  Scenario: Admin edit a question
    Given i am an admin and Logged in
    And i am in question roaster dashboard.
    When i chose a question.
    And  i edit question title
    And  i click update question
    Then the edit should be saved successfully
