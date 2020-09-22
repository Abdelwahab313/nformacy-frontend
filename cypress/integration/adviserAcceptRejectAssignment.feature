Feature: Adviser accept or reject assignment
  as an adviser i should be able to accept or reject question assignment


  Background:
    Given I login in as an advisor
    And I have a question with pending assignment state
    And i am in question roaster dashboard.

  Scenario: Accept assignment request
    When i select a question with status pending assigment acceptance
    And  i click accept
    Then I should see send to admin button, save and complete later button and attachment button appear
    When i am in question roaster dashboard.
    Then i should see accepted question status to be review and edit


  Scenario: reject assignment request
    When i select a question with status pending assigment acceptance
    And  i click reject
    Then i should not see rejected question question status to be review and edit

  Scenario: should see by time updated with review and edit time assigned in question i accepted and alarm
    When i select a question with status pending assigment acceptance
    And  i click accept
    Then  I should see what is the time of review and edit assigned
    When i am in question roaster dashboard.
    Then i should see accepted question status to be review and edit
    Then I should see accepted question with by time around review and edit time assigned in question
    Then I should see alarm updated with new action time for review and edit
