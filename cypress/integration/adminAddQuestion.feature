Feature: Admin post question
  as Admin i should be able to post question to the roaster

  Background:
    Given i am an admin and Logged in
    And I am on the dashboard

  Scenario: admin send question to adviser
    Given I am on Post question page
    When I fill all the question details
    And i click "Send to adviser"
    Then I should see snackbar with message "Question Sent to Adviser"
    When i am in question roaster dashboard.
    Then the question status should be pending adviser acceptance

  Scenario: Admin save question and complete later
    Given I am on Post question page
    When I fill all the question details
    And I click "Save and complete later"
    Then I should be redirected to questions page and see snackbar with message "Your question is saved successfully"


  Scenario: Admin view saved question
    Given I am on Post question page
    When I fill all the question details
    And I click "Save and complete later"
    When i chose a question with status draft.
    Then i should be in the saved question post form.
    And all saved information should be visible


  Scenario: Admin draft question not visible for adviser
    Given I am on Post question page
    When I fill question details with specific data
    And I click "Save and complete later"
    When I login in as an advisor
    And i am in question roaster dashboard.
    Then i should not see the draft question i posted as admin

