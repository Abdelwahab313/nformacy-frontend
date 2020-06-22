# features/register.feature
Feature: Register
  As a visitor i should be able to register

  Scenario: Successful register
    Given I am at register page
    When I fill my data
    And press signup
    Then then should be redirected to homepage
