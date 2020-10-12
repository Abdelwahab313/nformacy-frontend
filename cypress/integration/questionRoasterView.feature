Feature: Question Roaster View
  As a freelancer i should be able to see all questions.

  Background:
    Given I log in as a freelancer
    When I go to question roaster

  Scenario: view all questions
    And All the questions that are open with the following fields: Question title, Reference #, post date, field, subfield, industry, Question content, assignment type, close date.
    And Each question should have answer button beneath it.

#  Scenario: Filtering questions based on field
#    When I click on a field from the filtering menu.
#    Then I should only see questions that belongs to that field.

  Scenario: New question roaster design
    Then I should see a banner with Nformacy primary color
    And Question Roaster title in bold white large font
    And Search bar
    And Breadcrumbs including path to question roaster from home
    And filters row with highlighted selected filter
    And More icon that opens dropdown with filters that are not showing
#    And Language filter as dropdown
