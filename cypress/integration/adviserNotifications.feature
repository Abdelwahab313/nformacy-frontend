Feature: Adviser notifications
  As an adviser i should receive a notification for actions related to me

  Background:
    Given I login in as an advisor
    And I am on the questions dashboard
    And I have zero notification

  Scenario: Show recent 10 notifications history in the menu bar upon login
    Given I have 15 notifications.
    And I Logout from admin dashboard.
    And I login in as an advisor
    And I am on the questions dashboard
    When I click on notifications menu.
    Then I should see the recent 10.

  Scenario: Show see no notifications to be displayed if i have no notifications
    Given I Logout from admin dashboard.
    And I Login with adviser that does not have notifications
    And I am on the questions dashboard
    When I click on notifications menu.
    Then I should see "No notifications to be displayed".

  Scenario: Notifications does not exceed 10 notifications new one replaces oldest notification
    Given I have 15 notifications.
    And I Logout from admin dashboard.
    And I login in as an advisor
    And I am on the questions dashboard
    When I click on notifications menu.
    Then I should see the recent 10.
    When Admin send a question to me to review.
    Then The newly sent notification should replace the oldest one.

  Scenario: Show see "see more notifications" if i have more than 10 unread notifications
    Given I have 15 notifications.
    And I Logout from admin dashboard.
    And I login in as an advisor
    And I am on the questions dashboard
    When I click on notifications menu.
    Then I should see "See more..." in the end of the menu.

  Scenario: Receive notification when admin send a question to review and edit
    When Admin send a question to me to review.
    Then I should receive a notification about the assignment in the notifications section in the navbar and the notification counter increase by 1.
    And A toast should be displayed with the notification.
    When I click on notifications menu.
    Then I should see the newly received notification.
    And I should see toast notification with the newly received notification

  @focus
  Scenario: Click on notification from notifications menu in navbar
    When Admin send a question to me to review.
    And I click on notifications menu.
    And I click on the newly received notification.
    And I be redirected to the question details page related to the notification
    And unread notifications count decrease by 1.
