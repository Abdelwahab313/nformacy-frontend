Feature: Edit profile
  As a user i should be able to edit my profile

  Scenario: Upload profile picture
    Given I log in
    When I go to profile page
    And I Upload an image
    Then I should see the image i uploaded

  @ignore
  Scenario: Successfully edit profile
    Given I log in
    When I go to profile page
    When I fill my updated data
    And press submit
    Then then should see my updated data when i open edit profile
  @ignore
  Scenario: Edit Profile
    Given I log in
    When I go to profile page
    When I click on edit basic info
    Then I should see edit basic info dialog
    When i edit basic info
    And click save
    Then i should see edited basic info

  @ignore
  Scenario: View Profile
    Given I log in
    When I go to profile page
    Then I should see basic info section
    And I should see personal info section

