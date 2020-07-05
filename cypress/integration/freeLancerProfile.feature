Feature:
  Freelancer profile completion
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