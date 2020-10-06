Feature: Admin accept or reject answers
  as an admin i should be able to accept or reject answers for a question


  Background:
    Given Created question and answer are removed from storage
    And   I am an admin and Logged in
    And   There is a question with answers
    And   I am on the questions dashboard
    And   Click on created question
    
  Scenario: Admin accept answer
    When  I select an answer with pending status 
    And   I accept the answer
    Then  Accept and reject buttons should not be visible
    And   I should see rollback button

  Scenario: Admin reject answer
    When I select an answer with pending status 
    And  I reject the answer
    Then Accept and reject buttons should not be visible
    And  I should see rollback button

  Scenario: Admin rollback on accepted answer
    When I selected an accepted answer
    When I click rollback button of accepted answer
    And  The rollback button of accepted answer should not be visible
    And  I should see Accept and Reject buttons of accepted answer

  Scenario: Admin rollback on rejected answer 
    When I selected a rejected answer
    And  I click rollback button of rejected answer
    Then The rollback button of rejected answer should not be visible
    And  I should see Accept and Reject buttons of rejected answer