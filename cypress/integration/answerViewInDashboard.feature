Feature: View answers

  Background:
    Given Created question and answer are removed from storage

  Scenario: Admin view all answers
    Given I am an admin and Logged in
    And There is a question with answers
    When  I am on the questions dashboard
    And Click on created question.
    Then I should be able to see all answers

 Scenario: Advisor view accepted answers
    Given I login in as an advisor
   And There is a question with answers
   When  I am on the questions dashboard
    And Click on created question.
    Then I should be able to see all accepted answers

