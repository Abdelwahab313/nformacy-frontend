Feature: Adviser questions dashboard
  as adviser i should be able to view questions assigned to me

  Background:
    Given I login in as an advisor

  Scenario: view question assigned to adviser entry
    Given I have a question in "review_and_edit" state assigned to me with By time less than "100" percent
    And  I am on the questions dashboard
    And  I should see alarm with "green" circle
    Then I should see Action Needed column
    And  I should see By Time column
    And  I should see Alarm column
    When I click on question title
    Then I should see question details

  Scenario: question should show yellow alarm when by time is less than half
     Given I have a question in "review_and_edit" state assigned to me with By time less than "50" percent
     When I am on the questions dashboard
     And  I should see alarm with "yellow" circle

  Scenario: question should show orange alarm when by time is less than quarter
     Given I have a question in "review_and_edit" state assigned to me with By time less than "25" percent
     When I am on the questions dashboard
     And  I should see alarm with "orange" circle

  Scenario: question should show red alarm when by time is less than 10 percent
    Given I have a question in "review_and_edit" state assigned to me with By time less than "10" percent
    When I am on the questions dashboard
    And  I should see alarm with "red" circle

  Scenario: question should removed when by time is finished
    Given I have a question assigned to me with finished By time
    When  I am on the questions dashboard
    And   I should not see the question

  Scenario: question with rating answer show yellow alarm when by time is less than half
    Given I have a question in "answers_rating" state assigned to me with By time less than "50" percent
    When I am on the questions dashboard
    And  I should see alarm with "yellow" circle

  Scenario: Question in pending deployment to question roaster visible without action to adviser.
    And I have a question assigned to me with pending deployment to question roaster state.
    And I am on the questions dashboard
    Then The question should be visible with no action.
    When I click on the question.
    Then I should see the question form with no action buttons

