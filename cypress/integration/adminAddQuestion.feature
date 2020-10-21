Feature: Admin post question
  as Admin i should be able to post question to the roaster

  Background:
    Given I am an admin and Logged in
    And I am on the questions dashboard

  Scenario: admin send question to adviser
    And I am on Post question page
    When I fill all the question details
    And i click "Send to adviser"
    Then I should see snackbar with message "Question Sent to Adviser"
    When I am on the questions dashboard
    Then the question status should be pending adviser acceptance

  Scenario: Admin save question and complete later
    And I am on Post question page
    When I fill all the question details
    And I click "Save and complete later"
    Then I should be redirected to questions page and see snackbar with message "Your question is saved successfully"


  Scenario: Admin view saved question
    And I am on Post question page
    When I fill all the question details
    And I click "Save and complete later"
    When i chose a question with status draft.
    Then i should be in the saved question post form.
    And all saved information should be visible


  Scenario: Admin draft question not visible for adviser
    And I am on Post question page
    When I fill all the question details
    And I click "Save and complete later"
    When I login in as an advisor
    And I am on the questions dashboard
    Then i should not see the draft question i posted as admin

  Scenario: Admin can upload photo for question as thumbnail
    And I am on Post question page
    When I upload an image for the question thumbnail
    Then I should see the uploaded image in the question form

  Scenario: Admin can view and re-upload photo
    When I choose a question with thumbnail image
    Then I should see the uploaded image