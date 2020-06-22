# features/login.feature
Feature: Login
  As a user i should be able to login

  Scenario: Successful login
    Given I am at login page
    When I type my email and password
    And press login
    Then then should be redirected to homepage
