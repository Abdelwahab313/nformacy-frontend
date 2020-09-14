Feature: Adviser questions dashboard
  as adviser i should be able to view questions assigned to me

  Background:
    Given I login in as an advisor
    And I have questions assigned to me
    And I am on the questions dashboard

  Scenario: view questions dashboard table view
    Then I should see Action Needed column
    And  I should see By Time column
    And  I should see Alarm column

  Scenario: view question assigned to adviser entry
    Then I should see the questions assigned to me
    When I click on question title
    Then I should see question details


  Scenario: question should show alarm when by time is at its half
     Given I have a question assigned to me with By time less than half
     When I am on the questions dashboard
     Then I should see alarm beside question row

  # alarm shape and flag message
  # alarm is shown after 1/2 time or specific 
  # Scenario: question should be shown as close after By time
  
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



