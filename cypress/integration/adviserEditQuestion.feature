Feature: Adviser Edit and Review Question
  As an advisor i should be able to edit a question

  Scenario: Adviser edit a question without sending to admin
    Given I login in as an advisor
    And I am on the questions dashboard
    When i chose a question with status review_and_edit.
    And  i edit question title
    And  i click save and complete later
    Then the edit should be saved successful to selected question

  Scenario: Adviser send question to admin
    Given I login in as an advisor
    And I am on the questions dashboard
    When i chose a question with status review_and_edit.
    And  i click send to admin for deployment
    Then the question i sent should be be visible in questions dashboard with state pending_deployment_to_roaster
