Feature: freelancer answer a question
  as a freelancer i should be able to answer a question

  Background:
    Given I log in as a freelancer
    And I go to question roaster
    Then i click on answer button of specific question

  Scenario: answer a question
    Then I should see rich Text box for the answer content.
    When i fill answer content.
    And i click on post answer
    Then I should be redirected success page that contais thank you note and two buttons to redirect to home or roaster

  Scenario: attach file.
    When i click attach file and choose a file.
    Then the file i chose should be attached to the answer

  Scenario:  attach multiple files.
    When i click attach file and choose a file.
    And i click attach file and choose a file.
    Then the files i chose should be attached to the answer.
