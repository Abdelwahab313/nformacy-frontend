Feature: Question Roaster View
  As a freelancer i should be able to see all questions.

  Background:
    Given I log in as a freelancer
    When I go to question roaster

  Scenario: view all questions
    Then I should see search bar And a filtering menu for the fields
    And All the questions that are open with the following fields: Question title, Reference #, post date, field, subfield, industry, Question content, assignment type, close date.
    And Each question should have answer button beneath it.

  Scenario: Filtering questions based on field
    When I click on a field from the filtering menu.
    Then I should only see questions that belongs to that field.
