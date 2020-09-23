Feature: View answers

  Background:
    Given Created question and answer are removed from storage
    And There is a question with answers

  Scenario: Admin view all answers
    Given i am an admin and Logged in
    When  I am on the questions dashboard
    And Click on created question.
    Then I should be able to see all answers

 Scenario: Advisor view accepted answers
    Given I login in as an advisor
    When  I am on the questions dashboard
    And Click on created question.
    Then I should be able to see all accepted answers

