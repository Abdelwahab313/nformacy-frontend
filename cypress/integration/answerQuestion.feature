Feature: freelancer answer a question
  as a freelancer i should be able to answer a question

  Background:
    Given I log in as a freelancer
    And I go to question roaster
    Then i click on answer button of specific question

  Scenario: answer a question
    Then I should see rich Text box for the answer content.
    When i fill answer content.
    And i click on save answer
    Then  I should see snackbar with message "Answer has been saved for later"

  Scenario: attach file.
    When i click attach file and choose a file.
    Then the file i chose should be attached to the answer

  Scenario:  attach multiple files.
    When i click attach file and choose a file.
    Then the file i chose should be attached to the answer
    When i click attach file and choose a file.
    Then the files i chose should be attached to the answer.
