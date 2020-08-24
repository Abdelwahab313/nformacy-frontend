Feature: Admin post question
  as Admin i should be able to post question to the roaster

  Background:
    Given i am an admin and Logged in
    And I am on the dashboard

  Scenario: view all questions
    Given on Post question page
    When I fill all the question details
    When i fill answer content.
#    And Press send to adviser
#    Then I should see snackbar with message "Your question is Sent to the adviser"