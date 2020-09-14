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

  Scenario: Admin save question and complete later
    Given I am on Post question page
    When I fill all the question details
    And I click "Save and complete later"
    Then I should be redirected to questions page and see snackbar with message "Your question is saved successfully"


  Scenario: Admin view saved question
    Given I am on Post question page
    When I fill all the question details
    And I click "Save and complete later"
    And i am in question roaster dashboard.
    When i chose a question with status pending assignment.
    Then i should be in the saved question post form.
    And all saved information should be visible

