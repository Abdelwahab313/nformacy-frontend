Feature: Edit profile
  As a user i should be able to edit my profile


  Scenario: Successfully edit profile
    Given I log in
    When I go to edit profile page
    When I fill my updated data
    And press submit
    Then then should see my updated data when i open edit profile
