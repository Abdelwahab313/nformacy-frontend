Feature: Edit profile
  As a freelancer i should be able to edit my profile

  Scenario: Upload profile picture
    Given I log in as a freelancer
    When I go to profile page
    And I click on edit basic info
    And I Upload an image
    Then I should see the image i uploaded

  Scenario: Successfully edit basic info
    Given I log in as a freelancer
    When I go to profile page
    And I click on edit basic info
    When I fill my updated basic Info data
    And press save basic info
    Then then should see my updated basic info

  Scenario: Successfully edit personal info
    Given I log in as a freelancer
    When I go to profile page
    And I click on edit personal info
    When I fill my updated personal Info data
    And press save personal info
    Then then should see my updated personal

  Scenario: Successfully edit fields of specializations
    Given I log in as a freelancer
    When I go to profile page
    And I click on edit fields of specializations
    When I fill my updated fields of specializations data
    And press save fields of specializations
    Then then should see my updatedfields of specializations

  Scenario: Successfully edit summary
    Given I log in as a freelancer
    When I go to profile page
    And I click on edit summary info
    When I fill my summary
    And press save summary info
    Then then should see my updated summary

  Scenario: Successfully edit summary
    Given I log in as a freelancer
    When I go to profile page
    And I click on update cv
    When I upload my cv
    And press save cv
    Then then should see my cv

