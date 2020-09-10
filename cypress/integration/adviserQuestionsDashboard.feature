Feature: Adviser questions dashboard
  as adviser i should be able to view questions assigned to me

  Background:
    Given I login in as an advisor
    And I have questions assigned to me
    And I am on the questions dashboard

  Scenario: view questions assigned to adviser
    When I am on adviser question list
    Then I should see the questions assigned to me
    When I click on question title
    Then I should see question details

  # Scenario: Accept question assigned to adviser
  #   Given I have question with status pending adviser acceptance
  #   When I click on question title with status pending adviser acceptance
  #   Then I should see question details with accept button
  #   When I click on accept button
  #   Then The question should have status edit and review


  # Scenario: Reject question assigned to adviser
  #   Given I have question with status pending adviser acceptance
  #   When I click on question title with status pending adviser acceptance
  #   Then I should see question details with reject button
  #   When I click on reject button
  #   Then The question should be removed from questions table



