Feature: Admin post question
as Admin i should be able to post question to the roaster

  Background:
    Given I am an admin and Logged in
    And I am on the questions dashboard

  Scenario: Admin deploy question to question roaster.
    When I select a question with status pending deployment to question roaster
    And  I click deploy to question roaster
    Then I should be redirected to questions dashboard
    And I should see deployed question status to be freelancer answers
