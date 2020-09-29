Feature: Adviser notifications
  As an adviser i should receive a notification for actions related to me

  Background:
    Given I login in as an advisor
    And I am on the questions dashboard
    And I have zero notification

  Scenario: Receive notification when admin send a question to review and edit
    When Admin send a question to me to review.
    Then I should receive a notification about the assignment in the notifications section in the navbar and the notification counter increase by 1.
    And A toast should be displayed with the notification.
