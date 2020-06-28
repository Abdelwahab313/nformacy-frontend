Feature: Edit profile
  As a user i should be able to edit my profile

  Scenario: Upload profile picture
    Given I log in
    When I go to edit profile page
    And I Upload an image
    Then I should see the image i uploaded