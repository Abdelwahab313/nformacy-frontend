Feature: Freelancer profile completion

  Scenario: Successful completion
    Given I am a freelancer and registered
    Then I am on the freelancer profile completion form
    And I should see step one form
    When I fill personal info data
    And click next
    Then I should see step two form
    When I fill step two data
    And click next
    Then I should see step three form
    When I fill step three data
    And click submit
    Then I should see welcome message

  Scenario: Fields and specific fields
    Given I am a freelancer and registered
    And I fill personal info data
    And click next
    Then I should see step two form with fields and specific fields
    When I select a field
    Then Specific fields should have select box with options from above field
    And I can select multiple options

  Scenario: Show prompt to let the user know if he pressed back they will lose current step data
    Given I am a freelancer and registered
    Then I am on the freelancer profile completion form
    And I should see step one form
    When I fill personal info data
    And click next
    Then I should see step two form
    When I fill step two data
    And I click back
    Then I should see the dialog box asking for confirmation
    When I press cancel
    Then I should see step two form
    And I click back
    When I press confirm
    Then I should see step one form

  Scenario: Only show dates in start date that are below end date
    Given I am a freelancer and registered
    Then I am on the freelancer profile completion form
    And I should see step one form
    When I fill personal info data
    And click next
    Then I should see step two form
    When I fill step two data
    And click next
    Then I should see step three form
    Then Make end date populated
    When i choose an end date
    And i click on start date
    Then Only dates below end date show up
