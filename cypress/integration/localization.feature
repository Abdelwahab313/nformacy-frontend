Feature: Localization and switching languages

  Scenario: Switching from english to arabic
    Given I login in as an advisor
    And I go to question roaster
    And I should see a language button with "العربية" text
    When  i click on the language button
    Then The page content should be translated to "Arabic"
    And The page direction should be "rtl"
