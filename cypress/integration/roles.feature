Feature: System roles
  Different roles of the system have different permissions and privileges.

  Scenario: user with freelancer role should have Freelancer privileges
    When I log in as a freelancer
    # Answer questions in the roaster
    And I go to question roaster
    And i click on answer button of specific question
    Then I should see rich Text box for the answer content.
    # Update profile
    When I go to profile page
    And I click on edit basic info
    When I fill my updated basic Info data
    And press save basic info
    Then then should see my updated basic info
  # Update calendar with free time
  # Attend meetings and calls
  # Cash points
  # Comment in the public forum

# Rate the consultants answers
# Short list consultants
# Quality sampling freelancers work
# Comment on the public forum



