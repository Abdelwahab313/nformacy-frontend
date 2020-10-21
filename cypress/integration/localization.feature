Feature: Localization and switching languages

  Scenario: Switching from english to arabic
    Given I login in with an account with "english" saved as language
    And I go to question roaster
    And I should see a language button with "العربية" text
    When  i click on the language button
    Then The page content should be translated to "Arabic"
    And The page direction should be "rtl"

  Scenario: Preserve language after login
    Given I login in with an account with "arabic" saved as language
    When I go to question roaster
    Then The page content should be translated to "Arabic"
    And The page direction should be "rtl"
