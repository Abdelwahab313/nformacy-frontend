Feature: Adviser accept or reject assignment
  as an adviser i should be able to accept or reject question assignment


  Background:
    Given I login in as an advisor
    And i am in question roaster dashboard.

  Scenario: Accept assignment request
    When i select a question with status pending assigment acceptance
    And i click accept
    Then I should see apply changes button and attachment button appear
    When i am in question roaster dashboard.
    Then i should see accepted question status to be review and edit

  Scenario: reject assignment request
    When i select a question with status pending assigment acceptance
    And i click reject
    Then i should not see rejected question question status to be review and edit
